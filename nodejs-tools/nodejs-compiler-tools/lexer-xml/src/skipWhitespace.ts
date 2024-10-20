import { Lexer } from '@vighnesh153/lexer-core';
import { XmlTokenType } from './tokens.ts';

const WHITE_SPACE_CHARACTERS = [' ', '\t', '\n', '\r'];

export function skipWhitespace(lexer: Lexer<XmlTokenType>): void {
  let currCh = lexer.inputReader.currentCharacter;
  while (currCh !== null && WHITE_SPACE_CHARACTERS.includes(currCh)) {
    lexer.inputReader.readNextCharacter();
    currCh = lexer.inputReader.currentCharacter;
  }
}
