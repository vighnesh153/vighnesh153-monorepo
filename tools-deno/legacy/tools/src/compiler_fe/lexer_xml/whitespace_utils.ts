import type { Lexer } from "@/compiler_fe/lexer_core/mod.ts";
import type { XmlTokenType } from "./tokens.ts";

const WHITE_SPACE_CHARACTERS = [" ", "\t", "\n", "\r"];

export function skipWhitespace(lexer: Lexer<XmlTokenType>): void {
  let currCh = lexer.inputReader.currentCharacter;
  while (currCh !== null && isWhitespace(currCh)) {
    lexer.inputReader.readNextCharacter();
    currCh = lexer.inputReader.currentCharacter;
  }
}

export function isWhitespace(char: string | null): boolean {
  if (char == null) {
    return false;
  }
  return WHITE_SPACE_CHARACTERS.includes(char);
}
