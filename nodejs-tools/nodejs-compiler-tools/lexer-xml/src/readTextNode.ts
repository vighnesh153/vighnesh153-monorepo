import { EOF_CHARACTER, Lexer } from "@vighnesh153/lexer-core";
import { XmlTokenType } from "./tokens.ts";

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
