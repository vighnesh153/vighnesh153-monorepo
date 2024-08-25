import { XmlCommentNode, XmlExpression, XmlPrologNode, XmlTagNode } from '@vighnesh153/parser-xml';
import { formatXmlPrologNode } from './format_xml_prolog_node';
import { formatXmlTagNode } from './format_xml_tag_node';
import { formatCommentNode } from './format_comment_node';

type FormatXmlExpressionProps = {
  readonly expression: Readonly<XmlExpression>;
  readonly indentation: number;
  readonly indentationLevel: number;
  readonly sortAttributes: boolean;
};

export function formatXmlExpression({
  expression,
  indentation,
  indentationLevel,
  sortAttributes,
}: FormatXmlExpressionProps): string {
  if (expression instanceof XmlPrologNode) {
    return formatXmlPrologNode({
      xmlPrologNode: expression,
      indentationLevel,
      indentation,
    });
  }
  if (expression instanceof XmlTagNode) {
    return formatXmlTagNode({
      xmlTagNode: expression,
      indentationLevel,
      indentation,
      sortAttributes,
    });
  }
  if (expression instanceof XmlCommentNode) {
    return formatCommentNode({
      commentNode: expression,
      indentationLevel,
      indentation,
    });
  }
  throw new Error(`Unexpected xml expression: ${expression.toString(0)}`, {
    cause: expression,
  });
}
