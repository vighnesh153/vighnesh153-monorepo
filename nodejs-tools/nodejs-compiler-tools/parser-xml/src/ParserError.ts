import { cloneToken, Token } from '@vighnesh153/lexer-core';
import { XmlTokenType } from '@vighnesh153/lexer-xml';

export type ParserErrorType =
  | 'UNEXPECTED_TOKEN'
  | 'UNEXPECTED_PROLOG_TAG'
  | 'UNEXPECTED_CLOSING_TAG_LITERAL'
  | 'UNEXPECTED_EOF';

export type ParserErrorProps = {
  readonly errorType: ParserErrorType;
  readonly culpritToken: Token<XmlTokenType>;
};

export type SerializedParserError = {
  errorType: ParserErrorType;
  culpritToken: Token<XmlTokenType>;
};

export class ParserError {
  get errorType(): ParserErrorType {
    return this.props.errorType;
  }
  get culpritToken(): Token<XmlTokenType> {
    return cloneToken(this.props.culpritToken);
  }

  constructor(private readonly props: ParserErrorProps) {}

  copy(overrides: Partial<ParserErrorProps> = {}): ParserError {
    return new ParserError({ ...this.props, ...overrides });
  }

  serialized(): SerializedParserError {
    return {
      errorType: this.errorType,
      culpritToken: this.culpritToken,
    };
  }
}
