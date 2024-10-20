import { XmlPrologNode } from '@vighnesh153/parser-xml';
import { buildIndentationSpace } from './build_indentation_space.ts';
import { formatXmlElementAttribute } from './format_xml_element_attribute.ts';

type FormatXmlPrologNodeOptions = {
  xmlPrologNode: XmlPrologNode;
  indentationLevel: number;
  indentation: number;
};

export function formatXmlPrologNode({
  xmlPrologNode,
  indentationLevel,
  indentation,
}: FormatXmlPrologNodeOptions): string {
  const localStringBuilder: string[] = [];

  localStringBuilder.push(buildIndentationSpace({ indentationLevel, indentation }) + `<?xml`);

  for (const attribute of xmlPrologNode.attributes) {
    localStringBuilder.push(formatXmlElementAttribute(attribute));
  }

  return localStringBuilder.join(' ') + `?>`;
}
