import { EOF_CHARACTER, type Lexer } from "@/compiler_fe/lexer_core/mod.ts";
import type { XmlTokenType } from "./tokens.ts";

const LEFT_ANGLE_BRACKET = "<";

export function readTextNode(lexer: Lexer<XmlTokenType>): string {
  const textNodeBuilder: string[] = [];

  let currCh = lexer.inputReader.currentCharacter;
  while (
    lexer.inputReader.peekCharacter() !== LEFT_ANGLE_BRACKET &&
    currCh !== EOF_CHARACTER
  ) {
    textNodeBuilder.push(currCh);
    lexer.inputReader.readNextCharacter();
    currCh = lexer.inputReader.currentCharacter;
  }

  if (lexer.inputReader.peekCharacter() === LEFT_ANGLE_BRACKET) {
    textNodeBuilder.push(lexer.inputReader.currentCharacter!);
  }

  return textNodeBuilder.join("");
}
