import { LexerError } from './LexerError';
import { LexerInputReader } from './LexerInputReader';
import { Token } from './tokens';

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
