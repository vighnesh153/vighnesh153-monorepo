import { Resource } from 'sst';

import {
  DynamoDBTable,
  DynamoDBTableImpl,
  createDynamoDBDocumentClient,
  type IDynamoDBDocumentClient,
  type TableMetadata,
} from '@vighnesh153/aws-dynamo-db';
import {
  createFactory,
  createSingletonFactory,
  ConsoleLogger,
  Logger,
  JsonHttpClient,
  JsonHttpClientImpl,
} from '@vighnesh153/tools-platform-independent';

import { UserInfoDecoder, UserInfoDecoderImpl } from './UserInfoDecoder';
import { userInfoFields } from './dynamoDBTableMetadata';
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

export const userInfoTableMetadata = {
  fields: userInfoFields,
  tableName: Resource.UserInfoTable.name,
} satisfies TableMetadata;

export const userInfoTableSingletonFactory = createSingletonFactory<DynamoDBTable<typeof userInfoTableMetadata>>(() => {
  const dynamoDBdocumentClient = dynamoDBDocumentClientSingletonFactory();
  return new DynamoDBTableImpl(dynamoDBdocumentClient, userInfoTableMetadata);
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
