import type { LexerError } from "./lexer_error.ts";
import type { LexerInputReader } from "./lexer_input_reader.ts";
import type { Token } from "./tokens.ts";

export class Lexer<TokenType> {
  readonly #errors: Array<LexerError> = [];

  currentToken: Token<TokenType> | null = null;

  get errors(): Readonly<Array<LexerError>> {
    return this.#errors.map((error) => error.copy());
  }

  constructor(readonly inputReader: LexerInputReader) {}

  addError(error: LexerError): void {
    this.#errors.push(error);
  }
}
