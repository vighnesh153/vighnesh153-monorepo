import { XmlElementProperty } from '@vighnesh153/parser-xml';

export function formatXmlNodeProperty({ colonSeparatedKeys, value }: XmlElementProperty): string {
  const combinedKey = colonSeparatedKeys.map((key) => key.tokenLiteral).join(':');
  return `${combinedKey}="${value.tokenLiteral}"`;
}
