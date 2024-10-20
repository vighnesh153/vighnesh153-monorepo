import { test, expect } from 'vitest';

import { cloneToken, Token } from './tokens.ts';

test('should clone token', () => {
  const token: Token<'dummy_token_type'> = {
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: 'dummy token literal',
    tokenType: 'dummy_token_type',
  };

  const clonedToken = cloneToken(token);

  // reference equality
  expect(clonedToken).not.toBe(token);
  // value equality
  expect(clonedToken).toStrictEqual({
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: 'dummy token literal',
    tokenType: 'dummy_token_type',
  });
});
