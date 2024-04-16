import { type DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { DynamoDBTable, DynamoDBTableImpl, createDynamoDBClient } from '@vighnesh153/aws-dynamo-db';
import { createSingletonFactory } from '@vighnesh153/factory';
import { JsonHttpClient, JsonHttpClientImpl } from '@vighnesh153/http-client';
import { ConsoleLogger, Logger } from '@vighnesh153/logger';

import { UserInfoDecoder, UserInfoDecoderImpl } from './UserInfoDecoder';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';
import { RandomStringGenerator, RandomStringGeneratorImpl } from './randomStringGenerator';
import { AuthTokenGenerator, AuthTokenGeneratorImpl } from '../common/AuthTokenGenerator';

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

const dynamoDBClientSingletonFactory = createSingletonFactory<DynamoDBClient>(() => {
  return createDynamoDBClient();
});

export const userInfoTableSingletonFactory = createSingletonFactory<DynamoDBTable<typeof UserInfoTableMetadata>>(() => {
  const dynamoDBClient = dynamoDBClientSingletonFactory();
  return new DynamoDBTableImpl(dynamoDBClient, UserInfoTableMetadata);
});

export const randomStringGeneratorSingletonFactory = createSingletonFactory<RandomStringGenerator>(() => {
  return new RandomStringGeneratorImpl();
});

export const authTokenGeneratorSingletonFactory = createSingletonFactory<AuthTokenGenerator>(() => {
  return new AuthTokenGeneratorImpl();
});
