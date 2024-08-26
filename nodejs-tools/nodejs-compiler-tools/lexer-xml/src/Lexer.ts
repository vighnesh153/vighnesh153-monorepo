import { LexerError, LexerInputReader } from '@vighnesh153/lexer-core';
import { Token } from './tokens';

export class XmlLexer {
  readonly #errors: Array<LexerError> = [];

  currentToken: Token | null = null;

  get errors(): Readonly<Array<LexerError>> {
    return this.#errors.map((error) => error.copy());
  }

  constructor(readonly inputReader: LexerInputReader) {}

  addError(error: LexerError): void {
    this.#errors.push(error);
  }
}
