import { XmlProgram } from '@vighnesh153/parser-xml';
import { formatXmlExpression } from './format_xml_expression';

type FormatXmlProgramConfig = {
  program: XmlProgram;
  indentation: number;
};

export function formatXmlProgram({ program, indentation }: FormatXmlProgramConfig): string {
  const stringBuilder: string[] = [];

  for (const statement of program.statements) {
    stringBuilder.push(formatXmlExpression({ expression: statement, indentation, indentationLevel: 0 }));
  }

  return stringBuilder.join('\n');
}
