import { not, repeat, assert } from '@vighnesh153/tools-platform-independent';
import { EOF_CHARACTER, Lexer, LexerError } from '@vighnesh153/lexer-core';
import { XmlTokenType } from './tokens';

export function readComment(lexer: Lexer<XmlTokenType>): string | null {
  assert(
    lexer.inputReader.currentCharacter === '<' && lexer.inputReader.peekCharacter() === '!',
    `Don't attempt to read a comment if string doesn't start with '<!'`
  );

  // Move past <!
  lexer.inputReader.readNextCharacter();
  lexer.inputReader.readNextCharacter();

  // Move past "--"
  let isValidCommentStart = true;
  repeat(2, () => {
    if (not(isValidCommentStart)) return;

    if (lexer.inputReader.currentCharacter !== '-') {
      lexer.addError(
        new LexerError({
          errorCategory: {
            type: 'UNEXPECTED_COMMENT_CHARACTER',
            ch: lexer.inputReader.currentCharacter!,
          },
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber,
        })
      );
      isValidCommentStart = false;
      return;
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
          errorCategory: {
            type: 'UNCLOSED_COMMENT_LITERAL',
          },
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
