/* eslint-disable @typescript-eslint/no-use-before-define */

import { ALPHABET, DIGITS } from "@vighnesh153/tools";
import { assert } from "@std/assert";
import { Lexer } from "@vighnesh153/lexer-core";
import { XmlTokenType } from "./tokens.ts";

export function readIdentifier(lexer: Lexer<XmlTokenType>): string {
  assert(
    isAcceptableIdentifierCharacter(lexer.inputReader.currentCharacter),
    `You should not attempt to read an identifier which doesn't start with '_' or a letter`,
  );

  const identifierBuilder: string[] = [];
  while (isAcceptableIdentifierCharacter(lexer.inputReader.peekCharacter())) {
    identifierBuilder.push(lexer.inputReader.currentCharacter!);
    lexer.inputReader.readNextCharacter();
  }
  if (isAcceptableIdentifierCharacter(lexer.inputReader.currentCharacter)) {
    identifierBuilder.push(lexer.inputReader.currentCharacter!);
  }
  return identifierBuilder.join("");
}

export function isAcceptableIdentifierStart(char: string): boolean {
  return ALPHABET.includes(char) || char === "_";
}

export function isAcceptableIdentifierCharacter(char: string | null): boolean {
  if (char === null) {
    return false;
  }
  return isAcceptableIdentifierStart(char) || DIGITS.includes(char) ||
    char === "-";
}
