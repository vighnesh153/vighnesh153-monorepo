import { config } from "@/config.ts";
import { constructInitiateGoogleAuthUrl } from "./construct_initiate_google_auth_url.ts";

export function initiateGoogleLoginController(): string | null {
  return constructInitiateGoogleAuthUrl({
    authRedirectUri: config.serverAuthRedirectUrl,
  });
}
