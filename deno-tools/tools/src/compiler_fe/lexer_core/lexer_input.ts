import { EOF_CHARACTER } from "./utils.ts";

export interface LexerInput {
  getSize(): number;
  getCharacterAt(position: number): string | EOF_CHARACTER;
}

export class StringLexerInput implements LexerInput {
  constructor(private readonly input: string) {}

  getSize(): number {
    return this.input.length;
  }

  getCharacterAt(position: number): string | EOF_CHARACTER {
    if (position < 0 || position >= this.getSize()) {
      return EOF_CHARACTER;
    }
    return this.input[position];
  }
}
