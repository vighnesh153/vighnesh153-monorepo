import { test, expect } from 'vitest';
import { constructAuthRedirectUrl } from './constructAuthRedirectUrl';
import { FakeLogger } from '../logger';

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
