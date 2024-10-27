import type { XmlElementAttribute } from "@/compiler_fe/parser_xml/mod.ts";

export function formatXmlElementAttribute(
  { namespaces, value }: XmlElementAttribute,
): string {
  const combinedNamespace = namespaces.map((namespace) =>
    namespace.tokenLiteral
  ).join(":");
  return `${combinedNamespace}="${value.tokenLiteral}"`;
}
