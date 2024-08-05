/* eslint-disable @typescript-eslint/no-use-before-define */
import { EOF_CHARACTER, LexerError } from '@vighnesh153/lexer-core';
import { XmlLexer } from './Lexer';
import { HEXADECIMAL_DIGITS } from '@vighnesh153/utils';

export function readEscapeSequence(lexer: XmlLexer): string {
  if (lexer.inputReader.currentCharacter != '\\') {
    throw new Error(`You should not attempt to read an escaped sequence if it doesn't start with '\\'`);
  }

  // move over the backslash
  lexer.inputReader.readNextCharacter();

  const currCh: string = lexer.inputReader.currentCharacter;
  switch (currCh) {
    case 'u':
      return parseUnicode(lexer);
    case 't':
      return `\t`;
    case 'n':
      return `\n`;
    case '\\':
      return `\\`;
    case '"':
      return `"`;
    case EOF_CHARACTER: {
      lexer.addError(
        new LexerError({
          errorMessage: 'Unclosed escape sequence',
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber,
        })
      );
      return `\n`;
    }
    default: {
      lexer.addError(
        new LexerError({
          errorMessage: `Invalid escape character literal: ${lexer.inputReader.currentCharacter}`,
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber,
        })
      );
      return `\n`;
    }
  }
}

function parseUnicode(lexer: XmlLexer): string {
  if (lexer.inputReader.currentCharacter != 'u') {
    throw new Error(`You should not try to parse a unicode sequence that doesn't begin with 'u'`);
  }

  const unicodeCharacters: string[] = [];

  // unicode: \u0000 to \uFFFF
  for (let i = 0; i <= 4; i++) {
    const peek = lexer.inputReader.peekCharacter()?.toLowerCase() ?? '';
    if (HEXADECIMAL_DIGITS.includes(peek.toLowerCase())) {
      lexer.inputReader.readNextCharacter();
      unicodeCharacters.push(lexer.inputReader.currentCharacter);
    } else {
      lexer.addError(
        new LexerError({
          errorMessage: `Invalid unicode character: ${lexer.inputReader.currentCharacter}`,
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber,
        })
      );
      return ' ';
    }
  }

  return String.fromCharCode(parseInt(unicodeCharacters.join(''), 16));
}
