declare module "pika_xml_formatter" {
  class TokenType {
    readonly value: string;
    constructor(value: string);
  }

  type Token = {
    tokenType: TokenType;
    tokenLiteral: string;
    lineNumber: number;
    columnNumber: number;
  };

  type LexerErrorCategory =
    | {
      type: "ILLEGAL_CHARACTER";
      ch: string;
    }
    | {
      type: "UNEXPECTED_COMMENT_CHARACTER";
      ch: string;
    }
    | {
      type: "INVALID_ESCAPE_CHARACTER_LITERAL";
      ch: string;
    }
    | {
      type: "INVALID_UNICODE_CHARACTER_LITERAL";
      ch: string;
    }
    | {
      type: "UNCLOSED_COMMENT_LITERAL";
    }
    | {
      type: "UNCLOSED_ESCAPE_SEQUENCE";
    }
    | {
      type: "UNCLOSED_STRING_LITERAL";
    };
  type LexerErrorProps = {
    readonly errorCategory: Readonly<LexerErrorCategory>;
    readonly lineNumber: number;
    readonly columnNumber: number;
  };
  class LexerError {
    private readonly props;
    get errorCategory(): Readonly<LexerErrorCategory>;
    get lineNumber(): number;
    get columnNumber(): number;
    constructor(props: LexerErrorProps);
    copy(overrides?: Partial<LexerErrorProps>): LexerError;
  }

  type ParserErrorType =
    | "UNEXPECTED_TOKEN"
    | "UNEXPECTED_PROLOG_TAG"
    | "UNEXPECTED_CLOSING_TAG_LITERAL"
    | "UNEXPECTED_EOF";
  type ParserErrorProps = {
    readonly errorType: ParserErrorType;
    readonly culpritToken: Token;
  };
  class ParserError {
    private readonly props;
    get errorType(): ParserErrorType;
    get culpritToken(): Token;
    constructor(props: ParserErrorProps);
    copy(overrides?: Partial<ParserErrorProps>): ParserError;
  }

  type FormattingOptions = { indentation?: number; sortAttributes?: boolean };

  type FormatResponse =
    | {
      type: "lexer-error";
      lexerErrors: readonly LexerError[];
    }
    | {
      type: "parser-error";
      parserErrors: readonly ParserError[];
    }
    | {
      type: "unknown-error";
      err: unknown;
    }
    | {
      type: "success";
      formattedXml: string;
    };
  function format(
    rawXml: string,
    { indentation, sortAttributes }: FormattingOptions,
  ): FormatResponse;

  export { format, type FormatResponse };
}
