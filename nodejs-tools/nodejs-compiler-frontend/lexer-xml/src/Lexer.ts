import { LexerError, LexerInputReader } from '@vighnesh153/lexer-core';

export class XmlLexer {
  readonly #errors: Array<LexerError> = [];

  get errors(): Array<LexerError> {
    return this.#errors.map((error) => error.copy());
  }

  constructor(readonly inputReader: LexerInputReader) {}

  addError(error: LexerError): void {
    this.#errors.push(error);
  }
}
