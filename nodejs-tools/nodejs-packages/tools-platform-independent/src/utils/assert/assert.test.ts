import { expect, test } from 'vitest';
import { assert } from './assert';

test('should not throw error if condition is true', () => {
  expect(() => assert(true)).not.toThrowError();
});

test('should throw error if condition is false', () => {
  expect(() => assert(false)).toThrowErrorMatchingInlineSnapshot(`[Error: Assertion failed]`);
});

test('should throw error if condition is false with custom message', () => {
  expect(() => assert(false, 'Pikachu error')).toThrowErrorMatchingInlineSnapshot(`[Error: Pikachu error]`);
});
