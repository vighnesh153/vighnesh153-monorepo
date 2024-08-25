import { XmlTagNode } from '@vighnesh153/parser-xml';
import { buildIndentationSpace } from './build_indentation_space';
import { formatXmlElementAttribute } from './format_xml_element_attribute';
import { formatXmlExpression } from './format_xml_expression';
import { sortAttributes } from './sort_attributes';

type FormatXmlTagNodeConfig = {
  xmlTagNode: XmlTagNode;
  indentationLevel: number;
  indentation: number;
  sortAttributes: boolean;
};

export function formatXmlTagNode({
  xmlTagNode,
  indentationLevel,
  indentation,
  sortAttributes: shouldSortAttributes,
}: FormatXmlTagNodeConfig): string {
  const { tagIdentifier, attributes, children } = xmlTagNode;

  const stringBuilder: string[] = [];

  // push: <tag-name
  stringBuilder.push(`${buildIndentationSpace({ indentationLevel, indentation })}<${tagIdentifier.tokenLiteral}`);

  // push attributes
  if (attributes.length === 1) {
    stringBuilder[stringBuilder.length - 1] += ' ' + formatXmlElementAttribute(attributes[0]);
  } else if (attributes.length > 1) {
    (shouldSortAttributes ? sortAttributes(attributes) : attributes)
      .map((attribute) => formatXmlElementAttribute(attribute))
      .forEach((formattedAttribute) => {
        stringBuilder.push(
          `${buildIndentationSpace({ indentation, indentationLevel: indentationLevel + 1 })}${formattedAttribute}`
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
        formatXmlExpression({
          expression: child,
          indentation,
          indentationLevel: indentationLevel + 1,
          sortAttributes: shouldSortAttributes,
        })
      );
    }

    // push closing tag
    stringBuilder.push(`${buildIndentationSpace({ indentationLevel, indentation })}</${tagIdentifier.tokenLiteral}>`);
  }

  return stringBuilder.join('\n');
}
