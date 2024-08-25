import { XmlPrologNode } from '@vighnesh153/parser-xml';
import { buildIndentationSpace } from './build_indentation_space';
import { formatXmlNodeProperty } from './format_xml_node_property';

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

  for (const property of xmlPrologNode.properties) {
    localStringBuilder.push(formatXmlNodeProperty(property));
  }

  return localStringBuilder.join(' ') + `?>`;
}
