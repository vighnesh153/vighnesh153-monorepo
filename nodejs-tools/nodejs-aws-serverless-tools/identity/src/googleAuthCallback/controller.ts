import http2 from 'node:http2';

import { Config } from 'sst/node/config';
import { Table } from 'sst/node/table';

import { type DynamoDBTable } from '@vighnesh153/aws-dynamo-db';
import { type JsonHttpClient } from '@vighnesh153/http-client';
import { type Logger } from '@vighnesh153/logger';
import { type CompleteUserInfo } from '@vighnesh153/types';
import { not, slugify } from '@vighnesh153/utils';

import { TokenFetchRequestBuilderImpl, type TokenFetchRequestBuilder } from './buildTokenFetchRequest';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';
import {
  httpClientSingletonFactory,
  loggerSingletonFactory,
  randomStringGeneratorSingletonFactory,
  userInfoDecoderSingletonFactory,
  userInfoTableSingletonFactory,
} from './factories';
import { type UserInfoDecoder } from './UserInfoDecoder';
import { type RandomStringGenerator } from './randomStringGenerator';

function mask(s?: string | null): string {
  return (s || '').slice(0, 3) + '...';
}

type LambdaResponse = {
  statusCode: number;
  body?: string;
  headers?: Record<string, string>;
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
  const tokenResponse = await tokenFetcher.execute();
  if (tokenResponse.isError()) {
    logger.log('Some error occurred while fetching google auth token');
    logger.log(tokenResponse.getErrorResponse());
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to fetch token',
    };
  }

  const tokenData = tokenResponse.getSuccessResponse();

  // extract user info from token
  const decodedUserInfo = userInfoDecoder.decodeFromGoogleOAuthJwt(tokenData.data.id_token);
  if (decodedUserInfo === null) {
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to extract user info from token',
    };
  }

  // user's email is not verified. deny signing in
  if (not(decodedUserInfo.email_verified)) {
    logger.log(`User's email address is not verified`);
    logger.log(decodedUserInfo);
    return {
      statusCode: http2.constants.HTTP_STATUS_NOT_ACCEPTABLE,
      body: 'Email address is not verified.',
    };
  }

  const userInfoFromTable = await userInfoDynamoTable.queryOne({ filterBy: { email: decodedUserInfo.email } });
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
    // user exists
    completeUserInfo = userInfoFromTable.data;
  } else {
    // create new user
    completeUserInfo = {
      userId: `${slugify(decodedUserInfo.name)}-${randomStringGenerator.generate(5)}`.toLowerCase(),
      name: decodedUserInfo.name,
      email: decodedUserInfo.email,
      profilePictureUrl: decodedUserInfo.picture,
      createdAtMillis: Date.now(),
    } as CompleteUserInfo;

    // await userInfoDynamoTable.createOne();
  }
  name;

  logger.log('completeUserInfo=', completeUserInfo);

  return {
    statusCode: 200,
  };
}
