import { XmlTagNode } from '@vighnesh153/parser-xml';
import { buildIndentationSpace } from './build_indentation_space';
import { formatXmlNodeProperty } from './format_xml_node_property';
import { formatXmlExpression } from './format_xml_expression';

type FormatXmlTagNodeConfig = {
  xmlTagNode: XmlTagNode;
  indentationLevel: number;
  indentation: number;
};

export function formatXmlTagNode({ xmlTagNode, indentationLevel, indentation }: FormatXmlTagNodeConfig): string {
  const { tagIdentifier, properties, children } = xmlTagNode;

  const stringBuilder: string[] = [];

  // push: <tag-name
  stringBuilder.push(`${buildIndentationSpace({ indentationLevel, indentation })}<${tagIdentifier.tokenLiteral}`);

  // push properties
  if (properties.length === 1) {
    stringBuilder[stringBuilder.length - 1] += ' ' + formatXmlNodeProperty(properties[0]);
  } else if (properties.length > 1) {
    properties.forEach((property) => {
      stringBuilder.push(
        `${buildIndentationSpace({ indentation, indentationLevel: indentationLevel + 1 })}${property.toString()}`
      );
    });
  }

  if (children.length === 0) {
    // push self closing tag's end marker
    stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + ' />';
  } else {
    // push tag opening's end marker
    stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + '>';

    // puh children
    for (const child of children) {
      stringBuilder.push(
        formatXmlExpression({ expression: child, indentation, indentationLevel: indentationLevel + 1 })
      );
    }

    // push closing tag
    stringBuilder.push(`${buildIndentationSpace({ indentationLevel, indentation })}</${tagIdentifier.tokenLiteral}>`);
  }

  return stringBuilder.join('\n');
}
