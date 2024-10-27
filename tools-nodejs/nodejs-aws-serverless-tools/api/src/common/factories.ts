import { Resource } from "sst";

import {
  createDynamoDBDocumentClient,
  DynamoDBTable,
  DynamoDBTableImpl,
  type IDynamoDBDocumentClient,
  type TableMetadata,
} from "@vighnesh153/aws-dynamo-db";
import {
  ConsoleLogger,
  createFactory,
  createSingletonFactory,
  JsonHttpClient,
  JsonHttpClientImpl,
  Logger,
} from "@vighnesh153/tools";

import { userInfoFields } from "./dynamoDBTableMetadata.ts";
import {
  RandomStringGenerator,
  RandomStringGeneratorImpl,
} from "./randomStringGenerator.ts";
import {
  AuthTokenGenerator,
  AuthTokenGeneratorImpl,
} from "./AuthTokenGenerator.ts";
import { CookieSerializer, CookieSerializerImpl } from "./CookieSerializer.ts";
import { inProduction } from "./utils.ts";
import {
  type UserInfoDecoder,
  UserInfoDecoderImpl,
} from "./UserInfoDecoder.ts";

export const loggerSingletonFactory = createSingletonFactory<Logger>(() => {
  return ConsoleLogger.getInstance();
});

export const httpClientSingletonFactory = createSingletonFactory<
  JsonHttpClient
>(() => {
  return new JsonHttpClientImpl({
    baseUrl: "",
  });
});

const dynamoDBDocumentClientSingletonFactory = createSingletonFactory<
  IDynamoDBDocumentClient
>(() => {
  return createDynamoDBDocumentClient();
});

export const userInfoTableMetadata = {
  fields: userInfoFields,
  tableName: inProduction(() => Resource.UserInfoTable.name),
} satisfies TableMetadata;

export const userInfoTableSingletonFactory = createSingletonFactory<
  DynamoDBTable<typeof userInfoTableMetadata>
>(() => {
  const dynamoDBdocumentClient = dynamoDBDocumentClientSingletonFactory();
  return new DynamoDBTableImpl(dynamoDBdocumentClient, userInfoTableMetadata);
});

export const userInfoDecoderSingletonFactory = createSingletonFactory<
  UserInfoDecoder
>(() => {
  return new UserInfoDecoderImpl(loggerSingletonFactory());
});

export const randomStringGeneratorSingletonFactory = createSingletonFactory<
  RandomStringGenerator
>(() => {
  return new RandomStringGeneratorImpl();
});

export const authTokenGeneratorSingletonFactory = createSingletonFactory<
  AuthTokenGenerator
>(() => {
  return new AuthTokenGeneratorImpl();
});

export const cookieSerializerFactory = createFactory<CookieSerializer>(() => {
  return new CookieSerializerImpl();
});
