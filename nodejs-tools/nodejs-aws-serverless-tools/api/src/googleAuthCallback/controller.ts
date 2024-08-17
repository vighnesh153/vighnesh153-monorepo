import http2 from 'node:http2';

import { Config } from 'sst/node/config';
import { Table } from 'sst/node/table';

import { type CookieSerializeOptions } from 'cookie';

import { type DynamoDBTable } from '@vighnesh153/aws-dynamo-db';
import { type CompleteUserInfo } from '@vighnesh153/types';
import {
  type Logger,
  type JsonHttpClient,
  milliseconds,
  not,
  slugify,
  LambdaResponsePayload,
} from '@vighnesh153/tools-platform-independent';
import { cookieKeys } from 'vighnesh153-cookies';

import { TokenFetchRequestBuilderImpl, type TokenFetchRequestBuilder } from './buildTokenFetchRequest';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';
import {
  authTokenGeneratorSingletonFactory,
  cookieSerializerFactory,
  httpClientSingletonFactory,
  loggerSingletonFactory,
  randomStringGeneratorSingletonFactory,
  userInfoDecoderSingletonFactory,
  userInfoTableSingletonFactory,
} from './factories';
import { type UserInfoDecoder } from './UserInfoDecoder';
import { type RandomStringGenerator } from './randomStringGenerator';
import { type AuthTokenGenerator } from '../common/AuthTokenGenerator';
import { inProduction } from './utils';
import { CookieSerializer } from '../common/CookieSerializer';

function mask(s?: string | null): string {
  return (s || '').slice(0, 3) + '...';
}

export async function controller({
  // environment variables
  uiAuthCompleteUrl = process.env.UI_AUTH_COMPLETE_URL,
  authRedirectUrl = process.env.AUTH_REDIRECT_URL,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  googleClientId = inProduction(() => Config.GOOGLE_CLIENT_ID),
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  googleClientSecret = inProduction(() => Config.GOOGLE_CLIENT_SECRET),
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  cookieSecret = inProduction(() => Config.COOKIE_SECRET),
  environmentStage = process.env.STAGE as 'dev' | 'prod' | undefined,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  userInfoTableName = inProduction(() => Table.UserInfo.tableName),

  // request info
  searchParameters = {},

  // tools
  logger = loggerSingletonFactory(),
  tokenFetchRequestBuilder = new TokenFetchRequestBuilderImpl(),
  httpClient = httpClientSingletonFactory(),
  userInfoDecoder = userInfoDecoderSingletonFactory(),
  userInfoDynamoTable = userInfoTableSingletonFactory(),
  randomStringGenerator = randomStringGeneratorSingletonFactory(),
  authTokenGenerator = authTokenGeneratorSingletonFactory(),
  cookieSerializer = cookieSerializerFactory(),
}: {
  // environment variables
  uiAuthCompleteUrl?: string;
  authRedirectUrl?: string;
  googleClientId?: string;
  googleClientSecret?: string;
  cookieSecret?: string;
  environmentStage?: 'dev' | 'prod';
  userInfoTableName?: string;

  // request info
  searchParameters?: Record<string, string>;

  // tools
  logger?: Logger;
  tokenFetchRequestBuilder?: TokenFetchRequestBuilder;
  httpClient?: JsonHttpClient;
  userInfoDecoder?: UserInfoDecoder;
  userInfoDynamoTable?: DynamoDBTable<typeof UserInfoTableMetadata>;
  randomStringGenerator?: RandomStringGenerator;
  authTokenGenerator?: AuthTokenGenerator;
  cookieSerializer?: CookieSerializer;
} = {}): Promise<LambdaResponsePayload> {
  if (
    not(uiAuthCompleteUrl) ||
    not(authRedirectUrl) ||
    not(googleClientId) ||
    not(googleClientSecret) ||
    not(cookieSecret) ||
    not(['dev', 'prod'].includes(environmentStage!)) ||
    not(userInfoTableName)
  ) {
    logger.log(
      `Some environment variables are missing or incorrect: ` +
        [
          `uiAuthCompleteUrl='${uiAuthCompleteUrl}'`,
          `authRedirectUrl='${authRedirectUrl}'`,
          `googleClientId='${mask(googleClientId)}'`,
          `googleClientSecret='${mask(googleClientSecret)}'`,
          `cookieSecret='${mask(cookieSecret)}'`,
          `environmentStage='${environmentStage}'`,
          `userInfoTableName='${userInfoTableName}'`,
        ].join(', ')
    );
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Some of the environment variables are missing and hence I am unable to process your request',
      headers: {},
      cookies: [],
    };
  }

  const authCallbackCode = searchParameters.code;
  if (not(authCallbackCode)) {
    logger.log('searchParams.code is empty');
    return {
      statusCode: http2.constants.HTTP_STATUS_BAD_REQUEST,
      body: 'searchParams.code is empty',
      headers: {},
      cookies: [],
    };
  }

  const tokenFetchRequest = tokenFetchRequestBuilder.build({
    authCallbackCode: authCallbackCode,
    googleClientId: googleClientId!,
    googleClientSecret: googleClientSecret!,
    redirectUri: authRedirectUrl!,
  });

  const tokenFetcher = httpClient.post<unknown, { id_token: string }>(tokenFetchRequest);
  logger.log('Fetching google auth...');
  const tokenResponse = await tokenFetcher.execute();
  if (tokenResponse.isError()) {
    logger.log('Some error occurred while fetching google auth token');
    logger.log(tokenResponse.getErrorResponse());
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to fetch token',
      headers: {},
      cookies: [],
    };
  }
  logger.log('Google auth token fetch is successful');

  const tokenData = tokenResponse.getSuccessResponse();

  // extract user info from token
  logger.log('Extracting user info from token');
  const decodedUserInfo = userInfoDecoder.decodeFromGoogleOAuthJwt(tokenData.data.id_token);
  if (decodedUserInfo === null) {
    logger.log('Failed to extract user info from token');
    logger.log(`token=${tokenData.data.id_token}`);
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to extract user info from token',
      headers: {},
      cookies: [],
    };
  }
  logger.log('Successfully extracted user info from token');

  // user's email is not verified. deny signing in
  if (not(decodedUserInfo.email_verified)) {
    logger.log(`User's email address is not verified`);
    logger.log(decodedUserInfo);
    return {
      statusCode: http2.constants.HTTP_STATUS_NOT_ACCEPTABLE,
      body: 'Email address is not verified.',
      headers: {},
      cookies: [],
    };
  }
  logger.log(`User's email address is verified`);

  const userInfoFromTable = await userInfoDynamoTable.queryOne({
    filterBy: { email: { value: decodedUserInfo.email } },
  });
  logger.log('Fetching existing user info from DynamoDB.');
  if (userInfoFromTable.error !== null && userInfoFromTable.error.message !== 'OBJECT_NOT_FOUND') {
    logger.log('Failed to fetch existing user info from DB.');
    logger.log(userInfoFromTable.error);
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to fetch existing user info from database',
      headers: {},
      cookies: [],
    };
  }

  let completeUserInfo: CompleteUserInfo;
  if (userInfoFromTable.error === null) {
    logger.log('User already exists. Using existing user information for login');
    logger.log(userInfoFromTable.data);
    completeUserInfo = userInfoFromTable.data;
  } else {
    completeUserInfo = {
      userId: `${slugify(decodedUserInfo.name)}-${randomStringGenerator.generate(10)}`.toLowerCase(),
      name: decodedUserInfo.name,
      email: decodedUserInfo.email,
      profilePictureUrl: decodedUserInfo.picture,
      createdAtMillis: Date.now(),
    } as CompleteUserInfo;

    logger.log('User does not exist. Creating a new user');
    logger.log(completeUserInfo);

    const userCreationResult = await userInfoDynamoTable.createOne({ data: completeUserInfo });
    if (userCreationResult.error !== null) {
      logger.log('Failed to create a new user');
      logger.log(userCreationResult.error);
      return {
        statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        body: 'Failed to create a new user',
        headers: {},
        cookies: [],
      };
    }
  }

  const authToken = authTokenGenerator.generate({
    userId: completeUserInfo.userId,
    cookieSecret,
  });

  const commonCookieOptions: CookieSerializeOptions = {
    path: '/',
    domain: '.vighnesh153.dev',
    maxAge: milliseconds({ years: 1 }) / 1000,
  };

  const response: LambdaResponsePayload = {
    statusCode: http2.constants.HTTP_STATUS_TEMPORARY_REDIRECT,
    cookies: [
      cookieSerializer.serialize(cookieKeys.userInfo(environmentStage!), JSON.stringify(completeUserInfo), {
        ...commonCookieOptions,
      }),
      cookieSerializer.serialize(cookieKeys.authToken(environmentStage!), authToken, {
        ...commonCookieOptions,

        httpOnly: true,
        secure: true,
      }),
    ],
    body: null,
    headers: {
      Location: uiAuthCompleteUrl!,
    },
  };
  logger.log('User login process completed. Sending response...');
  logger.log(response);

  return response;
}
