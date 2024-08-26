import { EOF_CHARACTER } from '@vighnesh153/lexer-core';
import { XmlLexer } from './Lexer';

const LEFT_ANGLE_BRACKET = '<';

export function readTextNode(lexer: XmlLexer): string {
  const textNodeBuilder: string[] = [];

  let currCh = lexer.inputReader.currentCharacter;
  while (lexer.inputReader.peekCharacter() !== LEFT_ANGLE_BRACKET && currCh !== EOF_CHARACTER) {
    textNodeBuilder.push(currCh);
    lexer.inputReader.readNextCharacter();
    currCh = lexer.inputReader.currentCharacter;
  }

  if (lexer.inputReader.peekCharacter() === LEFT_ANGLE_BRACKET) {
    textNodeBuilder.push(lexer.inputReader.currentCharacter!);
  }

  return textNodeBuilder.join('');
}
