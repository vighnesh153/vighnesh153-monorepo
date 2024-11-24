import { serverAuthRedirectUrl } from "@/constants.ts";
import { constructInitiateGoogleAuthUrl } from "./construct_initiate_google_auth_url.ts";

export function initiateGoogleLoginController(): string | null {
  return constructInitiateGoogleAuthUrl({
    authRedirectUri: serverAuthRedirectUrl,
  });
}
