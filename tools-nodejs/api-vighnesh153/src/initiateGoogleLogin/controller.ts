import * as http2 from "node:http2";
import { LambdaResponsePayload } from "@vighnesh153/tools/vighnesh153";
import { constructAuthRedirectUrl } from "./construct_auth_redirect_url.ts";

export function controller(
  authRedirectUrlConstructor: () => string | null = constructAuthRedirectUrl,
): LambdaResponsePayload {
  const authRedirectUrl = authRedirectUrlConstructor();
  if (authRedirectUrl === null) {
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: "Auth redirect url is empty",
      cookies: [],
      headers: {},
    };
  }
  return {
    statusCode: http2.constants.HTTP_STATUS_TEMPORARY_REDIRECT,
    cookies: [],
    body: null,
    headers: {
      Location: authRedirectUrl,
    },
  };
}
