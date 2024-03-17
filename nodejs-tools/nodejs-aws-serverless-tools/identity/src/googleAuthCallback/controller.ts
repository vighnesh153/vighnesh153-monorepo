import http2 from 'node:http2';

import { JsonHttpClient } from '@vighnesh153/http-client';
import { Logger } from '@vighnesh153/logger';
import { not } from '@vighnesh153/utils';

import { TokenFetchRequestBuilderImpl, TokenFetchRequestBuilder } from './buildTokenFetchRequest';
import { httpClientSingletonFactory, loggerSingletonFactory, userInfoDecoderSingletonFactory } from './factories';
import { UserInfoDecoder } from './UserInfoDecoder';

function mask(s?: string | null): string {
  return (s || '').slice(0, 3) + '...';
}

type LambdaResponse = {
  statusCode: number;
  body?: string;
  headers?: Record<string, string>;
};

// FIREBASE_SERVICE_ACCOUNT_CREDENTIALS

export async function controller({
  // environment variables
  uiBaseUrl = process.env.UI_BASE_URL,
  authRedirectUrl = process.env.AUTH_REDIRECT_URL,
  googleClientId = process.env.GOOGLE_CLIENT_ID,
  googleClientSecret = process.env.GOOGLE_CLIENT_SECRET,
  cookieSecret = process.env.COOKIE_SECRET,
  environmentStage = process.env.STAGE as 'dev' | 'prod' | undefined,

  // request info
  searchParameters = {},

  // tools
  logger = loggerSingletonFactory(),
  tokenFetchRequestBuilder = new TokenFetchRequestBuilderImpl(),
  httpClient = httpClientSingletonFactory(),
  userInfoDecoder = userInfoDecoderSingletonFactory(),
}: {
  // environment variables
  uiBaseUrl?: string;
  authRedirectUrl?: string;
  googleClientId?: string;
  googleClientSecret?: string;
  cookieSecret?: string;
  environmentStage?: 'dev' | 'prod';

  // request info
  searchParameters?: Record<string, string>;

  // tools
  logger?: Logger;
  tokenFetchRequestBuilder?: TokenFetchRequestBuilder;
  httpClient?: JsonHttpClient;
  userInfoDecoder?: UserInfoDecoder;
} = {}): Promise<LambdaResponse> {
  if (
    not(uiBaseUrl) ||
    not(authRedirectUrl) ||
    not(googleClientId) ||
    not(googleClientSecret) ||
    not(cookieSecret) ||
    not(['dev', 'prod'].includes(environmentStage!))
  ) {
    logger.log(
      `Some environment variables are missing or incorrect: ` +
        `uiBaseUrl='${uiBaseUrl}', ` +
        `authRedirectUrl='${authRedirectUrl}', ` +
        `googleClientId='${mask(googleClientId)}', ` +
        `googleClientSecret='${mask(googleClientSecret)}', ` +
        `cookieSecret='${mask(cookieSecret)}', ` +
        `environmentStage='${environmentStage}', ` +
        ''
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
  const userInfo = userInfoDecoder.decodeFromGoogleOAuthJwt(tokenData.data.id_token);
  if (userInfo === null) {
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Failed to extract user info from token',
    };
  }

  // user's email is not verified. deny signing in
  if (not(userInfo.email_verified)) {
    logger.log(`User's email address is not verified`);
    logger.log(userInfo);
    return {
      statusCode: http2.constants.HTTP_STATUS_NOT_ACCEPTABLE,
      body: 'Email address is not verified.',
    };
  }

  // TODO: check if the user already exists.

  return {
    statusCode: 200,
  };
}
