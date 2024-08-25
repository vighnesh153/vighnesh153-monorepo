import { XmlProgram } from '@vighnesh153/parser-xml';
import { formatXmlExpression } from './format_xml_expression';

type FormatXmlProgramConfig = {
  readonly program: XmlProgram;
  readonly indentation: number;
  readonly sortProperties: boolean;
};

export function formatXmlProgram({ program, indentation, sortProperties }: FormatXmlProgramConfig): string {
  const stringBuilder: string[] = [];

  for (const statement of program.statements) {
    stringBuilder.push(
      formatXmlExpression({ expression: statement, indentation, indentationLevel: 0, sortProperties })
    );
  }

  return stringBuilder.join('\n');
}
