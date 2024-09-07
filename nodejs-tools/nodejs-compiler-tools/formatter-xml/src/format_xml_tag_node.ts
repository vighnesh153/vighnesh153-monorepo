import { XmlTagNode, XmlTextNode } from '@vighnesh153/parser-xml';
import { buildIndentationSpace } from './build_indentation_space';
import { formatXmlElementAttribute } from './format_xml_element_attribute';
import { formatXmlExpression } from './format_xml_expression';
import { sortAttributes } from './sort_attributes';
import { formatTextNode } from './format_text_node';

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
  const { namespaces, attributes, children } = xmlTagNode;

  const tagName = namespaces.map((ns) => ns.tokenLiteral).join(':');

  const stringBuilder: string[] = [];

  // push: <tag-name
  stringBuilder.push(`${buildIndentationSpace({ indentationLevel, indentation })}<${tagName}`);

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

    // if only a text node as child, format it as
    if (children.length === 1 && children[0].astNodeType === 'XML_TEXT_NODE') {
      return (
        stringBuilder.join('\n') +
        formatTextNode({ textNode: children[0] as XmlTextNode, indentation, indentationLevel: 0 }) +
        `</${tagName}>`
      );
    }

    // push children
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
    stringBuilder.push(`${buildIndentationSpace({ indentationLevel, indentation })}</${tagName}>`);
  }

  return stringBuilder.join('\n');
}
