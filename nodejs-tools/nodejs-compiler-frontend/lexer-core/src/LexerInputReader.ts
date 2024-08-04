import { LexerInput } from './LexerInput';
import { EOF_CHARACTER } from './utils';

export class LexerInputReader {
  #currentIndex = -1;
  #peekIndex = 0;
  #currentCharacter: string | EOF_CHARACTER = EOF_CHARACTER;

  get currentCharacter(): string | EOF_CHARACTER {
    return this.#currentCharacter;
  }

  get currentIndex(): number {
    return Math.min(this.#currentIndex, this.lexerInput.getSize());
  }

  get peekCharacter(): string | EOF_CHARACTER {
    if (this.#peekIndex >= this.lexerInput.getSize()) {
      return EOF_CHARACTER;
    }
    return this.lexerInput.getCharacterAt(this.#peekIndex);
  }

  constructor(private readonly lexerInput: LexerInput) {
    // Initialize the first character
    this.readNextCharacter();
  }

  readNextCharacter(): void {
    if (this.#peekIndex >= this.lexerInput.getSize()) {
      this.#currentCharacter = EOF_CHARACTER;
    } else {
      this.#currentCharacter = this.lexerInput.getCharacterAt(this.#peekIndex);
    }
    this.#currentIndex = this.#peekIndex;
    this.#peekIndex = Math.min(1 + this.#peekIndex, this.lexerInput.getSize());
  }
}
