import assert from 'assert';

import { not, repeat } from '@vighnesh153/utils';
import { EOF_CHARACTER, LexerError } from '@vighnesh153/lexer-core';
import { XmlLexer } from './Lexer';

export function readComment(lexer: XmlLexer): string | null {
  assert.ok(
    lexer.inputReader.currentCharacter === '<' && lexer.inputReader.peekCharacter() === '!',
    `Don't attempt to read a comment if string doesn't start with '<!'`
  );

  // Move past <!
  lexer.inputReader.readNextCharacter();
  lexer.inputReader.readNextCharacter();

  // Move past "--"
  let isValidCommentStart = true;
  repeat(2, () => {
    if (lexer.inputReader.currentCharacter !== '-') {
      lexer.addError(
        new LexerError({
          errorMessage: `Unexpected character: '${lexer.inputReader.currentCharacter}'`,
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber,
        })
      );
      isValidCommentStart = false;
    }
    lexer.inputReader.readNextCharacter();
  });
  if (not(isValidCommentStart)) {
    return null;
  }

  const commentLiteralBuilder: string[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const currCh = lexer.inputReader.currentCharacter as string;

    // unclosed comment
    if (currCh === EOF_CHARACTER) {
      lexer.addError(
        new LexerError({
          errorMessage: `Unclosed comment literal`,
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber,
        })
      );
      return null;
    }

    const peek = lexer.inputReader.peekCharacter();
    const peekNext = lexer.inputReader.peekCharacter(1);

    // end of comment
    if (currCh === '-' && peek === '-' && peekNext === '>') {
      // Move past: "--" and land on ">"
      lexer.inputReader.readNextCharacter();
      lexer.inputReader.readNextCharacter();

      return commentLiteralBuilder.join('');
    }

    commentLiteralBuilder.push(currCh);

    // move on to next character
    lexer.inputReader.readNextCharacter();
  }
}
