import type { XmlCommentNode } from "@/compiler_fe/parser_xml/mod.ts";
import { buildIndentationSpace } from "./build_indentation_space.ts";

type FormatCommentNodeOptions = {
  commentNode: XmlCommentNode;
  indentationLevel: number;
  indentation: number;
};

export function formatCommentNode(
  { commentNode, indentationLevel, indentation }: FormatCommentNodeOptions,
): string {
  return (
    buildIndentationSpace({ indentationLevel, indentation }) +
    `<!-- ${commentNode.comment.tokenLiteral.trim()} -->`
  );
}
