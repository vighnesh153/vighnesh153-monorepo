import axios from 'axios';
import { not } from '@vighnesh153/utils';
import { constants } from '../constants';

async function isTokenValid(token: string): Promise<boolean> {
  const rateLimitEndpoint = constants.urls.github.rateLimit;
  return axios
    .get(rateLimitEndpoint, {
      url: rateLimitEndpoint,
      method: 'get',
      headers: { Authorization: `token ${token}` },
    })
    .then((result) => {
      const OAuthScopes = result.headers['x-oauth-scopes'];
      return OAuthScopes.includes('gist');
    });
}

// check if the provided GitHub PAT (personal access token) is valid and has gist access
export async function verifyGithubPAT(token: string): Promise<void> {
  let isValid: boolean;
  try {
    isValid = await isTokenValid(token);
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).message = `Token is invalid.`;
    throw error;
  }

  if (not(isValid)) {
    throw new Error(`Token doesn't have gist access.`);
  }
}
