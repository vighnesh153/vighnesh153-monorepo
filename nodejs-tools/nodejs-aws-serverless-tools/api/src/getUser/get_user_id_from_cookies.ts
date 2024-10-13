import { LambdaRequestPayload, Logger } from '@vighnesh153/tools-platform-independent';
import { cookieKeys } from 'vighnesh153-cookies';
import { CookieSerializer } from '../common/CookieSerializer';
import { AuthTokenGenerator } from '../common/AuthTokenGenerator';

export async function getUserIdFromCookies({
  cookieSecret,
  environmentStage,
  headers,
  logger,
  cookieSerializer,
  authTokenGenerator,
}: {
  cookieSecret: string;
  environmentStage: 'dev' | 'prod';

  headers: LambdaRequestPayload['headers'];

  logger: Logger;
  cookieSerializer: CookieSerializer;
  authTokenGenerator: AuthTokenGenerator;
}): Promise<string | null> {
  const cookies = cookieSerializer.parse(headers['cookie'] || '');

  const userInfo = cookies[cookieKeys.userInfo(environmentStage)] ?? '';
  const authToken = cookies[cookieKeys.authToken(environmentStage)] ?? '';

  const userId = (() => {
    try {
      const maybeUserId = JSON.parse(decodeURIComponent(userInfo)).userId;
      if (typeof maybeUserId != 'string' || maybeUserId?.trim()?.length == 0) {
        return null;
      }
      return maybeUserId;
    } catch (e) {
      logger.log(`Some error occurred while parsing user id from cookies:`, e);
      return null;
    }
  })();

  const expectedAuthToken = authTokenGenerator.generate({
    cookieSecret,
    userId: userId ?? '',
  });

  if (authToken !== expectedAuthToken) {
    logger.log(`Auth token doesn't match for user id. Can't extract user id`);
    return null;
  }

  return userId;
}
