import { isStringEmpty } from "@vighnesh153/tools";

import { config } from "@/config.ts";

const authScopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

export function constructInitiateGoogleAuthUrl({
  authRedirectUri,
  googleClientId = config.googleClientId,
}: {
  authRedirectUri: string;
  googleClientId?: string;
}): string | null {
  if (isStringEmpty(authRedirectUri) || isStringEmpty(googleClientId)) {
    console.log(
      `Expected 'authRedirectUri' and 'googleClientId' to not be empty, ` +
        `found authRedirectUri='${authRedirectUri}', googleClientId='${googleClientId}'`,
    );
    return null;
  }

  const initiateGoogleAuthUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth",
  );

  const queryParams = new URLSearchParams();
  queryParams.append("redirect_uri", `${authRedirectUri}`);
  queryParams.append("client_id", googleClientId!);
  queryParams.append("access_type", "offline");
  queryParams.append("response_type", "code");
  queryParams.append("prompt", "consent");
  queryParams.append("scope", authScopes.join(" "));

  initiateGoogleAuthUrl.search = queryParams.toString();

  console.log(
    `Sending initiate-google-auth-url='${initiateGoogleAuthUrl.toString()}'`,
  );

  return initiateGoogleAuthUrl.toString();
}
