/* eslint-disable @typescript-eslint/no-use-before-define */
import { Token, TokenType, TokenTypes } from './tokens';
import { XmlLexer } from './Lexer';
import { skipWhitespace } from './skipWhitespace';
import { EOF_CHARACTER } from '@vighnesh153/lexer-core';
import { readStringLiteral } from './readStringLiteral';
import { isAcceptableIdentifierStart, readIdentifier } from './readIdentifier';
import { readComment } from './readComment';

export function nextToken(lexer: XmlLexer): Token {
  let t: Token;

  skipWhitespace(lexer);

  const currCh = lexer.inputReader.currentCharacter;
  switch (currCh) {
    case ':': {
      t = createToken(lexer, TokenTypes.COLON);
      break;
    }
    case '=': {
      t = createToken(lexer, TokenTypes.EQUALS);
      break;
    }
    case '<': {
      if (lexer.inputReader.peekCharacter() === '!') {
        const { lineNumber, columnNumber } = lexer.inputReader;
        const commentLiteral = readComment(lexer);
        if (commentLiteral !== null) {
          t = createToken(lexer, TokenTypes.COMMENT, commentLiteral, lineNumber, columnNumber);
        } else {
          t = createToken(lexer, TokenTypes.ILLEGAL);
        }
      } else {
        t = createToken(lexer, TokenTypes.LEFT_ANGLE_BRACKET);
      }
      break;
    }
    case '>': {
      t = createToken(lexer, TokenTypes.RIGHT_ANGLE_BRACKET);
      break;
    }
    case '/': {
      t = createToken(lexer, TokenTypes.FORWARD_SLASH);
      break;
    }
    case '?': {
      t = createToken(lexer, TokenTypes.QUESTION_MARK);
      break;
    }
    case '"': {
      const { lineNumber, columnNumber } = lexer.inputReader;
      const s = readStringLiteral(lexer);
      t = createToken(lexer, TokenTypes.STRING_LITERAL, s, lineNumber, columnNumber);
      break;
    }
    case EOF_CHARACTER: {
      t = createToken(lexer, TokenTypes.EOF);
      break;
    }
    default: {
      if (isAcceptableIdentifierStart(currCh)) {
        const { lineNumber, columnNumber } = lexer.inputReader;
        const identifier = readIdentifier(lexer);
        t = createToken(lexer, TokenTypes.IDENTIFIER, identifier, lineNumber, columnNumber);
      } else {
        t = createToken(lexer, TokenTypes.ILLEGAL);
      }
      break;
    }
  }

  lexer.inputReader.readNextCharacter();

  return t;
}

function createToken(
  lexer: XmlLexer,
  tokenType: TokenType,
  tokenLiteral: string = tokenType.value,
  lineNumber: number = lexer.inputReader.lineNumber,
  columnNumber: number = lexer.inputReader.columnNumber
): Token {
  return {
    tokenType: tokenType,
    tokenLiteral: tokenLiteral,
    lineNumber,
    columnNumber,
  };
}
