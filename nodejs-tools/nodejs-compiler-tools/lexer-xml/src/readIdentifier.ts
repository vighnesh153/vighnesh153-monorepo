/* eslint-disable @typescript-eslint/no-use-before-define */

import { ALPHABET, DIGITS, assert } from '@vighnesh153/tools-platform-independent';
import { XmlLexer } from './Lexer';

export function readIdentifier(lexer: XmlLexer): string {
  assert(
    isAcceptableIdentifierCharacter(lexer.inputReader.currentCharacter),
    `You should not attempt to read an identifier which doesn't start with '_' or a letter`
  );

  const identifierBuilder: string[] = [];
  while (isAcceptableIdentifierCharacter(lexer.inputReader.peekCharacter())) {
    identifierBuilder.push(lexer.inputReader.currentCharacter!);
    lexer.inputReader.readNextCharacter();
  }
  if (isAcceptableIdentifierCharacter(lexer.inputReader.currentCharacter)) {
    identifierBuilder.push(lexer.inputReader.currentCharacter!);
  }
  return identifierBuilder.join('');
}

export function isAcceptableIdentifierStart(char: string): boolean {
  return ALPHABET.includes(char) || char === '_';
}

export function isAcceptableIdentifierCharacter(char: string | null): boolean {
  if (char === null) {
    return false;
  }
  return isAcceptableIdentifierStart(char) || DIGITS.includes(char) || char === '-';
}
