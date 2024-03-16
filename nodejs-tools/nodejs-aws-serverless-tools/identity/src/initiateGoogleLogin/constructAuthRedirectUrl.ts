import { ConsoleLogger, Logger } from '@vighnesh153/logger';
import { LambdaAuthCallbackPath, authScopes } from './constants';

export function constructAuthRedirectUrl({
  identityLambdaBaseUri = process.env.IDENTITY_LAMBDA_BASE_URI,
  googleClientId = process.env.GOOGLE_CLIENT_ID,
  logger = ConsoleLogger.getInstance(),
}: {
  identityLambdaBaseUri?: string;
  googleClientId?: string;
  logger?: Logger;
} = {}): string | null {
  if (!identityLambdaBaseUri || !googleClientId) {
    logger.log(
      `Expected 'serverRootUri' and 'googleClientId' to not be empty, ` +
        `found identityLambdaBaseUri='${identityLambdaBaseUri}', googleClientId='${googleClientId}'`
    );
    return null;
  }

  const authRedirectUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

  const queryParams = new URLSearchParams();
  queryParams.append('redirect_uri', `${identityLambdaBaseUri}${LambdaAuthCallbackPath}`);
  queryParams.append('client_id', googleClientId);
  queryParams.append('access_type', 'offline');
  queryParams.append('response_type', 'code');
  queryParams.append('prompt', 'consent');
  queryParams.append('scope', authScopes.join(' '));

  authRedirectUrl.search = queryParams.toString();

  logger.log(`Sending auth-redirect-uri='${authRedirectUrl.toString()}'`);

  return authRedirectUrl.toString();
}
