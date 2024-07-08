import {
  DynamoDBTable,
  DynamoDBTableImpl,
  createDynamoDBDocumentClient,
  type IDynamoDBDocumentClient,
} from '@vighnesh153/aws-dynamo-db';
import { createFactory, createSingletonFactory } from '@vighnesh153/factory';
import { ConsoleLogger, Logger, JsonHttpClient, JsonHttpClientImpl } from '@vighnesh153/tools-platform-independent';

import { UserInfoDecoder, UserInfoDecoderImpl } from './UserInfoDecoder';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';
import { RandomStringGenerator, RandomStringGeneratorImpl } from './randomStringGenerator';
import { AuthTokenGenerator, AuthTokenGeneratorImpl } from '../common/AuthTokenGenerator';
import { CookieSerializer, CookieSerializerImpl } from '../common/CookieSerializer';

export const loggerSingletonFactory = createSingletonFactory<Logger>(() => {
  return ConsoleLogger.getInstance();
});

export const httpClientSingletonFactory = createSingletonFactory<JsonHttpClient>(() => {
  return new JsonHttpClientImpl({
    baseUrl: '',
  });
});

export const userInfoDecoderSingletonFactory = createSingletonFactory<UserInfoDecoder>(() => {
  return new UserInfoDecoderImpl(loggerSingletonFactory());
});

const dynamoDBDocumentClientSingletonFactory = createSingletonFactory<IDynamoDBDocumentClient>(() => {
  return createDynamoDBDocumentClient();
});

export const userInfoTableSingletonFactory = createSingletonFactory<DynamoDBTable<typeof UserInfoTableMetadata>>(() => {
  const dynamoDBdocumentClient = dynamoDBDocumentClientSingletonFactory();
  return new DynamoDBTableImpl(dynamoDBdocumentClient, UserInfoTableMetadata);
});

export const randomStringGeneratorSingletonFactory = createSingletonFactory<RandomStringGenerator>(() => {
  return new RandomStringGeneratorImpl();
});

export const authTokenGeneratorSingletonFactory = createSingletonFactory<AuthTokenGenerator>(() => {
  return new AuthTokenGeneratorImpl();
});

export const cookieSerializerFactory = createFactory<CookieSerializer>(() => {
  return new CookieSerializerImpl();
});
