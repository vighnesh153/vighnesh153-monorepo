import { test, expect } from 'vitest';
import { LexerError, LexerInputReader, StringLexerInput } from '@vighnesh153/lexer-core';
import { XmlLexer } from './Lexer';
import { nextToken } from './nextToken';
import { Token, TokenTypes } from './tokens';
import { repeat } from '@vighnesh153/utils';

function createLexer(input: string): XmlLexer {
  const lexerInput = new StringLexerInput(input);
  const reader = new LexerInputReader(lexerInput);
  return new XmlLexer(reader);
}

test('should return EOF for empty string', () => {
  const lexer = createLexer('');

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 0,
    tokenLiteral: 'EOF',
    tokenType: TokenTypes.EOF,
  } satisfies Token);
});

test('should report error if illegal character found', () => {
  const lexer = createLexer(`
<?xml version="1.0" encoding="utf-8"?>
& <manifest />
    `);

  // skip past: <?xml version="1.0" encoding="utf-8"?>
  repeat(11, () => nextToken(lexer));

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 3,
    columnNumber: 1,
    tokenLiteral: '&',
    tokenType: TokenTypes.ILLEGAL,
  });

  expect(lexer.errors).toMatchInlineSnapshot([
    new LexerError({
      errorMessage: `Illegal character: &`,
      lineNumber: 3,
      columnNumber: 1,
    }),
  ]);
});

test('should parse naked xml tag', () => {
  const lexer = createLexer('<?xml?>');

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: TokenTypes.LEFT_ANGLE_BRACKET,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 2,
    tokenLiteral: '?',
    tokenType: TokenTypes.QUESTION_MARK,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 3,
    tokenLiteral: 'xml',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 6,
    tokenLiteral: '?',
    tokenType: TokenTypes.QUESTION_MARK,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 7,
    tokenLiteral: '>',
    tokenType: TokenTypes.RIGHT_ANGLE_BRACKET,
  } satisfies Token);
});

test('should parse xml tag', () => {
  const lexer = createLexer('<?xml version="1.0" encoding="utf-8"?>');

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: TokenTypes.LEFT_ANGLE_BRACKET,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 2,
    tokenLiteral: '?',
    tokenType: TokenTypes.QUESTION_MARK,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 3,
    tokenLiteral: 'xml',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 7,
    tokenLiteral: 'version',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 14,
    tokenLiteral: '=',
    tokenType: TokenTypes.EQUALS,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 15,
    tokenLiteral: '1.0',
    tokenType: TokenTypes.STRING_LITERAL,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 21,
    tokenLiteral: 'encoding',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 29,
    tokenLiteral: '=',
    tokenType: TokenTypes.EQUALS,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 30,
    tokenLiteral: 'utf-8',
    tokenType: TokenTypes.STRING_LITERAL,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 37,
    tokenLiteral: '?',
    tokenType: TokenTypes.QUESTION_MARK,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 38,
    tokenLiteral: '>',
    tokenType: TokenTypes.RIGHT_ANGLE_BRACKET,
  } satisfies Token);
});

test('parse empty manifest', () => {
  const lexer = createLexer(`
<?xml version="1.0" encoding="utf-8"?>
<manifest 
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pokemon.pikachu">
</manifest>
    `);

  // skip past: <?xml version="1.0" encoding="utf-8"?>
  repeat(11, () => {
    nextToken(lexer);
  });

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 3,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: TokenTypes.LEFT_ANGLE_BRACKET,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 3,
    columnNumber: 2,
    tokenLiteral: 'manifest',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 5,
    tokenLiteral: 'xmlns',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 10,
    tokenLiteral: ':',
    tokenType: TokenTypes.COLON,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 11,
    tokenLiteral: 'android',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 18,
    tokenLiteral: '=',
    tokenType: TokenTypes.EQUALS,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 19,
    tokenLiteral: 'http://schemas.android.com/apk/res/android',
    tokenType: TokenTypes.STRING_LITERAL,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 5,
    tokenLiteral: 'package',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 12,
    tokenLiteral: '=',
    tokenType: TokenTypes.EQUALS,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 13,
    tokenLiteral: 'com.pokemon.pikachu',
    tokenType: TokenTypes.STRING_LITERAL,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 34,
    tokenLiteral: '>',
    tokenType: TokenTypes.RIGHT_ANGLE_BRACKET,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: TokenTypes.LEFT_ANGLE_BRACKET,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 2,
    tokenLiteral: '/',
    tokenType: TokenTypes.FORWARD_SLASH,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 3,
    tokenLiteral: 'manifest',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 11,
    tokenLiteral: '>',
    tokenType: TokenTypes.RIGHT_ANGLE_BRACKET,
  } satisfies Token);
});

test('parse comment', () => {
  const lexer = createLexer(`
<?xml version="1.0" encoding="utf-8"?>
<manifest 
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pokemon.pikachu">
    <!-- This is a comment -->
</manifest>
    `);

  // skip past opening tag of manifest
  repeat(22, () => {
    nextToken(lexer);
  });

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 5,
    tokenLiteral: ' This is a comment ',
    tokenType: TokenTypes.COMMENT,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: TokenTypes.LEFT_ANGLE_BRACKET,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 2,
    tokenLiteral: '/',
    tokenType: TokenTypes.FORWARD_SLASH,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 3,
    tokenLiteral: 'manifest',
    tokenType: TokenTypes.IDENTIFIER,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 11,
    tokenLiteral: '>',
    tokenType: TokenTypes.RIGHT_ANGLE_BRACKET,
  } satisfies Token);
});

test('should report error if comment start is invalid', () => {
  const lexer = createLexer(`<!<<`);

  // attempting to read next token (comment literal) should report an error
  nextToken(lexer);
  expect(lexer.errors).toMatchInlineSnapshot([
    new LexerError({
      errorMessage: `Unexpected character: '<'`,
      lineNumber: 1,
      columnNumber: 3,
    }),
    new LexerError({
      errorMessage: `Unexpected character: '<'`,
      lineNumber: 1,
      columnNumber: 4,
    }),
  ]);
});

test('should report error if comment is unclosed', () => {
  const lexer = createLexer(`<!--`);

  // attempting to read next token (comment literal) should report an error
  nextToken(lexer);
  expect(lexer.errors).toMatchInlineSnapshot([
    new LexerError({
      errorMessage: `Unclosed comment literal`,
      lineNumber: 1,
      columnNumber: 4,
    }),
  ]);
});

test('should read escape sequences', () => {
  const lexer = createLexer(`
<my-tag prop="\\n \\" \\u1234 \\t \\\\">
</my-tag>
    `);

  repeat(4, () => nextToken(lexer));

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 2,
    columnNumber: 14,
    tokenLiteral: '\n " \u1234 \t \\',
    tokenType: TokenTypes.STRING_LITERAL,
  } satisfies Token);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 2,
    columnNumber: 34,
    tokenLiteral: '>',
    tokenType: TokenTypes.RIGHT_ANGLE_BRACKET,
  } satisfies Token);
});

test('should report error if unicode sequence is invalid', () => {
  const lexer = createLexer(`
<my-tag prop="\\n \\" \\u123x"`);

  repeat(4, () => nextToken(lexer));

  // attempting to read next token (string literal) should report an error
  nextToken(lexer);
  expect(lexer.errors).toMatchInlineSnapshot([
    new LexerError({
      errorMessage: 'Invalid unicode character: x',
      lineNumber: 2,
      columnNumber: 25,
    }),
  ]);
});

test('should report error if escape sequence is invalid', () => {
  const lexer = createLexer(`
<my-tag prop="\\x"`);

  repeat(4, () => nextToken(lexer));

  // attempting to read next token (string literal) should report an error
  nextToken(lexer);
  expect(lexer.errors).toMatchInlineSnapshot([
    new LexerError({
      errorMessage: 'Invalid escape character literal: x',
      lineNumber: 2,
      columnNumber: 16,
    }),
  ]);
});

test('should report error if escape sequence is unclosed', () => {
  const lexer = createLexer(`
<my-tag prop="\\n \\`);

  repeat(4, () => nextToken(lexer));

  // attempting to read next token (string literal) should report an error
  nextToken(lexer);
  expect(lexer.errors).toMatchInlineSnapshot([
    new LexerError({
      errorMessage: 'Unclosed escape sequence',
      lineNumber: 2,
      columnNumber: 18,
    }),
    new LexerError({
      errorMessage: 'Unclosed string literal',
      lineNumber: 2,
      columnNumber: 18,
    }),
  ]);
});

test('should read naked identifier', () => {
  const lexer = createLexer(`my-tag`);

  expect(nextToken(lexer)).toStrictEqual({
    tokenType: TokenTypes.IDENTIFIER,
    tokenLiteral: 'my-tag',
    lineNumber: 1,
    columnNumber: 1,
  });
});
