import { LexerError, LexerInputReader, StringLexerInput } from '@vighnesh153/lexer-core';
import { XmlLexer } from '@vighnesh153/lexer-xml';
import { ParserError, XmlParser } from '@vighnesh153/parser-xml';
import { FormattingOptions } from './formatting_options';
import { formatXmlProgram } from './format_xml_program';

export type FormatResponse =
  | {
      type: 'lexer-error';
      lexerErrors: readonly LexerError[];
    }
  | {
      type: 'parser-error';
      parserErrors: readonly ParserError[];
    }
  | {
      type: 'unknown-error';
      err: unknown;
    }
  | {
      type: 'success';
      formattedXml: string;
    };

export function format(rawXml: string, { indentation = 4, sortProperties = true }: FormattingOptions): FormatResponse {
  try {
    const input = new StringLexerInput(rawXml);
    const inputReader = new LexerInputReader(input);
    const lexer = new XmlLexer(inputReader);
    const parser = new XmlParser(lexer);
    const program = parser.parseProgram();

    if (lexer.errors.length > 0) {
      return {
        type: 'lexer-error',
        lexerErrors: lexer.errors,
      };
    }
    if (parser.errors.length > 0) {
      return {
        type: 'parser-error',
        parserErrors: parser.errors,
      };
    }

    const [statement] = program.statements;
    if (statement.astNodeType === 'XML_COMMENT_NODE') {
      statement;
    }

    return {
      type: 'success',
      formattedXml: formatXmlProgram({ program, indentation, sortProperties }),
    };
  } catch (err: unknown) {
    return {
      type: 'unknown-error',
      err,
    };
  }
}
