import {
  Lexer,
  type LexerError,
  LexerInputReader,
  StringLexerInput,
} from "@/compiler_fe/lexer_core/mod.ts";
import { type ParserError, XmlParser } from "@/compiler_fe/parser_xml/mod.ts";
import type { XmlTokenType } from "@/compiler_fe/lexer_xml/mod.ts";
import type { FormattingOptions } from "./formatting_options.ts";
import { formatXmlProgram } from "./format_xml_program.ts";

export type FormatResponse =
  | {
    type: "lexer-error";
    lexerErrors: readonly LexerError[];
  }
  | {
    type: "parser-error";
    parserErrors: readonly ParserError[];
  }
  | {
    type: "unknown-error";
    err: unknown;
  }
  | {
    type: "success";
    formattedXml: string;
  };

export function format(
  rawXml: string,
  { indentation = 4, sortAttributes = true }: FormattingOptions,
): FormatResponse {
  try {
    const input = new StringLexerInput(rawXml);
    const inputReader = new LexerInputReader(input);
    const lexer = new Lexer<XmlTokenType>(inputReader);
    const parser = new XmlParser(lexer);
    const program = parser.parseProgram();

    if (lexer.errors.length > 0) {
      return {
        type: "lexer-error",
        lexerErrors: lexer.errors,
      };
    }
    if (parser.errors.length > 0) {
      return {
        type: "parser-error",
        parserErrors: parser.errors,
      };
    }

    return {
      type: "success",
      formattedXml: formatXmlProgram({ program, indentation, sortAttributes }),
    };
  } catch (err: unknown) {
    return {
      type: "unknown-error",
      err,
    };
  }
}
