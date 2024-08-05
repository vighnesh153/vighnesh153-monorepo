import { XmlLexer } from './Lexer';

const WHITE_SPACE_CHARACTERS = [' ', '\t', '\n', '\r'];

export function skipWhitespace(lexer: XmlLexer): void {
  let currCh = lexer.inputReader.currentCharacter;
  while (currCh !== null && WHITE_SPACE_CHARACTERS.includes(currCh)) {
    lexer.inputReader.readNextCharacter();
    currCh = lexer.inputReader.currentCharacter;
  }
}
