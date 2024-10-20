import { LexerError } from './LexerError.ts';
import { LexerInputReader } from './LexerInputReader.ts';
import { Token } from './tokens.ts';

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
