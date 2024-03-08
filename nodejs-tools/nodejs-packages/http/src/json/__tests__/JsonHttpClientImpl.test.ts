import process from 'node:process';

import { beforeAll, afterAll, test, expect } from 'vitest';
import { app } from './testServer';
import { Server } from 'http';
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

const getCommonReceivedHeaders = () => ({
  accept: 'application/json',
  'accept-encoding': 'gzip, deflate',
  'accept-language': '*',
  connection: 'keep-alive',
  host: serverAddress.slice('http://'.length),
  'sec-fetch-mode': 'cors',
  'user-agent': 'node',
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

test('should send headers and query parameters through the request', async () => {
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

test('should parse the 4xx response as text error', async () => {
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

test('should parse the 4xx response as json error', async () => {
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

test('should parse the 5xx response as error', async () => {
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
