import { LexerError, LexerInputReader } from '@vighnesh153/lexer-core';

export class XmlLexer {
  readonly #errors: Array<LexerError> = [];

  get errors(): Readonly<Array<LexerError>> {
    return this.#errors.map((error) => error.copy());
  }

  constructor(readonly inputReader: LexerInputReader) {}

  addError(error: LexerError): void {
    this.#errors.push(error);
  }
}
