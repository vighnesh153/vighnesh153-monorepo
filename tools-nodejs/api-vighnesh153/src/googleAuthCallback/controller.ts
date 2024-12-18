import * as http2 from "node:http2";

import { Resource } from "sst";

import { type SerializeOptions } from "cookie";

import { type DynamoDBTable } from "@vighnesh153/tools-server/aws_dynamodb";
import {
  type CompleteUserInfo,
  isStringEmpty,
  type JsonHttpClient,
  type Logger,
  milliseconds,
  not,
} from "@vighnesh153/tools";
import {
  cookieKeys,
  type LambdaResponsePayload,
} from "@vighnesh153/tools/vighnesh153";
import { slugify } from "@std/text/unstable-slugify";

import {
  type TokenFetchRequestBuilder,
  TokenFetchRequestBuilderImpl,
} from "./build_token_fetch_request.ts";
import {
  authTokenGeneratorSingletonFactory,
  cookieSerializerFactory,
  httpClientSingletonFactory,
  loggerSingletonFactory,
  randomStringGeneratorSingletonFactory,
  userInfoDecoderSingletonFactory,
  userInfoTableMetadata,
  userInfoTableSingletonFactory,
} from "../common/factories/mod.ts";
import { type UserInfoDecoder } from "../common/user_info_decoder.ts";
import { type RandomStringGenerator } from "../common/random_string_generator.ts";
import { type AuthTokenGenerator } from "../common/auth_token_generator.ts";
import { inProduction } from "../common/utils.ts";
import { CookieSerializer } from "../common/cookie_serializer.ts";

function mask(s?: string | null): string {
  return (s || "").slice(0, 3) + "...";
}

export async function controller({
  // environment variables
  uiAuthCompleteUrl = process.env.UI_AUTH_COMPLETE_URL,
  authRedirectUrl = process.env.AUTH_REDIRECT_URL,
  // @ts-ignore: SSM Secret type auto-complete not working
  googleClientId = inProduction(() => Resource.GoogleClientId.value),
  // @ts-ignore: SSM Secret type auto-complete not working
  googleClientSecret = inProduction(() => Resource.GoogleClientSecret.value),
  // @ts-ignore: SSM Secret type auto-complete not working
  cookieSecret = inProduction(() => Resource.CookieSecret.value),
  environmentStage = process.env.STAGE as "dev" | "prod" | undefined,
  // @ts-ignore: SSM Secret type auto-complete not working
  userInfoTableName = inProduction(() => Resource.UserInfoTable.name),

  // request info
  searchParameters = {},

  // tools
  logger = loggerSingletonFactory(),
  tokenFetchRequestBuilder = new TokenFetchRequestBuilderImpl(),
  httpClient = httpClientSingletonFactory(),
  userInfoDecoder = userInfoDecoderSingletonFactory(),
  userInfoDynamoTable = userInfoTableSingletonFactory(),
  randomStringGenerator = randomStringGeneratorSingletonFactory(),
  authTokenGenerator = authTokenGeneratorSingletonFactory(),
  cookieSerializer = cookieSerializerFactory(),
}: {
  // environment variables
  uiAuthCompleteUrl?: string;
  authRedirectUrl?: string;
  googleClientId?: string;
  googleClientSecret?: string;
  cookieSecret?: string;
  environmentStage?: "dev" | "prod";
  userInfoTableName?: string;

  // request info
  searchParameters?: Record<string, string>;

  // tools
  logger?: Logger;
  tokenFetchRequestBuilder?: TokenFetchRequestBuilder;
  httpClient?: JsonHttpClient;
  userInfoDecoder?: UserInfoDecoder;
  userInfoDynamoTable?: DynamoDBTable<typeof userInfoTableMetadata>;
  randomStringGenerator?: RandomStringGenerator;
  authTokenGenerator?: AuthTokenGenerator;
  cookieSerializer?: CookieSerializer;
} = {}): Promise<LambdaResponsePayload> {
  if (
    isStringEmpty(uiAuthCompleteUrl) ||
    isStringEmpty(authRedirectUrl) ||
    isStringEmpty(googleClientId) ||
    isStringEmpty(googleClientSecret) ||
    isStringEmpty(cookieSecret) ||
    not(["dev", "prod"].includes(environmentStage!)) ||
    isStringEmpty(userInfoTableName)
  ) {
    logger.log(
      `Some environment variables are missing or incorrect: ` +
        [
          `uiAuthCompleteUrl='${uiAuthCompleteUrl}'`,
          `authRedirectUrl='${authRedirectUrl}'`,
          `googleClientId='${mask(googleClientId)}'`,
          `googleClientSecret='${mask(googleClientSecret)}'`,
          `cookieSecret='${mask(cookieSecret)}'`,
          `environmentStage='${environmentStage}'`,
          `userInfoTableName='${userInfoTableName}'`,
        ].join(", "),
    );
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body:
        "Some of the environment variables are missing and hence I am unable to process your request",
      headers: {},
      cookies: [],
    };
  }

  const authCallbackCode = searchParameters.code;
  if (isStringEmpty(authCallbackCode)) {
    logger.log("searchParams.code is empty");
    return {
      statusCode: http2.constants.HTTP_STATUS_BAD_REQUEST,
      body: "searchParams.code is empty",
      headers: {},
      cookies: [],
    };
  }

  const tokenFetchRequest = tokenFetchRequestBuilder.build({
    authCallbackCode: authCallbackCode,
    googleClientId: googleClientId!,
    googleClientSecret: googleClientSecret!,
    redirectUri: authRedirectUrl!,
  });

  const tokenFetcher = httpClient.post<unknown, { id_token: string }>(
    tokenFetchRequest,
  );
  logger.log("Fetching google auth...");
  const tokenResponse = await tokenFetcher.execute();
  if (tokenResponse.isError()) {
    logger.log("Some error occurred while fetching google auth token");
    logger.log(tokenResponse.getErrorResponse());
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: "Failed to fetch token",
      headers: {},
      cookies: [],
    };
  }
  logger.log("Google auth token fetch is successful");

  const tokenData = tokenResponse.getSuccessResponse();

  // extract user info from token
  logger.log("Extracting user info from token");
  const decodedUserInfo = userInfoDecoder.decodeFromGoogleOAuthJwt(
    tokenData.data.id_token,
  );
  if (decodedUserInfo === null) {
    logger.log("Failed to extract user info from token");
    logger.log(`token=${tokenData.data.id_token}`);
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: "Failed to extract user info from token",
      headers: {},
      cookies: [],
    };
  }
  logger.log("Successfully extracted user info from token");

  // user's email is not verified. deny signing in
  if (not(decodedUserInfo.email_verified)) {
    logger.log(`User's email address is not verified`);
    logger.log(decodedUserInfo);
    return {
      statusCode: http2.constants.HTTP_STATUS_NOT_ACCEPTABLE,
      body: "Email address is not verified.",
      headers: {},
      cookies: [],
    };
  }
  logger.log(`User's email address is verified`);

  const userInfoFromTable = await userInfoDynamoTable.queryOne({
    filterBy: { email: { value: decodedUserInfo.email } },
  });
  logger.log("Fetching existing user info from DynamoDB.");
  if (
    userInfoFromTable.error !== null &&
    userInfoFromTable.error.message !== "OBJECT_NOT_FOUND"
  ) {
    logger.log("Failed to fetch existing user info from DB.");
    logger.log(userInfoFromTable.error);
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: "Failed to fetch existing user info from database",
      headers: {},
      cookies: [],
    };
  }

  let completeUserInfo: CompleteUserInfo;
  if (userInfoFromTable.error === null) {
    logger.log(
      "User already exists. Using existing user information for login",
    );
    logger.log(userInfoFromTable.data);
    completeUserInfo = userInfoFromTable.data;
  } else {
    completeUserInfo = {
      userId: `${slugify(decodedUserInfo.name)}-${
        randomStringGenerator.generate(10)
      }`.toLowerCase(),
      name: decodedUserInfo.name,
      email: decodedUserInfo.email,
      profilePictureUrl: decodedUserInfo.picture,
      createdAtMillis: Date.now(),
    } as CompleteUserInfo;

    logger.log("User does not exist. Creating a new user");
    logger.log(completeUserInfo);

    const userCreationResult = await userInfoDynamoTable.createOne({
      data: completeUserInfo,
    });
    if (userCreationResult.error !== null) {
      logger.log("Failed to create a new user");
      logger.log(userCreationResult.error);
      return {
        statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        body: "Failed to create a new user",
        headers: {},
        cookies: [],
      };
    }
  }

  const authToken = authTokenGenerator.generate({
    userId: completeUserInfo.userId,
    cookieSecret,
  });

  const commonCookieOptions: SerializeOptions = {
    path: "/",
    domain: ".vighnesh153.dev",
    maxAge: milliseconds({ years: 1 }) / 1000,
  };

  const response: LambdaResponsePayload = {
    statusCode: http2.constants.HTTP_STATUS_TEMPORARY_REDIRECT,
    cookies: [
      cookieSerializer.serialize(
        cookieKeys.userInfo(environmentStage!),
        JSON.stringify(completeUserInfo),
        {
          ...commonCookieOptions,
        },
      ),
      cookieSerializer.serialize(
        cookieKeys.authToken(environmentStage!),
        authToken,
        {
          ...commonCookieOptions,

          httpOnly: true,
          secure: true,
        },
      ),
    ],
    body: null,
    headers: {
      Location: uiAuthCompleteUrl!,
    },
  };
  logger.log("User login process completed. Sending response...");
  logger.log(response);

  return response;
}
