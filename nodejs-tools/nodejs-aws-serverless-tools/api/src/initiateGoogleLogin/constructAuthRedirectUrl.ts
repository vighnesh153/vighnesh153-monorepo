import { Config } from 'sst/node/config';

import { ConsoleLogger, Logger } from '@vighnesh153/logger';
import { authScopes, inProduction } from './constants';

export function constructAuthRedirectUrl({
  authRedirectUri = process.env.AUTH_REDIRECT_URL,
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: SSM Secret type auto-complete not working
  googleClientId = inProduction(() => Config.GOOGLE_CLIENT_ID),
  logger = ConsoleLogger.getInstance(),
}: {
  authRedirectUri?: string;
  googleClientId?: string;
  logger?: Logger;
} = {}): string | null {
  if (!authRedirectUri || !googleClientId) {
    logger.log(
      `Expected 'serverRootUri' and 'googleClientId' to not be empty, ` +
        `found authRedirectUri='${authRedirectUri}', googleClientId='${googleClientId}'`
    );
    return null;
  }

  const authRedirectUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

  const queryParams = new URLSearchParams();
  queryParams.append('redirect_uri', `${authRedirectUri}`);
  queryParams.append('client_id', googleClientId);
  queryParams.append('access_type', 'offline');
  queryParams.append('response_type', 'code');
  queryParams.append('prompt', 'consent');
  queryParams.append('scope', authScopes.join(' '));

  authRedirectUrl.search = queryParams.toString();

  logger.log(`Sending auth-redirect-uri='${authRedirectUrl.toString()}'`);

  return authRedirectUrl.toString();
}
