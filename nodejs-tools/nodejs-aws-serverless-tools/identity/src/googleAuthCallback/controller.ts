import http2 from 'node:http2';

import { DynamoDBTable } from '@vighnesh153/aws-dynamo-db';
import { JsonHttpClient } from '@vighnesh153/http-client';
import { Logger } from '@vighnesh153/logger';
import { CompleteUserInfo } from '@vighnesh153/types';
import { not } from '@vighnesh153/utils';

import { TokenFetchRequestBuilderImpl, TokenFetchRequestBuilder } from './buildTokenFetchRequest';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';
import {
  httpClientSingletonFactory,
  loggerSingletonFactory,
  userInfoDecoderSingletonFactory,
  userInfoTableSingletonFactory,
} from './factories';
import { UserInfoDecoder } from './UserInfoDecoder';

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
  googleClientId = process.env.GOOGLE_CLIENT_ID,
  googleClientSecret = process.env.GOOGLE_CLIENT_SECRET,
  cookieSecret = process.env.COOKIE_SECRET,
  environmentStage = process.env.STAGE as 'dev' | 'prod' | undefined,
  userInfoTableName = process.env.SST_Table_tableName_UserInfo,

  // request info
  searchParameters = {},

  // tools
  logger = loggerSingletonFactory(),
  tokenFetchRequestBuilder = new TokenFetchRequestBuilderImpl(),
  httpClient = httpClientSingletonFactory(),
  userInfoDecoder = userInfoDecoderSingletonFactory(),
  userInfoDynamoTable = userInfoTableSingletonFactory(),
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

  // TODO: check if the user already exists.
  const userInfoFromTable = await userInfoDynamoTable.getOne({ filterBy: { email: decodedUserInfo.email } });
  if (userInfoFromTable.error !== null && userInfoFromTable.error.message !== 'OBJECT_NOT_FOUND') {
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to fetch existing user info from database',
    };
  }

  console.log('userInfoFromTable:', userInfoFromTable);

  let userInfo: CompleteUserInfo;
  if (userInfoFromTable.error === null) {
    // user exists
    userInfo = userInfoFromTable.data;
  } else {
    // create new user
    userInfo = {} as CompleteUserInfo;
  }

  console.log('userInfo=', userInfo);

  return {
    statusCode: 200,
  };
}
