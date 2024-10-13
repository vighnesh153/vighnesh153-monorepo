/* eslint-disable @typescript-eslint/no-use-before-define */
import * as http2 from 'node:http2';

import { Resource } from 'sst';

import {
  CompleteUserInfo,
  HttpHeaderKeys,
  HttpHeaderValues,
  LambdaRequestPayload,
  LambdaResponsePayload,
  Logger,
  not,
  type PublicUserInfo,
} from '@vighnesh153/tools-platform-independent';
import { DynamoDBTable } from '@vighnesh153/aws-dynamo-db';

import { CookieSerializer } from '../common/CookieSerializer';
import { inProduction } from '../common/utils';
import {
  authTokenGeneratorSingletonFactory,
  cookieSerializerFactory,
  loggerSingletonFactory,
  userInfoTableMetadata,
  userInfoTableSingletonFactory,
} from '../common/factories';
import { getCompleteUserInfo, getPublicUserInfo } from './fetch_user_info';
import { AuthTokenGenerator } from '../common/AuthTokenGenerator';
import { getUserIdFromCookies } from './get_user_id_from_cookies';

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
  userInfoDynamoTable = userInfoTableSingletonFactory(),
  authTokenGenerator = authTokenGeneratorSingletonFactory(),
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
  userInfoDynamoTable?: DynamoDBTable<typeof userInfoTableMetadata>;
  authTokenGenerator?: AuthTokenGenerator;
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

  let userInfo: CompleteUserInfo | PublicUserInfo | null;
  if (not(userId) || userId.trim().length == 0) {
    const loggedInUserId = await getUserIdFromCookies({
      cookieSecret,
      environmentStage: environmentStage!,
      logger,
      cookieSerializer,
      headers,
      authTokenGenerator,
    });
    if (loggedInUserId == null) {
      return {
        body: 'Failed to get logged in user id from cookies',
        cookies: [],
        statusCode: 400,
        headers: {},
      };
    }

    userInfo = await getCompleteUserInfo({ userId: loggedInUserId, logger, userInfoDynamoTable });
  } else {
    userInfo = await getPublicUserInfo({ userId, logger, userInfoDynamoTable });
  }

  return {
    body: JSON.stringify(userInfo),
    cookies: [],
    statusCode: 200,
    headers: {
      [HttpHeaderKeys.contentType]: HttpHeaderValues.contentType.applicationJson,
    },
  };
}
