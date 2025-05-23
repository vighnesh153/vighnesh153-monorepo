import type { XmlProgram } from "@/compiler_fe/parser_xml/mod.ts";
import { formatXmlExpression } from "./format_xml_expression.ts";

type FormatXmlProgramConfig = {
  readonly program: XmlProgram;
  readonly indentation: number;
  readonly sortAttributes: boolean;
};

export function formatXmlProgram(
  { program, indentation, sortAttributes }: FormatXmlProgramConfig,
): string {
  const stringBuilder: string[] = [];

  for (const statement of program.statements) {
    stringBuilder.push(
      formatXmlExpression({
        expression: statement,
        indentation,
        indentationLevel: 0,
        sortAttributes,
      }),
    );
  }

  return (
    stringBuilder.join("\n") +
    // empty line at the end
    "\n"
  );
}
