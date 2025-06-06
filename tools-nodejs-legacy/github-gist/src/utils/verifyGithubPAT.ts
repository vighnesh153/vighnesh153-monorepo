import axios from "axios";
import { not } from "@vighnesh153/tools";
import { constants } from "../constants.ts";

async function isTokenValid(token: string): Promise<boolean> {
  const rateLimitEndpoint = constants.urls.github.rateLimit;
  return axios({
    url: rateLimitEndpoint,
    method: "get",
    headers: { Authorization: `token ${token}` },
  }).then((result) => {
    const OAuthScopes = result.headers["x-oauth-scopes"] ?? "";
    return OAuthScopes.includes("gist");
  });
}

// check if the provided GitHub PAT (personal access token) is valid and has gist access
export async function verifyGithubPAT(token: string): Promise<void> {
  let isValid: boolean;
  try {
    isValid = await isTokenValid(token);
  } catch (error: unknown) {
    (error as any).message = `Token is invalid.`;
    throw error;
  }

  if (not(isValid)) {
    throw new Error(`Token doesn't have gist access.`);
  }
}
