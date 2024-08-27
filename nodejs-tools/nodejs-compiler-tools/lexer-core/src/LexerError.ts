export type LexerErrorCategory =
  | {
      type: 'ILLEGAL_CHARACTER';
      ch: string;
    }
  | {
      type: 'UNEXPECTED_COMMENT_CHARACTER';
      ch: string;
    }
  | {
      type: 'INVALID_ESCAPE_CHARACTER_LITERAL';
      ch: string;
    }
  | {
      type: 'INVALID_UNICODE_CHARACTER_LITERAL';
      ch: string;
    }
  | {
      type: 'UNCLOSED_COMMENT_LITERAL';
    }
  | {
      type: 'UNCLOSED_ESCAPE_SEQUENCE';
    }
  | {
      type: 'UNCLOSED_STRING_LITERAL';
    };

export type LexerErrorProps = {
  readonly errorCategory: Readonly<LexerErrorCategory>;
  readonly lineNumber: number;
  readonly columnNumber: number;
};

export class LexerError {
  get errorCategory(): Readonly<LexerErrorCategory> {
    return this.props.errorCategory;
  }
  get lineNumber(): number {
    return this.props.lineNumber;
  }
  get columnNumber(): number {
    return this.props.columnNumber;
  }

  constructor(private readonly props: LexerErrorProps) {}

  copy(overrides: Partial<LexerErrorProps> = {}): LexerError {
    return new LexerError({ ...this.props, ...overrides });
  }
}
