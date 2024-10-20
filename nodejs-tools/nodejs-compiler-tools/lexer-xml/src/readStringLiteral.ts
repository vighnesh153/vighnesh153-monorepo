import { assert } from "@std/assert";
import { EOF_CHARACTER, Lexer, LexerError } from "@vighnesh153/lexer-core";
import { readEscapeSequence } from "./readEscapeSequence.ts";
import { XmlTokenType } from "./tokens.ts";

const DOUBLE_QUOTE = '"';

export function readStringLiteral(lexer: Lexer<XmlTokenType>): string {
  assert(
    lexer.inputReader.currentCharacter === DOUBLE_QUOTE,
    `You should not attempt to read a string literal if it doesn't start with '"'`,
  );

  // move over the first double quote
  lexer.inputReader.readNextCharacter();

  const stringLiteralBuilder: string[] = [];

  let currCh = lexer.inputReader.currentCharacter;
  while (currCh !== DOUBLE_QUOTE && currCh !== EOF_CHARACTER) {
    if (currCh === "\\") {
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
        errorCategory: {
          type: "UNCLOSED_STRING_LITERAL",
        },
        lineNumber: lexer.inputReader.lineNumber,
        columnNumber: lexer.inputReader.columnNumber,
      }),
    );
  }

  return stringLiteralBuilder.join("");
}
