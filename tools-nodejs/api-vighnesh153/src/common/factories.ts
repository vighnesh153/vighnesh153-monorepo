import { Resource } from "sst";

import {
  createDynamoDBDocumentClient,
  DynamoDBTable,
  DynamoDBTableImpl,
  type IDynamoDBDocumentClient,
  type TableMetadata,
} from "@vighnesh153/tools-server/aws_dynamodb";
import {
  ConsoleLogger,
  createFactory,
  createSingletonFactory,
  JsonHttpClient,
  JsonHttpClientImpl,
  Logger,
} from "@vighnesh153/tools";

import { userInfoFields } from "./dynamo_db_table_metadata.ts";
import {
  RandomStringGenerator,
  RandomStringGeneratorImpl,
} from "./random_string_generator.ts";
import {
  AuthTokenGenerator,
  AuthTokenGeneratorImpl,
} from "./auth_token_generator.ts";
import { CookieSerializer, CookieSerializerImpl } from "./cookie_serializer.ts";
import { inProduction } from "./utils.ts";
import {
  type UserInfoDecoder,
  UserInfoDecoderImpl,
} from "./user_info_decoder.ts";

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

const dynamoDBDocumentClientSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    IDynamoDBDocumentClient
  >(() => {
    return createDynamoDBDocumentClient();
  });

export const userInfoTableMetadata = /* @__PURE__ */ {
  fields: userInfoFields,
  // @ts-ignore: sst stuff
  tableName: /* @__PURE__ */ inProduction(() => Resource.UserInfoTable.name),
} satisfies TableMetadata;

export const userInfoTableSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    DynamoDBTable<typeof userInfoTableMetadata>
  >(() => {
    const dynamoDBdocumentClient = dynamoDBDocumentClientSingletonFactory();
    return new DynamoDBTableImpl(dynamoDBdocumentClient, userInfoTableMetadata);
  });

export const userInfoDecoderSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    UserInfoDecoder
  >(() => {
    return new UserInfoDecoderImpl(loggerSingletonFactory());
  });

export const randomStringGeneratorSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    RandomStringGenerator
  >(() => {
    return new RandomStringGeneratorImpl();
  });

export const authTokenGeneratorSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    AuthTokenGenerator
  >(() => {
    return new AuthTokenGeneratorImpl();
  });

export const cookieSerializerFactory = /* @__PURE__ */ createFactory<
  CookieSerializer
>(() => {
  return new CookieSerializerImpl();
});
