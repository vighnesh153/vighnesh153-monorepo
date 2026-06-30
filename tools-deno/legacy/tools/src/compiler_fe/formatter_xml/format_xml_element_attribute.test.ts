import { assertSnapshot } from "@std/testing/snapshot";
import type { Token } from "@/compiler_fe/lexer_core/mod.ts";
import { XmlTokenType } from "@/compiler_fe/lexer_xml/mod.ts";
import { XmlElementAttribute } from "@/compiler_fe/parser_xml/ast.ts";
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

Deno.test("formatXmlElementAttribute should format attribute with single namespace", async (t) => {
  await assertSnapshot(
    t,
    formatXmlElementAttribute(
      new XmlElementAttribute(
        createToken("pokemon", XmlTokenType.Identifier),
        createToken("pikachu", XmlTokenType.StringLiteral),
      ),
    ),
  );
});

Deno.test("formatXmlElementAttribute should format attribute with multiple namespaces", async (t) => {
  await assertSnapshot(
    t,
    formatXmlElementAttribute(
      new XmlElementAttribute(
        createToken("pokemon.electric.yellow", XmlTokenType.Identifier),
        createToken("pikachu", XmlTokenType.StringLiteral),
      ),
    ),
  );
});
