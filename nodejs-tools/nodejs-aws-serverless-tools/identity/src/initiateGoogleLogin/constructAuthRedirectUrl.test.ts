import { test, expect } from 'vitest';
import { constructAuthRedirectUrl } from './constructAuthRedirectUrl';
import { FakeLogger } from '@vighnesh153/logger';

test('should return null if identityLambdaBaseUri is empty', () => {
  expect(
    constructAuthRedirectUrl({ identityLambdaBaseUri: undefined, googleClientId: 'hello', logger: new FakeLogger() })
  ).toBeNull();
  expect(
    constructAuthRedirectUrl({ identityLambdaBaseUri: '', googleClientId: 'hello', logger: new FakeLogger() })
  ).toBeNull();
});

test('should return null if googleClientId is empty', () => {
  expect(
    constructAuthRedirectUrl({
      identityLambdaBaseUri: 'https://pikachu.dev',
      googleClientId: undefined,
      logger: new FakeLogger(),
    })
  ).toBeNull();
  expect(
    constructAuthRedirectUrl({
      identityLambdaBaseUri: 'https://pikachu.dev',
      googleClientId: '',
      logger: new FakeLogger(),
    })
  ).toBeNull();
});

test('should return null if both identityLambdaBaseUri and googleClientId is empty', () => {
  expect(constructAuthRedirectUrl({ logger: new FakeLogger() })).toBeNull();
  expect(
    constructAuthRedirectUrl({ identityLambdaBaseUri: '', googleClientId: '', logger: new FakeLogger() })
  ).toBeNull();
});

test('should construct auth redirect url if both identityLambdaBaseUri and googleClientId are provided', () => {
  const result = constructAuthRedirectUrl({
    logger: new FakeLogger(),
    googleClientId: 'pikachu',
    identityLambdaBaseUri: 'https://auth-prod.vighnesh153.dev',
  });

  const actualUrl = new URL(result!);

  const expectedUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  const queryParams = new URLSearchParams();
  queryParams.append('redirect_uri', 'https://auth-prod.vighnesh153.dev/googleAuthCallback');
  queryParams.append('client_id', 'pikachu');
  queryParams.append('access_type', 'offline');
  queryParams.append('response_type', 'code');
  queryParams.append('prompt', 'consent');
  queryParams.append(
    'scope',
    'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  );
  expectedUrl.search = queryParams.toString();

  expect(actualUrl.toString()).toBe(expectedUrl.toString());
});
