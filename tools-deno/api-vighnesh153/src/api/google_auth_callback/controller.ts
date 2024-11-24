import { type JsonHttpClient, not } from "@vighnesh153/tools";
import { decodeUserInfo } from "./decode_user_info.ts";
import type { UserRepository } from "@/repositories/mod.ts";
import {
  authTokenGeneratorFactory,
  jsonHttpClientFactory,
  userRepositoryFactory,
} from "@/factories/mod.ts";
import type { AuthTokenGenerator } from "@/utils/auth_token_generator.ts";
import type { CompleteUserInfo } from "@/models/user_info.ts";
import { buildTokenFetchRequest } from "./build_token_fetch_request.ts";

type ControllerResponse = { success: false } | {
  success: true;
  user: CompleteUserInfo;
  authToken: string;
};

export async function googleAuthCallbackController(
  {
    authCallbackCode = "",
    httpClient = jsonHttpClientFactory(),
    userRepository = userRepositoryFactory(),
    authTokenGenerator = authTokenGeneratorFactory(),
  }: {
    authCallbackCode?: string;
    httpClient?: JsonHttpClient;
    userRepository?: UserRepository;
    authTokenGenerator?: AuthTokenGenerator;
  } = {},
): Promise<ControllerResponse> {
  const tokenFetchRequest = buildTokenFetchRequest({ authCallbackCode });

  const tokenFetcher = httpClient.post<unknown, { id_token: string }>(
    tokenFetchRequest,
  );

  console.log("Fetching google auth token...");
  const tokenResponse = await tokenFetcher.execute();

  if (tokenResponse.isError()) {
    console.log("Some error occurred while fetching google auth token");
    console.log(tokenResponse.getErrorResponse());
    return {
      success: false,
    };
  }

  console.log("Google auth token fetch is successful");

  const tokenData = tokenResponse.getSuccessResponse();

  // extract user info from token
  console.log("Extracting user info from token");
  const oauthUserInfo = decodeUserInfo(tokenData.data.id_token);

  if (oauthUserInfo === null) {
    console.log("Failed to extract user info from token");
    console.log(`token=${tokenData.data.id_token}`);
    return { success: false };
  }

  console.log("Successfully extracted user info from token");

  // user's email is not verified. deny signing in
  if (not(oauthUserInfo.email_verified)) {
    console.log(`User's email address is not verified`);
    console.log(oauthUserInfo);
    return { success: false };
  }

  console.log(`User's email address is verified`);

  console.log("Attempting to creating or getting user...");
  const loggedInUser = await userRepository.createOrGetUser(oauthUserInfo);

  if (loggedInUser == null) {
    console.log(
      "Failed to create or get user... Failing sign up or sign in...",
    );
    return { success: false };
  }

  console.log("Generating auth token...");
  const authToken = authTokenGenerator.generate({
    userId: loggedInUser.userId,
  });

  console.log("Generated auth token and login user complete...");

  return {
    success: true,
    user: loggedInUser,
    authToken,
  };
}
