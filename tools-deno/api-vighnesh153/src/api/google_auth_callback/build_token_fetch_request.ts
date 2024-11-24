import { JsonHttpPostRequest } from "@vighnesh153/tools";
import { config } from "@/config.ts";
import { serverAuthRedirectUrl } from "@/constants.ts";

export function buildTokenFetchRequest(
  { authCallbackCode }: { authCallbackCode: string },
): JsonHttpPostRequest<FormData> {
  const formData = new FormData();

  formData.append("code", authCallbackCode);
  formData.append("client_id", config.googleClientId);
  formData.append("client_secret", config.googleClientSecret);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", serverAuthRedirectUrl);

  return {
    path: "https://oauth2.googleapis.com/token",
    data: formData,
  };
}
