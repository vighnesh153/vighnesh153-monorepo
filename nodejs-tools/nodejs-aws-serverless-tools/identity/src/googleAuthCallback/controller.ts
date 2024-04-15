import http2 from 'node:http2';

import { Config } from 'sst/node/config';
import { Table } from 'sst/node/table';

import cookie, { type CookieSerializeOptions } from 'cookie';

import { type DynamoDBTable } from '@vighnesh153/aws-dynamo-db';
import { type JsonHttpClient } from '@vighnesh153/http-client';
import { type Logger } from '@vighnesh153/logger';
import { type CompleteUserInfo } from '@vighnesh153/types';
import { milliseconds, not, slugify } from '@vighnesh153/utils';

import { TokenFetchRequestBuilderImpl, type TokenFetchRequestBuilder } from './buildTokenFetchRequest';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';
import {
  authTokenGeneratorSingletonFactory,
  httpClientSingletonFactory,
  loggerSingletonFactory,
  randomStringGeneratorSingletonFactory,
  userInfoDecoderSingletonFactory,
  userInfoTableSingletonFactory,
} from './factories';
import { type UserInfoDecoder } from './UserInfoDecoder';
import { type RandomStringGenerator } from './randomStringGenerator';
import { type AuthTokenGenerator } from '../common/AuthTokenGenerator';

function mask(s?: string | null): string {
  return (s || '').slice(0, 3) + '...';
}

type LambdaResponse = {
  statusCode: number;
  body?: string;
  headers?: Record<string, string>;
  cookies?: string[];
};

export async function controller({
  // environment variables
  uiBaseUrl = process.env.UI_BASE_URL,
  authRedirectUrl = process.env.AUTH_REDIRECT_URL,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  googleClientId = Config.GOOGLE_CLIENT_ID,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  googleClientSecret = Config.GOOGLE_CLIENT_SECRET,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  cookieSecret = Config.COOKIE_SECRET,
  environmentStage = process.env.STAGE as 'dev' | 'prod' | undefined,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  userInfoTableName = Table.UserInfo.tableName,

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
}: {
  // environment variables
  uiBaseUrl?: string;
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
} = {}): Promise<LambdaResponse> {
  if (
    not(uiBaseUrl) ||
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
          `uiBaseUrl='${uiBaseUrl}'`,
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
    };
  }

  const authCallbackCode = searchParameters.code;
  if (not(authCallbackCode)) {
    logger.log('searchParams.code is empty');
    return {
      statusCode: http2.constants.HTTP_STATUS_BAD_REQUEST,
      body: 'searchParams.code is empty',
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
    };
  }
  logger.log(`User's email address is verified`);

  const userInfoFromTable = await userInfoDynamoTable.queryOne({ filterBy: { email: decodedUserInfo.email } });
  logger.log('Fetching existing user info from DynamoDB.');
  if (userInfoFromTable.error !== null && userInfoFromTable.error.message !== 'OBJECT_NOT_FOUND') {
    logger.log('Failed to fetch existing user info from DB.');
    logger.log(userInfoFromTable.error);
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to fetch existing user info from database',
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
      };
    }
  }

  const authToken = authTokenGenerator.generate({
    userInfo: completeUserInfo,
    cookieSecret,
  });

  const commonCookieOptions: CookieSerializeOptions = {
    path: '/',
    domain: '.vighnesh153.dev',
    maxAge: milliseconds({ years: 1 }) / 1000,
  };

  const response: LambdaResponse = {
    statusCode: 200,
    cookies: [
      cookie.serialize(`${environmentStage}-user-info`, JSON.stringify(completeUserInfo), {
        ...commonCookieOptions,
      }),
      cookie.serialize(`${environmentStage}-auth-token`, authToken, {
        ...commonCookieOptions,

        httpOnly: true,
        secure: true,
      }),
    ],
  };
  logger.log('User login process completed. Sending response...');
  logger.log(response);

  return response;
}
