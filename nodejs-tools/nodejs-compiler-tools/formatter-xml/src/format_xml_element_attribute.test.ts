import { test, expect } from 'vitest';
import { formatXmlElementAttribute } from './format_xml_element_attribute';
import { Token, TokenType, TokenTypes } from '@vighnesh153/lexer-xml';

function createToken(tokenLiteral: string, tokenType: TokenType): Token {
  return {
    lineNumber: 1,
    columnNumber: 1,
    tokenLiteral,
    tokenType,
  } satisfies Token;
}

test('should format attribute with single namespace', () => {
  expect(
    formatXmlElementAttribute({
      namespaces: [createToken('pokemon', TokenTypes.IDENTIFIER)],
      value: createToken('pikachu', TokenTypes.STRING_LITERAL),
    })
  ).toMatchInlineSnapshot(`"pokemon="pikachu""`);
});

test('should format attribute with multiple namespaces', () => {
  expect(
    formatXmlElementAttribute({
      namespaces: [
        createToken('pokemon', TokenTypes.IDENTIFIER),
        createToken('electric', TokenTypes.IDENTIFIER),
        createToken('yellow', TokenTypes.IDENTIFIER),
      ],
      value: createToken('pikachu', TokenTypes.STRING_LITERAL),
    })
  ).toMatchInlineSnapshot(`"pokemon:electric:yellow="pikachu""`);
});
