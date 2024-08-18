/* eslint-disable @typescript-eslint/no-use-before-define */
import { ALPHABET, DIGITS, not } from '@vighnesh153/utils';
import { XmlLexer } from './Lexer';

export function readIdentifier(lexer: XmlLexer): string {
  /* v8 ignore next 3 */
  if (not(isAcceptableIdentifierCharacter(lexer.inputReader.currentCharacter))) {
    throw new Error(`You should not attempt to read an identifier which doesn't start with '_' or a letter`);
  }

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
