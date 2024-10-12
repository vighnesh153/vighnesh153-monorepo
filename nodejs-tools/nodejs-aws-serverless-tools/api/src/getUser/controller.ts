/* eslint-disable @typescript-eslint/no-use-before-define */
import * as http2 from 'node:http2';

import { Resource } from 'sst';

import {
  CompleteUserInfo,
  convertToPublicUserInfo,
  LambdaRequestPayload,
  LambdaResponsePayload,
  Logger,
  not,
  type PublicUserInfo,
} from '@vighnesh153/tools-platform-independent';
// import { cookieKeys } from 'vighnesh153-cookies';
import { DynamoDBTable } from '@vighnesh153/aws-dynamo-db';

import { CookieSerializer } from '../common/CookieSerializer';
import { inProduction } from '../common/utils';
import {
  cookieSerializerFactory,
  loggerSingletonFactory,
  userInfoTableMetadata,
  userInfoTableSingletonFactory,
} from '../common/factories';

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
      'Content-Type': 'application/json',
    },
  };
}

async function getUserIdFromCookies({
  // cookieSecret,
  // environmentStage,
  headers,
  logger,
  // cookieSerializer,
}: {
  cookieSecret: string;
  environmentStage: 'dev' | 'prod';

  headers: LambdaRequestPayload['headers'];

  logger: Logger;
  cookieSerializer: CookieSerializer;
}): Promise<string | null> {
  // TODO: fetch user id from headers
  logger.log(`Pikachu Headers: ${headers}`);
  return null;
}

async function getPublicUserInfo({
  userInfoDynamoTable,
  logger,
}: {
  userId: string;
  userInfoDynamoTable: DynamoDBTable<typeof userInfoTableMetadata>;
  logger: Logger;
}): Promise<PublicUserInfo | null> {
  const userId = '';

  const completeUserInfo = await getCompleteUserInfo({
    userId,
    userInfoDynamoTable,
    logger,
  });

  if (completeUserInfo == null) {
    logger.log(`Failed to get logged in user info`);
    return null;
  }
  return convertToPublicUserInfo(completeUserInfo);
}

async function getCompleteUserInfo({
  userId,
  userInfoDynamoTable,
  logger,
}: {
  userId: string;
  userInfoDynamoTable: DynamoDBTable<typeof userInfoTableMetadata>;
  logger: Logger;
}): Promise<CompleteUserInfo | null> {
  const res = await userInfoDynamoTable.queryOne({
    filterBy: {
      userId: { value: userId },
    },
  });
  if (res.error != null) {
    logger.log(`Some error occurred when fetching complete user info. ${res.error.message}`, res.error.errorObject);
    return null;
  }
  logger.log(`Successfully fetched user info: ${res.data}`);
  return res.data;
}
