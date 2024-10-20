import { skipWhitespace } from "./skipWhitespace.ts";
import {
  EOF_CHARACTER,
  Lexer,
  LexerError,
  Token,
} from "@vighnesh153/lexer-core";
import { readStringLiteral } from "./readStringLiteral.ts";
import {
  isAcceptableIdentifierStart,
  readIdentifier,
} from "./readIdentifier.ts";
import { readComment } from "./readComment.ts";
import { readTextNode } from "./readTextNode.ts";
import { XmlTokenType } from "./tokens.ts";

export function nextToken(lexer: Lexer<XmlTokenType>): Token<XmlTokenType> {
  let t: Token<XmlTokenType>;

  skipWhitespace(lexer);

  const currCh = lexer.inputReader.currentCharacter;
  switch (currCh) {
    case ":": {
      t = createToken(lexer, XmlTokenType.Colon);
      break;
    }
    case "=": {
      t = createToken(lexer, XmlTokenType.Equals);
      break;
    }
    case "<": {
      if (lexer.inputReader.peekCharacter() === "!") {
        const { lineNumber, columnNumber } = lexer.inputReader;
        const commentLiteral = readComment(lexer);
        if (commentLiteral !== null) {
          t = createToken(
            lexer,
            XmlTokenType.CommentLiteral,
            commentLiteral,
            lineNumber,
            columnNumber,
          );
        } else {
          t = createToken(
            lexer,
            XmlTokenType.Illegal,
            `${lexer.inputReader.currentCharacter}`,
          );
        }
      } else {
        t = createToken(lexer, XmlTokenType.LeftAngleBracket);
      }
      break;
    }
    case ">": {
      t = createToken(lexer, XmlTokenType.RightAngleBracket);
      break;
    }
    case "/": {
      t = createToken(lexer, XmlTokenType.ForwardSlash);
      break;
    }
    case "?": {
      t = createToken(lexer, XmlTokenType.QuestionMark);
      break;
    }
    case '"': {
      const { lineNumber, columnNumber } = lexer.inputReader;
      const s = readStringLiteral(lexer);
      t = createToken(
        lexer,
        XmlTokenType.StringLiteral,
        s,
        lineNumber,
        columnNumber,
      );
      break;
    }
    case EOF_CHARACTER: {
      t = createToken(lexer, XmlTokenType.Eof);
      break;
    }
    default: {
      if (
        lexer.currentToken == null ||
        lexer.currentToken.tokenType === XmlTokenType.RightAngleBracket
      ) {
        const { lineNumber, columnNumber } = lexer.inputReader;
        const textNode = readTextNode(lexer);
        t = createToken(
          lexer,
          XmlTokenType.TextNode,
          textNode,
          lineNumber,
          columnNumber,
        );
      } else if (isAcceptableIdentifierStart(currCh)) {
        const { lineNumber, columnNumber } = lexer.inputReader;
        const identifier = readIdentifier(lexer);
        t = createToken(
          lexer,
          XmlTokenType.Identifier,
          identifier,
          lineNumber,
          columnNumber,
        );
      } else {
        lexer.addError(
          new LexerError({
            errorCategory: {
              type: "ILLEGAL_CHARACTER",
              ch: currCh,
            },
            lineNumber: lexer.inputReader.lineNumber,
            columnNumber: lexer.inputReader.columnNumber,
          }),
        );
        t = createToken(lexer, XmlTokenType.Illegal, currCh);
      }
      break;
    }
  }

  lexer.inputReader.readNextCharacter();

  lexer.currentToken = t;
  return t;
}

function createToken(
  lexer: Lexer<XmlTokenType>,
  tokenType: XmlTokenType,
  tokenLiteral: string = tokenType.value,
  lineNumber: number = lexer.inputReader.lineNumber,
  columnNumber: number = lexer.inputReader.columnNumber,
): Token<XmlTokenType> {
  return {
    tokenType: tokenType,
    tokenLiteral: tokenLiteral,
    lineNumber,
    columnNumber,
  };
}
