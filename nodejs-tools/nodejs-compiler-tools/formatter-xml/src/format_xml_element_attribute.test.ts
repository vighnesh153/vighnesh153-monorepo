import { expect, test } from "vitest";
import { Token } from "@vighnesh153/lexer-core";
import { XmlTokenType } from "@vighnesh153/lexer-xml";
import { formatXmlElementAttribute } from "./format_xml_element_attribute.ts";

function createToken(
  tokenLiteral: string,
  tokenType: XmlTokenType,
): Token<XmlTokenType> {
  return {
    lineNumber: 1,
    columnNumber: 1,
    tokenLiteral,
    tokenType,
  } satisfies Token<XmlTokenType>;
}

test("should format attribute with single namespace", () => {
  expect(
    formatXmlElementAttribute({
      namespaces: [createToken("pokemon", XmlTokenType.Identifier)],
      value: createToken("pikachu", XmlTokenType.StringLiteral),
    }),
  ).toMatchInlineSnapshot(`"pokemon="pikachu""`);
});

test("should format attribute with multiple namespaces", () => {
  expect(
    formatXmlElementAttribute({
      namespaces: [
        createToken("pokemon", XmlTokenType.Identifier),
        createToken("electric", XmlTokenType.Identifier),
        createToken("yellow", XmlTokenType.Identifier),
      ],
      value: createToken("pikachu", XmlTokenType.StringLiteral),
    }),
  ).toMatchInlineSnapshot(`"pokemon:electric:yellow="pikachu""`);
});
