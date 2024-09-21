import { test, expect } from 'vitest';
import { repeat } from '@vighnesh153/tools-platform-independent';
import { Lexer, LexerError, LexerInputReader, StringLexerInput, Token } from '@vighnesh153/lexer-core';
import { nextToken } from './nextToken';
import { XmlTokenType } from './tokens';

function createLexer(input: string): Lexer<XmlTokenType> {
  const lexerInput = new StringLexerInput(input);
  const reader = new LexerInputReader(lexerInput);
  return new Lexer(reader);
}

test('should return EOF for empty string', () => {
  const lexer = createLexer('');

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 0,
    tokenLiteral: 'Eof',
    tokenType: XmlTokenType.Eof,
  } satisfies Token<XmlTokenType>);
});

test('should parse naked xml tag', () => {
  const lexer = createLexer('<?xml?>');

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: XmlTokenType.LeftAngleBracket,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 2,
    tokenLiteral: '?',
    tokenType: XmlTokenType.QuestionMark,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 3,
    tokenLiteral: 'xml',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 6,
    tokenLiteral: '?',
    tokenType: XmlTokenType.QuestionMark,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 7,
    tokenLiteral: '>',
    tokenType: XmlTokenType.RightAngleBracket,
  } satisfies Token<XmlTokenType>);
});

test('should parse xml tag', () => {
  const lexer = createLexer('<?xml version="1.0" encoding="utf-8"?>');

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: XmlTokenType.LeftAngleBracket,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 2,
    tokenLiteral: '?',
    tokenType: XmlTokenType.QuestionMark,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 3,
    tokenLiteral: 'xml',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 7,
    tokenLiteral: 'version',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 14,
    tokenLiteral: '=',
    tokenType: XmlTokenType.Equals,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 15,
    tokenLiteral: '1.0',
    tokenType: XmlTokenType.StringLiteral,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 21,
    tokenLiteral: 'encoding',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 29,
    tokenLiteral: '=',
    tokenType: XmlTokenType.Equals,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 30,
    tokenLiteral: 'utf-8',
    tokenType: XmlTokenType.StringLiteral,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 37,
    tokenLiteral: '?',
    tokenType: XmlTokenType.QuestionMark,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 38,
    tokenLiteral: '>',
    tokenType: XmlTokenType.RightAngleBracket,
  } satisfies Token<XmlTokenType>);
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
    tokenType: XmlTokenType.LeftAngleBracket,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 3,
    columnNumber: 2,
    tokenLiteral: 'manifest',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 5,
    tokenLiteral: 'xmlns',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 10,
    tokenLiteral: ':',
    tokenType: XmlTokenType.Colon,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 11,
    tokenLiteral: 'android',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 18,
    tokenLiteral: '=',
    tokenType: XmlTokenType.Equals,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 4,
    columnNumber: 19,
    tokenLiteral: 'http://schemas.android.com/apk/res/android',
    tokenType: XmlTokenType.StringLiteral,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 5,
    tokenLiteral: 'package',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 12,
    tokenLiteral: '=',
    tokenType: XmlTokenType.Equals,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 13,
    tokenLiteral: 'com.pokemon.pikachu',
    tokenType: XmlTokenType.StringLiteral,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 5,
    columnNumber: 34,
    tokenLiteral: '>',
    tokenType: XmlTokenType.RightAngleBracket,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: XmlTokenType.LeftAngleBracket,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 2,
    tokenLiteral: '/',
    tokenType: XmlTokenType.ForwardSlash,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 3,
    tokenLiteral: 'manifest',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 6,
    columnNumber: 11,
    tokenLiteral: '>',
    tokenType: XmlTokenType.RightAngleBracket,
  } satisfies Token<XmlTokenType>);
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
    tokenType: XmlTokenType.CommentLiteral,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 1,
    tokenLiteral: '<',
    tokenType: XmlTokenType.LeftAngleBracket,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 2,
    tokenLiteral: '/',
    tokenType: XmlTokenType.ForwardSlash,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 3,
    tokenLiteral: 'manifest',
    tokenType: XmlTokenType.Identifier,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 7,
    columnNumber: 11,
    tokenLiteral: '>',
    tokenType: XmlTokenType.RightAngleBracket,
  } satisfies Token<XmlTokenType>);
});

test('should report error if comment start is invalid', () => {
  const lexer = createLexer(`<!<<`);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 1,
    columnNumber: 3,
    tokenLiteral: '<',
    tokenType: XmlTokenType.Illegal,
  });
  expect(lexer.errors).toStrictEqual([
    new LexerError({
      errorCategory: {
        type: 'UNEXPECTED_COMMENT_CHARACTER',
        ch: '<',
      },
      lineNumber: 1,
      columnNumber: 3,
    }),
  ]);
});

test('should report error if comment is unclosed', () => {
  const lexer = createLexer(`<!--`);

  // attempting to read next token (comment literal) should report an error
  nextToken(lexer);
  expect(lexer.errors).toStrictEqual([
    new LexerError({
      errorCategory: {
        type: 'UNCLOSED_COMMENT_LITERAL',
      },
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
    tokenType: XmlTokenType.StringLiteral,
  } satisfies Token<XmlTokenType>);

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 2,
    columnNumber: 34,
    tokenLiteral: '>',
    tokenType: XmlTokenType.RightAngleBracket,
  } satisfies Token<XmlTokenType>);
});

test('should report error if unicode sequence is invalid', () => {
  const lexer = createLexer(`
<my-tag prop="\\n \\" \\u123x"`);

  repeat(4, () => nextToken(lexer));

  // attempting to read next token (string literal) should report an error
  nextToken(lexer);
  expect(lexer.errors).toStrictEqual([
    new LexerError({
      errorCategory: {
        type: 'INVALID_UNICODE_CHARACTER_LITERAL',
        ch: 'x',
      },
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
  expect(lexer.errors).toStrictEqual([
    new LexerError({
      errorCategory: {
        type: 'INVALID_ESCAPE_CHARACTER_LITERAL',
        ch: 'x',
      },
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
  expect(lexer.errors).toStrictEqual([
    new LexerError({
      errorCategory: {
        type: 'UNCLOSED_ESCAPE_SEQUENCE',
      },
      lineNumber: 2,
      columnNumber: 18,
    }),
    new LexerError({
      errorCategory: {
        type: 'UNCLOSED_STRING_LITERAL',
      },
      lineNumber: 2,
      columnNumber: 18,
    }),
  ]);
});

test('should read tag name', () => {
  const lexer = createLexer(`<my-tag`);

  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 1,
    columnNumber: 1,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'my-tag',
    lineNumber: 1,
    columnNumber: 2,
  });
});

test('should read naked text node', () => {
  const lexer = createLexer(`my-tag`);

  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.TextNode,
    tokenLiteral: 'my-tag',
    lineNumber: 1,
    columnNumber: 1,
  });
});

test('should read text nodes', () => {
  const lexer = createLexer(`
    <pokemon>
      <name>Pikachu</name>
      <types>electric, god</types>
      <desc>
        Best pokemon ever!!!
      </desc>
    </pokemon>
    `);

  // <pokemon>
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 2,
    columnNumber: 5,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'pokemon',
    lineNumber: 2,
    columnNumber: 6,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 2,
    columnNumber: 13,
  });

  // <name>Pikachu</name>
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 3,
    columnNumber: 7,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'name',
    lineNumber: 3,
    columnNumber: 8,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 3,
    columnNumber: 12,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.TextNode,
    tokenLiteral: 'Pikachu',
    lineNumber: 3,
    columnNumber: 13,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 3,
    columnNumber: 20,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.ForwardSlash,
    tokenLiteral: '/',
    lineNumber: 3,
    columnNumber: 21,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'name',
    lineNumber: 3,
    columnNumber: 22,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 3,
    columnNumber: 26,
  });

  // <types>electric, god</types>
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 4,
    columnNumber: 7,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'types',
    lineNumber: 4,
    columnNumber: 8,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 4,
    columnNumber: 13,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.TextNode,
    tokenLiteral: 'electric, god',
    lineNumber: 4,
    columnNumber: 14,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 4,
    columnNumber: 27,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.ForwardSlash,
    tokenLiteral: '/',
    lineNumber: 4,
    columnNumber: 28,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'types',
    lineNumber: 4,
    columnNumber: 29,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 4,
    columnNumber: 34,
  });

  // <desc>
  //    Best pokemon ever!!!
  // </desc>
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 5,
    columnNumber: 7,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'desc',
    lineNumber: 5,
    columnNumber: 8,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 5,
    columnNumber: 12,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.TextNode,
    tokenLiteral: 'Best pokemon ever!!!\n      ',
    lineNumber: 6,
    columnNumber: 9,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 7,
    columnNumber: 7,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.ForwardSlash,
    tokenLiteral: '/',
    lineNumber: 7,
    columnNumber: 8,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'desc',
    lineNumber: 7,
    columnNumber: 9,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 7,
    columnNumber: 13,
  });

  // </pokemon>
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.LeftAngleBracket,
    tokenLiteral: '<',
    lineNumber: 8,
    columnNumber: 5,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.ForwardSlash,
    tokenLiteral: '/',
    lineNumber: 8,
    columnNumber: 6,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.Identifier,
    tokenLiteral: 'pokemon',
    lineNumber: 8,
    columnNumber: 7,
  });
  expect(nextToken(lexer)).toStrictEqual({
    tokenType: XmlTokenType.RightAngleBracket,
    tokenLiteral: '>',
    lineNumber: 8,
    columnNumber: 14,
  });
});

test('should report error if illegal character found', () => {
  const lexer = createLexer(`
<?xml !?>
    `);

  // skip past: <?xml
  repeat(3, () => nextToken(lexer));

  expect(nextToken(lexer)).toStrictEqual({
    lineNumber: 2,
    columnNumber: 7,
    tokenLiteral: '!',
    tokenType: XmlTokenType.Illegal,
  });

  expect(lexer.errors).toStrictEqual([
    new LexerError({
      errorCategory: {
        type: 'ILLEGAL_CHARACTER',
        ch: '!',
      },
      lineNumber: 2,
      columnNumber: 7,
    }),
  ]);
});
