import { LexerInput } from './LexerInput';
import { EOF_CHARACTER } from './utils';

export class LexerInputReader {
  #currentIndex = -1;
  #peekIndex = 0;
  #previousCharacter: string | EOF_CHARACTER = EOF_CHARACTER;
  #currentCharacter: string | EOF_CHARACTER = EOF_CHARACTER;

  #lineNumber = 1;
  #columnNumber = 0;

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

  get lineNumber(): number {
    return this.#lineNumber;
  }

  get columnNumber(): number {
    return this.#columnNumber;
  }

  constructor(private readonly lexerInput: LexerInput) {
    // Initialize the first character
    this.readNextCharacter();
  }

  readNextCharacter(): void {
    this.#previousCharacter = this.#currentCharacter;
    if (this.#peekIndex >= this.lexerInput.getSize()) {
      this.#currentCharacter = EOF_CHARACTER;
    } else {
      this.#currentCharacter = this.lexerInput.getCharacterAt(this.#peekIndex);
      this.#columnNumber++;
    }
    if (this.#previousCharacter === '\n') {
      this.#lineNumber++;
      this.#columnNumber = 1;
    }
    this.#currentIndex = this.#peekIndex;
    this.#peekIndex = Math.min(1 + this.#peekIndex, this.lexerInput.getSize());
  }
}
