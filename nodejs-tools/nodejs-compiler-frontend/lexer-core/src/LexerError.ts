export type LexerErrorProps = {
  readonly errorMessage: string;
  readonly lineNumber: number;
  readonly columnNumber: number;
};

export class LexerError {
  get errorMessage(): string {
    return this.props.errorMessage;
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
