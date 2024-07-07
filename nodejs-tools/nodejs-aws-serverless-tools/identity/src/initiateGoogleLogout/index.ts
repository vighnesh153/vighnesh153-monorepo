import http2 from 'node:http2';

import { type Handler } from 'aws-lambda';
import type { CookieSerializeOptions } from 'cookie';

import { cookieKeys } from 'vighnesh153-cookies';

import { CookieSerializer } from '../common/CookieSerializer';
import { cookieSerializerFactory, loggerSingletonFactory } from './factories';
import { Logger } from '@vighnesh153/logger';

type LambdaResponse = {
  statusCode: number;
  cookies?: string[];
  body?: string;
  headers?: Record<string, string>;
};

export async function controller({
  environmentStage = process.env.STAGE as 'dev' | 'prod' | undefined,
  uiAuthCompleteUrl = process.env.UI_AUTH_COMPLETE_URL,

  // tools
  cookieSerializer = cookieSerializerFactory(),
  logger = loggerSingletonFactory(),
}: {
  uiAuthCompleteUrl?: string;
  environmentStage?: 'dev' | 'prod';

  cookieSerializer?: CookieSerializer;
  logger?: Logger;
} = {}): Promise<LambdaResponse> {
  const commonCookieOptions: CookieSerializeOptions = {
    path: '/',
    domain: '.vighnesh153.dev',
    maxAge: 0,
  };

  const response: LambdaResponse = {
    statusCode: http2.constants.HTTP_STATUS_TEMPORARY_REDIRECT,
    cookies: [
      cookieSerializer.serialize(cookieKeys.userInfo(environmentStage!), '', {
        ...commonCookieOptions,
      }),
      cookieSerializer.serialize(cookieKeys.authToken(environmentStage!), '', {
        ...commonCookieOptions,

        httpOnly: true,
        secure: true,
      }),
    ],
    headers: {
      Location: uiAuthCompleteUrl!,
    },
  };

  logger.log('User logout process completed. Sending response...');
  logger.log(response);

  return response;
}

export const handler: Handler = () => Promise.resolve(controller());
