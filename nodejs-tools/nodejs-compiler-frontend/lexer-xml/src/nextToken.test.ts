import { test, expect } from 'vitest';
import { LexerInputReader, StringLexerInput } from '@vighnesh153/lexer-core';
import { XmlLexer } from './Lexer';
import { nextToken } from './nextToken';
import { Token, TokenTypes } from './tokens';

test('should return EOF for empty string', () => {
  const input = new StringLexerInput('');
  const reader = new LexerInputReader(input);
  const lexer = new XmlLexer(reader);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 0,
    tokenLiteral: 'EOF',
    tokenType: TokenTypes.EOF,
  } satisfies Token);
});
