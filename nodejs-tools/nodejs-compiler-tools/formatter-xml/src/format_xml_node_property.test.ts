import { test, expect } from 'vitest';
import { formatXmlNodeProperty } from './format_xml_node_property';
import { Token, TokenType, TokenTypes } from '@vighnesh153/lexer-xml';

function createToken(tokenLiteral: string, tokenType: TokenType): Token {
  return {
    lineNumber: 1,
    columnNumber: 1,
    tokenLiteral,
    tokenType,
  } satisfies Token;
}

test('should format property with single property key', () => {
  expect(
    formatXmlNodeProperty({
      colonSeparatedKeys: [createToken('pokemon', TokenTypes.IDENTIFIER)],
      value: createToken('pikachu', TokenTypes.STRING_LITERAL),
    })
  ).toMatchInlineSnapshot(`"pokemon="pikachu""`);
});

test('should format property with multiple property keys', () => {
  expect(
    formatXmlNodeProperty({
      colonSeparatedKeys: [
        createToken('pokemon', TokenTypes.IDENTIFIER),
        createToken('electric', TokenTypes.IDENTIFIER),
        createToken('yellow', TokenTypes.IDENTIFIER),
      ],
      value: createToken('pikachu', TokenTypes.STRING_LITERAL),
    })
  ).toMatchInlineSnapshot(`"pokemon:electric:yellow="pikachu""`);
});
