import { constructInitiateGoogleAuthUrl } from "./construct_initiate_google_auth_url.ts";

export function initiateGoogleLoginController(
  { domain }: { domain: string },
): string | null {
  const authRedirectUri = `${domain}/googleAuthCallback`;

  return constructInitiateGoogleAuthUrl({
    authRedirectUri,
  });
}
