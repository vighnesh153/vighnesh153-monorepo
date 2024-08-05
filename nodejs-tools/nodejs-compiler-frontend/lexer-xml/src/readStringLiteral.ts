import { EOF_CHARACTER, LexerError } from '@vighnesh153/lexer-core';
import { XmlLexer } from './Lexer';
import { readEscapeSequence } from './readEscapeSequence';

const DOUBLE_QUOTE = '"';

export function readStringLiteral(lexer: XmlLexer): string {
  if (lexer.inputReader.currentCharacter != DOUBLE_QUOTE) {
    throw new Error(`You should not attempt to read a string literal if it doesn't start with '"'`);
  }

  // move over the first double quote
  lexer.inputReader.readNextCharacter();

  const stringLiteralBuilder: string[] = [];

  let currCh = lexer.inputReader.currentCharacter;
  while (currCh !== DOUBLE_QUOTE && currCh !== EOF_CHARACTER) {
    if (currCh === '\\') {
      stringLiteralBuilder.push(readEscapeSequence(lexer));
    } else {
      stringLiteralBuilder.push(currCh);
    }
    lexer.inputReader.readNextCharacter();
    currCh = lexer.inputReader.currentCharacter;
  }

  if (currCh === EOF_CHARACTER) {
    lexer.addError(
      new LexerError({
        errorMessage: 'Unclosed string literal',
        lineNumber: lexer.inputReader.lineNumber,
        columnNumber: lexer.inputReader.columnNumber,
      })
    );
  }

  return stringLiteralBuilder.join('');
}
