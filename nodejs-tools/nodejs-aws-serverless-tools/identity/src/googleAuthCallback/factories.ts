import { DynamoDB } from 'aws-sdk';

import { DynamoDBTable, DynamoDBTableImpl, createDynamoDBClient } from '@vighnesh153/aws-dynamo-db';
import { createSingletonFactory } from '@vighnesh153/factory';
import { JsonHttpClient, JsonHttpClientImpl } from '@vighnesh153/http-client';
import { ConsoleLogger, Logger } from '@vighnesh153/logger';

import { UserInfoDecoder, UserInfoDecoderImpl } from './UserInfoDecoder';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';

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

const dynamoDBClientSingletonFactory = createSingletonFactory<DynamoDB.DocumentClient>(() => {
  return createDynamoDBClient();
});

export const userInfoTableSingletonFactory = createSingletonFactory<DynamoDBTable<typeof UserInfoTableMetadata>>(() => {
  const dynamoDBClient = dynamoDBClientSingletonFactory();
  return new DynamoDBTableImpl(dynamoDBClient, UserInfoTableMetadata);
});
