export type SerializedTokenType = {
  value: string;
};

export class TokenType {
  constructor(public readonly value: string) {}

  serialized(): SerializedTokenType {
    return {
      value: this.value,
    };
  }
}

export const TokenTypes = {
  ILLEGAL: new TokenType('ILLEGAL'),
  EOF: new TokenType('EOF'),

  IDENTIFIER: new TokenType('IDENTIFIER'),
  STRING_LITERAL: new TokenType('STRING_LITERAL'),
  COMMENT: new TokenType('COMMENT'),
  TEXT_NODE: new TokenType('TEXT_NODE'),

  COLON: new TokenType(':'),
  EQUALS: new TokenType('='),
  LEFT_ANGLE_BRACKET: new TokenType('<'),
  RIGHT_ANGLE_BRACKET: new TokenType('>'),
  FORWARD_SLASH: new TokenType('/'),
  QUESTION_MARK: new TokenType('?'),
} as const satisfies Record<string, TokenType>;

export type Token = {
  tokenType: TokenType;
  tokenLiteral: string;
  lineNumber: number;
  columnNumber: number;
};

export type SerializedToken = {
  tokenType: SerializedTokenType;
  tokenLiteral: string;
  lineNumber: number;
  columnNumber: number;
};

export function cloneToken(token: Token): Token {
  return { ...token };
}

export function serializeToken(token: Token): SerializedToken {
  return { ...token, tokenType: token.tokenType.serialized() };
}
