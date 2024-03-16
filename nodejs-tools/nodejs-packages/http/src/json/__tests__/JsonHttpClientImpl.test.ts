import process from 'node:process';

import { beforeAll, afterAll, test, expect } from 'vitest';
import { Server } from 'http';

import { app } from './testServer';
import { JsonHttpClientImpl } from '../JsonHttpClientImpl';

let server: Server;
let serverAddress: string = '';

const headers = {
  pokemon1: 'pikachu',
  pokemon2: 'greninja',
};

const queryParameters = {
  message: ['i am the very best'],
  pokemon: ['pikachu', 'greninja'],
};

const receivedSearchParams = {
  message: 'i am the very best',
  pokemon: ['pikachu', 'greninja'],
};

const postData = {
  name: 'Pikachu',
  types: ['thunder', 'normal'],
};

const formData = new FormData();
formData.append('pokemon', 'pikachu');

const getCommonReceivedHeaders = () => ({
  accept: 'application/json',
  'accept-encoding': 'gzip, deflate',
  'accept-language': '*',
  connection: 'keep-alive',
  host: serverAddress.slice('http://'.length),
  'sec-fetch-mode': 'cors',
  'user-agent': 'node',
});

const getPostRequestReceivedHeaders = (contentLength = 47) => ({
  'content-length': contentLength.toString(),
  'content-type': 'application/json',
});

beforeAll(async () => {
  return new Promise((resolve) => {
    server = app.listen(0, () => {
      const address = server.address();
      if (address == null || typeof address === 'string') {
        console.error('Server address is not of type: AddressInfo');
        process.exit(1);
      } else {
        serverAddress = `http://localhost:${address.port}`;
      }
      resolve();
    });
  });
});

afterAll(async () => {
  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
});

test('for GET Request, send headers and query parameters through the request', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: '/200', headers, queryParameters });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(true);
  expect(response.isError()).toBe(false);
  expect(() => response.getErrorResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not an error response]`);

  const successResponse = response.getSuccessResponse();
  expect(successResponse.type).toBe('success');
  expect(successResponse.statusCode).toBe(200);
  expect(successResponse.data).toStrictEqual({
    message: '200',
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
    },
    receivedSearchParams,
  });
});

test('for GET Request, send headers and query parameters through the request using absolute url', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: `${serverAddress}/200`, headers, queryParameters });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(true);
  expect(response.isError()).toBe(false);
  expect(() => response.getErrorResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not an error response]`);

  const successResponse = response.getSuccessResponse();
  expect(successResponse.type).toBe('success');
  expect(successResponse.statusCode).toBe(200);
  expect(successResponse.data).toStrictEqual({
    message: '200',
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
    },
    receivedSearchParams,
  });
});

test('for GET Request, should abort the request', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: '/201', headers, queryParameters });

  const [response] = await Promise.all([
    // actual request (takes 1 second)
    executor.execute(),
    // simulate abort after 100 milliseconds
    new Promise((resolve) => {
      executor.abortController.abort();
      resolve(null);
    }),
  ]);

  expect(response.isSuccess()).toBe(false);
  expect(response.isError()).toBe(true);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.statusCode).toBeNull();
  expect(errorResponse.errorMessage).toBe('This operation was aborted');
  expect(errorResponse.error).toMatchInlineSnapshot(`[AbortError: This operation was aborted]`);
});

test('for GET Request, parse the 4xx response as text error', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: '/401', headers, queryParameters });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(false);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);
  expect(response.isError()).toBe(true);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.errorMessage).toMatchInlineSnapshot(`"You are not authenticated"`);
  expect(errorResponse.error).toBeNull();
});

test('for GET Request, parse the 4xx response as json error', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: '/403', headers, queryParameters });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(false);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);
  expect(response.isError()).toBe(true);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.errorMessage).toMatchInlineSnapshot(`"Bad request"`);
  expect(errorResponse.error).toStrictEqual({
    message: 'You are not authorized',
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
    },
    receivedSearchParams,
  });
});

test('for GET Request, parse the 5xx response as error', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: '/500', headers, queryParameters });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(false);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);
  expect(response.isError()).toBe(true);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.errorMessage).toMatchInlineSnapshot(`"Something went wrong on the server"`);
  expect(errorResponse.error).toMatchInlineSnapshot(`"Oh crap! Something went wrong..."`);
});

test('for POST Request, send headers, query parameters and json data through the request', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({ path: '/200', headers, queryParameters, data: postData });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(true);
  expect(response.isError()).toBe(false);
  expect(() => response.getErrorResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not an error response]`);

  const successResponse = response.getSuccessResponse();
  expect(successResponse.type).toBe('success');
  expect(successResponse.statusCode).toBe(200);
  expect(successResponse.data).toStrictEqual({
    message: '200',
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      ...getPostRequestReceivedHeaders(),
    },
    receivedSearchParams,
    receivedData: postData,
  });
});

test('for POST Request, send headers, query parameters and form data through the request', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({ path: '/200', headers, queryParameters, data: formData });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(true);
  expect(response.isError()).toBe(false);
  expect(() => response.getErrorResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not an error response]`);

  const successResponse = response.getSuccessResponse();
  expect(successResponse.type).toBe('success');
  expect(successResponse.statusCode).toBe(200);

  const responseData = successResponse.data as { receivedHeaders: Record<string, string> };
  expect(responseData.receivedHeaders['content-type'].startsWith('multipart/form-data;'));
  delete responseData.receivedHeaders['content-type'];

  expect(successResponse.data).toStrictEqual({
    message: '200',
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      'content-length': '131',
    },
    receivedSearchParams,
    receivedData: {},
  });
});

test('for POST Request, send headers, query parameters and data through the request using absolute url', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({ path: `${serverAddress}/200`, headers, queryParameters, data: postData });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(true);
  expect(response.isError()).toBe(false);
  expect(() => response.getErrorResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not an error response]`);

  const successResponse = response.getSuccessResponse();
  expect(successResponse.type).toBe('success');
  expect(successResponse.statusCode).toBe(200);
  expect(successResponse.data).toStrictEqual({
    message: '200',
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      ...getPostRequestReceivedHeaders(),
    },
    receivedSearchParams,
    receivedData: postData,
  });
});

test('for POST Request, should abort the request', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({ path: '/201', headers, queryParameters, data: postData });

  const [response] = await Promise.all([
    // actual request (takes 1 second)
    executor.execute(),
    // simulate abort after 100 milliseconds
    new Promise((resolve) => {
      executor.abortController.abort();
      resolve(null);
    }),
  ]);

  expect(response.isSuccess()).toBe(false);
  expect(response.isError()).toBe(true);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.statusCode).toBeNull();
  expect(errorResponse.errorMessage).toBe('This operation was aborted');
  expect(errorResponse.error).toMatchInlineSnapshot(`[AbortError: This operation was aborted]`);
});

test('for POST Request, parse the 4xx response as text error', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({ path: '/401', headers, queryParameters, data: postData });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(false);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);
  expect(response.isError()).toBe(true);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.errorMessage).toMatchInlineSnapshot(`"You are not authenticated"`);
  expect(errorResponse.error).toBeNull();
});

test('for POST Request, parse the 4xx response as json error', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({ path: '/403', headers, queryParameters, data: postData });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(false);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);
  expect(response.isError()).toBe(true);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.errorMessage).toMatchInlineSnapshot(`"Bad request"`);
  expect(errorResponse.error).toStrictEqual({
    message: 'You are not authorized',
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      ...getPostRequestReceivedHeaders(),
    },
    receivedSearchParams,
    receivedData: postData,
  });
});

test('for POST Request, parse the 5xx response as error', async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({ path: '/500', headers, queryParameters, data: postData });

  const response = await executor.execute();

  expect(response.isSuccess()).toBe(false);
  expect(() => response.getSuccessResponse()).toThrowErrorMatchingInlineSnapshot(`[Error: Not a success response]`);
  expect(response.isError()).toBe(true);

  const errorResponse = response.getErrorResponse();
  expect(errorResponse.type).toBe('error');
  expect(errorResponse.errorMessage).toMatchInlineSnapshot(`"Something went wrong on the server"`);
  expect(errorResponse.error).toMatchInlineSnapshot(`"Oh crap! Something went wrong..."`);
});
