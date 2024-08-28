/**
 * @license
 * MIT LICENSE
 * Copyright (c) 2011 Devon Govett
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

declare class TokenType {
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
type LexerErrorProps = {
  readonly errorCategory: Readonly<LexerErrorCategory>;
  readonly lineNumber: number;
  readonly columnNumber: number;
};
declare class LexerError {
  private readonly props;
  get errorCategory(): Readonly<LexerErrorCategory>;
  get lineNumber(): number;
  get columnNumber(): number;
  constructor(props: LexerErrorProps);
  copy(overrides?: Partial<LexerErrorProps>): LexerError;
}

type ParserErrorType =
  | 'UNEXPECTED_TOKEN'
  | 'UNEXPECTED_PROLOG_TAG'
  | 'UNEXPECTED_CLOSING_TAG_LITERAL'
  | 'UNEXPECTED_EOF';
type ParserErrorProps = {
  readonly errorType: ParserErrorType;
  readonly culpritToken: Token;
};
declare class ParserError {
  private readonly props;
  get errorType(): ParserErrorType;
  get culpritToken(): Token;
  constructor(props: ParserErrorProps);
  copy(overrides?: Partial<ParserErrorProps>): ParserError;
}

type FormattingOptions = {
  indentation?: number;
  sortAttributes?: boolean;
};

type FormatResponse =
  | {
      type: 'lexer-error';
      lexerErrors: readonly LexerError[];
    }
  | {
      type: 'parser-error';
      parserErrors: readonly ParserError[];
    }
  | {
      type: 'unknown-error';
      err: unknown;
    }
  | {
      type: 'success';
      formattedXml: string;
    };
declare function format(rawXml: string, { indentation, sortAttributes }: FormattingOptions): FormatResponse;

export { type FormatResponse, format };
