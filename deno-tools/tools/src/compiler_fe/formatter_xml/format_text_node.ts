import type { XmlTextNode } from "@/compiler_fe/parser_xml/mod.ts";
import { buildIndentationSpace } from "./build_indentation_space.ts";

type FormatTextNodeOptions = {
  textNode: XmlTextNode;
  indentationLevel: number;
  indentation: number;
};

export function formatTextNode(
  { textNode, indentationLevel, indentation }: FormatTextNodeOptions,
): string {
  return buildIndentationSpace({ indentationLevel, indentation }) +
    textNode.text.tokenLiteral.trim();
}
