import {
  Lexer,
  LexerInputReader,
  StringLexerInput,
} from "@/compiler_fe/lexer_core/mod.ts";
import type { XmlTokenType } from "@/compiler_fe/lexer_xml/mod.ts";
import { XmlParser, type XmlProgram } from "@/compiler_fe/parser_xml/mod.ts";

export function parseProgram(input: string): [XmlParser, XmlProgram] {
  const stringInput = new StringLexerInput(input);
  const inputReader = new LexerInputReader(stringInput);
  const lexer = new Lexer<XmlTokenType>(inputReader);
  const parser = new XmlParser(lexer);

  return [parser, parser.parseProgram()];
}
