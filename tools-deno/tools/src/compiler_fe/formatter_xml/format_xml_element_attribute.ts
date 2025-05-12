import type { XmlElementAttribute } from "@/compiler_fe/parser_xml/mod.ts";

export function formatXmlElementAttribute(
  attribute: XmlElementAttribute,
): string {
  return `${attribute.attributeName.tokenLiteral}="${attribute.value.tokenLiteral}"`;
}
