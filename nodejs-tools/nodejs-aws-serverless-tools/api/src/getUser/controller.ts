/* eslint-disable @typescript-eslint/no-use-before-define */
import * as http2 from 'node:http2';

import { Resource } from 'sst';

import { LambdaRequestPayload, LambdaResponsePayload, Logger, not } from '@vighnesh153/tools-platform-independent';
import { CookieSerializer } from '../common/CookieSerializer';
import { inProduction } from '../common/utils';
import { cookieSerializerFactory, loggerSingletonFactory } from './factories';

function mask(s?: string | null): string {
  return (s || '').slice(0, 3) + '...';
}

export async function controller({
  // environment variables
  environmentStage = process.env.STAGE as 'dev' | 'prod' | undefined,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  cookieSecret = inProduction(() => Resource.CookieSecret.value),

  // request info
  headers = {},
  filterParams = {},

  // tools
  logger = loggerSingletonFactory(),
  cookieSerializer = cookieSerializerFactory(),
}: {
  // environment variables
  cookieSecret?: string;
  environmentStage?: 'dev' | 'prod';

  // request info
  headers?: LambdaRequestPayload['headers'];
  filterParams?: LambdaRequestPayload['filterParams'];

  // tools
  logger?: Logger;
  cookieSerializer?: CookieSerializer;
} = {}): Promise<LambdaResponsePayload> {
  if (not(cookieSecret) || not(['dev', 'prod'].includes(environmentStage!))) {
    logger.log(
      `Some environment variables are missing or incorrect: ` +
        [`cookieSecret='${mask(cookieSecret)}'`, `environmentStage='${environmentStage}'`].join(', ')
    );
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Some of the environment variables are missing and hence I am unable to process your request',
      headers: {},
      cookies: [],
    };
  }

  const { userId } = filterParams;

  if (not(userId) || userId.trim().length == 0) {
    // logger.log(`User id = '${userId}' cannot be blank`);
    // return {
    //   statusCode: http2.constants.HTTP_STATUS_BAD_REQUEST,
    //   body: `User id is blank`,
    //   headers: {},
    //   cookies: [],
    // };
    return getLoggedInUser();
  }

  return getPublicUserInfo({ userId });
}

function getLoggedInUser(): LambdaResponsePayload {
  return {};
}

function getPublicUserInfo({ userId }: { userId: string }): LambdaResponsePayload {
  return {};
}
