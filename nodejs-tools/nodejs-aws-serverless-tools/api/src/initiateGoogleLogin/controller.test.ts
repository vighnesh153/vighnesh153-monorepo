import { test, expect } from 'vitest';
import { controller } from './controller';

test('should return 500 if auth redirect url is empty', () => {
  expect(controller(() => null)).toStrictEqual({
    body: 'Auth redirect url is empty',
    statusCode: 500,
  });
});

test('should return 307 if auth redirect url is not empty', () => {
  expect(controller(() => 'pikachu')).toStrictEqual({
    headers: {
      Location: 'pikachu',
    },
    statusCode: 307,
  });
});
