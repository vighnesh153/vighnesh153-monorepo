import axios from 'axios';
import { constants } from '../constants';

const isTokenValid = async (token: string): Promise<boolean> => {
  const rateLimitEndpoint = constants.urls.github.rateLimit;
  return axios
    .get(rateLimitEndpoint, {
      headers: { Authorization: `token ${token}` },
    })
    .then((result) => result.headers['x-oauth-scopes'].includes('gist'));
};

// check if the provided PAT token is valid and has gist access
export const verifyIfPersonalAccessTokenIsValid = async (token: string): Promise<void> => {
  if (!(await isTokenValid(token))) {
    throw new Error(`Token is invalid or it doesn't have gist access.`);
  }
};
