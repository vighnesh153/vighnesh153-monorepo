import { test, expect } from 'vitest';

import { cloneToken, Token, TokenTypes, serializeToken } from './tokens';

test('should clone token', () => {
  const token: Token = {
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: 'bla',
    tokenType: TokenTypes.ILLEGAL,
  };

  expect(cloneToken(token)).toStrictEqual({
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: 'bla',
    tokenType: TokenTypes.ILLEGAL,
  });
});

test('should serialize token type', () => {
  expect(TokenTypes.COMMENT.serialized()).toStrictEqual({
    value: 'COMMENT',
  });
});

test('should serialize token', () => {
  const token: Token = {
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: 'bla',
    tokenType: TokenTypes.ILLEGAL,
  };

  expect(serializeToken(token)).toStrictEqual({
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: 'bla',
    tokenType: {
      value: 'ILLEGAL',
    },
  });
});
