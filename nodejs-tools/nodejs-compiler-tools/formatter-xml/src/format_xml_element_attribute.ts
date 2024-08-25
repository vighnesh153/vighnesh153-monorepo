import { XmlElementAttribute } from '@vighnesh153/parser-xml';

export function formatXmlElementAttribute({ namespaces, value }: XmlElementAttribute): string {
  const combinedNamespace = namespaces.map((namespace) => namespace.tokenLiteral).join(':');
  return `${combinedNamespace}="${value.tokenLiteral}"`;
}
