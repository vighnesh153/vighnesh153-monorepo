import { LexerInputReader, StringLexerInput } from '@vighnesh153/lexer-core';
import { XmlLexer } from '@vighnesh153/lexer-xml';
import { XmlParser, XmlProgram } from '@vighnesh153/parser-xml';

export function parseProgram(input: string): [XmlParser, XmlProgram] {
  const stringInput = new StringLexerInput(input);
  const inputReader = new LexerInputReader(stringInput);
  const lexer = new XmlLexer(inputReader);
  const parser = new XmlParser(lexer);

  return [parser, parser.parseProgram()];
}
