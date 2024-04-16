import { expect, test } from 'vitest';

import { FakeLogger } from '@vighnesh153/logger';

import { controller } from './controller';

const validEnvironmentVariables = {
  uiBaseUrl: 'https://dev-vighnesh153.com',
  authRedirectUrl: 'https://dev-vighnesh153.com/google/auth/callback',
  googleClientId: 'google-client-id',
  googleClientSecret: 'google-client-secret',
  cookieSecret: 'cookie-secret',
  environmentStage: 'dev' as 'dev' | 'prod',
  userInfoTableName: 'user-info',
};

test('should return 5xx if any of the environment variables are not provided', async () => {
  const environmentVariablesError = {
    statusCode: 500,
    body: 'Some of the environment variables are missing and hence I am unable to process your request',
  };

  async function validateErrorHandling(
    patch: (environmentVariables: Partial<typeof validEnvironmentVariables>) => void
  ) {
    const environmentVariables: Partial<typeof validEnvironmentVariables> = { ...validEnvironmentVariables };
    patch(environmentVariables);
    delete environmentVariables['uiBaseUrl'];
    const result = await controller({
      ...(environmentVariables as NonNullable<typeof validEnvironmentVariables>),
      logger: new FakeLogger(),
    });
    expect(result).toStrictEqual(environmentVariablesError);
  }

  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['uiBaseUrl'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['uiBaseUrl'] = '';
  });
  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['authRedirectUrl'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['authRedirectUrl'] = '';
  });
  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['googleClientId'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['googleClientId'] = '';
  });
  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['googleClientSecret'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['googleClientSecret'] = '';
  });
  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['cookieSecret'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['cookieSecret'] = '';
  });
  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['environmentStage'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['environmentStage'] = 'test' as unknown as 'dev' | 'prod';
  });
  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['userInfoTableName'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['userInfoTableName'] = '';
  });
});
