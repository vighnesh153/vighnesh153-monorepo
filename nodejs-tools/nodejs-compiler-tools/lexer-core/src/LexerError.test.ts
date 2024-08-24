import { expect, test } from 'vitest';
import { LexerError } from './LexerError';

test('should create the error object', () => {
  const error = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorMessage: 'Pikachu is the best',
  });

  expect(error.columnNumber).toBe(999);
  expect(error.lineNumber).toBe(100);
  expect(error.errorMessage).toBe('Pikachu is the best');
});

test('should copy the error object', () => {
  const error = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorMessage: 'Pikachu is the best',
  });
  const copy = error.copy();

  expect(copy).not.toBe(error);
  expect(copy.columnNumber).toBe(999);
  expect(copy.lineNumber).toBe(100);
  expect(copy.errorMessage).toBe('Pikachu is the best');
});

test('copy should allow overriding errorMessage in error object', () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorMessage: 'Pikachu is the best',
  }).copy({
    errorMessage: 'Greninja is a G.O.A.T',
  });

  expect(copy.errorMessage).toBe('Greninja is a G.O.A.T');
});

test('copy should allow overriding lineNumber in error object', () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorMessage: 'Pikachu is the best',
  }).copy({
    lineNumber: 101,
  });

  expect(copy.lineNumber).toBe(101);
});

test('copy should allow overriding columnNumber in error object', () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorMessage: 'Pikachu is the best',
  }).copy({
    columnNumber: 1001,
  });

  expect(copy.columnNumber).toBe(1001);
});
