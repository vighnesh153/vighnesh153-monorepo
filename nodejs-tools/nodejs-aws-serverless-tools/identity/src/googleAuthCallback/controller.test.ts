import { expect, test, beforeEach } from 'vitest';

import { FakeJsonHttpClient, JsonHttpResponse } from '@vighnesh153/http-client';
import { FakeLogger } from '@vighnesh153/logger';
import { CompleteUserInfo, GoogleOAuthUserInfo } from '@vighnesh153/types';

import { controller } from './controller';
import { FakeUserInfoDecoder } from './UserInfoDecoder';
import { FakeDynamoDBTable } from '@vighnesh153/aws-dynamo-db';
import { UserInfoTableMetadata } from './dynamoDBTableMetadata';
import { FakeCookieSerializer } from '../common/CookieSerializer';

let fakeHttpClient: FakeJsonHttpClient;
let fakeUserInfoDecoder: FakeUserInfoDecoder;
let fakeUserInfoTable: FakeDynamoDBTable<typeof UserInfoTableMetadata>;
let fakeCookieSerializer: FakeCookieSerializer;

const UI_AUTH_COMPLETE_URL = 'https://dev-vighnesh153.dev/auth/callback';

const validEnvironmentVariables = {
  uiAuthCompleteUrl: UI_AUTH_COMPLETE_URL,
  authRedirectUrl: 'https://dev-vighnesh153.dev/google/auth/callback',
  googleClientId: 'google-client-id',
  googleClientSecret: 'google-client-secret',
  cookieSecret: 'cookie-secret',
  environmentStage: 'dev' as 'dev' | 'prod',
  userInfoTableName: 'user-info',
};

const validGoogleOAuthUserInfo: GoogleOAuthUserInfo = {
  email_verified: true,
  email: 'pikachu@pokemon.dev',
  name: 'Pikachu',
  picture: 'https://images.com/pikachu.png',
};

const validCompleteUserInfo: CompleteUserInfo = {
  email: 'pikachu@pokemon.dev',
  name: 'Pikachu',
  profilePictureUrl: 'https://images.com/pikachu.png',
  createdAtMillis: Date.now(),
  userId: 'pikachu-dsmk32m',
};

const baseEnvironmentVariables = {
  ...validEnvironmentVariables,
  logger: new FakeLogger(),
};

beforeEach(() => {
  fakeHttpClient = new FakeJsonHttpClient();
  fakeUserInfoDecoder = new FakeUserInfoDecoder();
  fakeUserInfoTable = new FakeDynamoDBTable();
  fakeCookieSerializer = new FakeCookieSerializer();
});

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
    const result = await controller({
      ...(environmentVariables as NonNullable<typeof validEnvironmentVariables>),
      logger: new FakeLogger(),
    });
    expect(result).toStrictEqual(environmentVariablesError);
  }

  await validateErrorHandling((environmentVariables) => {
    delete environmentVariables['uiAuthCompleteUrl'];
  });
  await validateErrorHandling((environmentVariables) => {
    environmentVariables['uiAuthCompleteUrl'] = '';
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

test('should return 4xx if searchParams.code is not set', async () => {
  const result = await controller({
    ...baseEnvironmentVariables,
  });
  expect(result).toStrictEqual({
    body: 'searchParams.code is empty',
    statusCode: 400,
  });
});

test('should return 5xx if error occurs while fetching token', async () => {
  fakeHttpClient.setPostRequestResponse(() =>
    Promise.resolve(
      new JsonHttpResponse({
        type: 'error',
        error: new Error('Some error'),
        errorMessage: 'Some error occurred',
        statusCode: 500,
      })
    )
  );

  const result = await controller({
    ...baseEnvironmentVariables,
    searchParameters: {
      code: 'auth-code',
    },
    httpClient: fakeHttpClient,
  });

  expect(result).toStrictEqual({
    body: 'Failed to fetch token',
    statusCode: 500,
  });
});

test('should return 5xx if error occurs while parsing auth token', async () => {
  fakeHttpClient.setPostRequestResponse(() =>
    Promise.resolve(
      new JsonHttpResponse({
        type: 'success',
        data: 'fake-token',
        headers: new Headers(),
        statusCode: 200,
      })
    )
  );

  const result = await controller({
    ...baseEnvironmentVariables,
    searchParameters: {
      code: 'auth-code',
    },
    httpClient: fakeHttpClient,
    userInfoDecoder: fakeUserInfoDecoder,
  });

  expect(result).toStrictEqual({
    body: 'Failed to extract user info from token',
    statusCode: 500,
  });
});

test(`should return 4xx if user's email is not verified`, async () => {
  fakeHttpClient.setPostRequestResponse(() =>
    Promise.resolve(
      new JsonHttpResponse({
        type: 'success',
        data: 'fake-token',
        headers: new Headers(),
        statusCode: 200,
      })
    )
  );
  fakeUserInfoDecoder.userInfo = {
    ...validGoogleOAuthUserInfo,
    email_verified: false,
  };

  const result = await controller({
    ...baseEnvironmentVariables,
    searchParameters: {
      code: 'auth-code',
    },
    httpClient: fakeHttpClient,
    userInfoDecoder: fakeUserInfoDecoder,
  });

  expect(result).toStrictEqual({
    body: 'Email address is not verified.',
    statusCode: 406,
  });
});

test('should return 5xx if error occurs while fetching existing user info', async () => {
  fakeHttpClient.setPostRequestResponse(() =>
    Promise.resolve(
      new JsonHttpResponse({
        type: 'success',
        data: 'fake-token',
        headers: new Headers(),
        statusCode: 200,
      })
    )
  );
  fakeUserInfoDecoder.userInfo = { ...validGoogleOAuthUserInfo };
  fakeUserInfoTable.queryOneResult = {
    data: null,
    error: {
      message: 'ERROR_WHILE_FETCHING',
      errorObject: new Error('Some random error'),
    },
  };

  const result = await controller({
    ...baseEnvironmentVariables,
    searchParameters: {
      code: 'auth-code',
    },
    httpClient: fakeHttpClient,
    userInfoDecoder: fakeUserInfoDecoder,
    userInfoDynamoTable: fakeUserInfoTable,
  });

  expect(result).toStrictEqual({
    body: 'Failed to fetch existing user info from database',
    statusCode: 500,
  });
});

test('should use existing user info for login if user already exists', async () => {
  fakeHttpClient.setPostRequestResponse(() =>
    Promise.resolve(
      new JsonHttpResponse({
        type: 'success',
        data: 'fake-token',
        headers: new Headers(),
        statusCode: 200,
      })
    )
  );
  fakeUserInfoDecoder.userInfo = { ...validGoogleOAuthUserInfo };
  fakeUserInfoTable.queryOneResult = {
    data: validCompleteUserInfo,
    error: null,
  };
  fakeCookieSerializer.serializedCookie = 'serialized-cookie';

  const result = await controller({
    ...baseEnvironmentVariables,
    searchParameters: {
      code: 'auth-code',
    },
    httpClient: fakeHttpClient,
    userInfoDecoder: fakeUserInfoDecoder,
    userInfoDynamoTable: fakeUserInfoTable,
    cookieSerializer: fakeCookieSerializer,
  });

  expect(result).toStrictEqual({
    statusCode: 307,
    cookies: ['serialized-cookie', 'serialized-cookie'],
    headers: {
      Location: UI_AUTH_COMPLETE_URL,
    },
  });
  expect(fakeUserInfoTable.createOneCalledTimes).toEqual(0);
});

test(`when user doesn't exist, should return 5xx if create new user fails`, async () => {
  fakeHttpClient.setPostRequestResponse(() =>
    Promise.resolve(
      new JsonHttpResponse({
        type: 'success',
        data: 'fake-token',
        headers: new Headers(),
        statusCode: 200,
      })
    )
  );
  fakeUserInfoDecoder.userInfo = { ...validGoogleOAuthUserInfo };
  fakeUserInfoTable.queryOneResult = {
    data: null,
    error: {
      message: 'OBJECT_NOT_FOUND' as const,
      errorObject: new Error(`User doesn't exist`),
    },
  };
  fakeUserInfoTable.createOneResult = {
    error: {
      message: 'CREATION_FAILED',
      errorObject: new Error('Some error occurred while creating a user'),
    },
  };
  fakeCookieSerializer.serializedCookie = 'serialized-cookie';

  const result = await controller({
    ...baseEnvironmentVariables,
    searchParameters: {
      code: 'auth-code',
    },
    httpClient: fakeHttpClient,
    userInfoDecoder: fakeUserInfoDecoder,
    userInfoDynamoTable: fakeUserInfoTable,
    cookieSerializer: fakeCookieSerializer,
  });

  expect(result).toStrictEqual({
    statusCode: 500,
    body: 'Failed to create a new user',
  });
  expect(fakeUserInfoTable.createOneCalledTimes).toEqual(1);
});

test(`should create new user if user doesn't exist and use that info for login`, async () => {
  fakeHttpClient.setPostRequestResponse(() =>
    Promise.resolve(
      new JsonHttpResponse({
        type: 'success',
        data: 'fake-token',
        headers: new Headers(),
        statusCode: 200,
      })
    )
  );
  fakeUserInfoDecoder.userInfo = { ...validGoogleOAuthUserInfo };
  fakeUserInfoTable.queryOneResult = {
    data: null,
    error: {
      message: 'OBJECT_NOT_FOUND' as const,
      errorObject: new Error(`User doesn't exist`),
    },
  };
  fakeUserInfoTable.createOneResult = { error: null };
  fakeCookieSerializer.serializedCookie = 'serialized-cookie';

  const result = await controller({
    ...baseEnvironmentVariables,
    searchParameters: {
      code: 'auth-code',
    },
    httpClient: fakeHttpClient,
    userInfoDecoder: fakeUserInfoDecoder,
    userInfoDynamoTable: fakeUserInfoTable,
    cookieSerializer: fakeCookieSerializer,
  });

  expect(result).toStrictEqual({
    statusCode: 307,
    cookies: ['serialized-cookie', 'serialized-cookie'],
    headers: {
      Location: UI_AUTH_COMPLETE_URL,
    },
  });
  expect(fakeUserInfoTable.createOneCalledTimes).toEqual(1);
});
