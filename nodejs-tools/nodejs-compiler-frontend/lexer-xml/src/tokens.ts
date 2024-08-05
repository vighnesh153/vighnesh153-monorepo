export class TokenType {
  constructor(public readonly value: string) {}
}

export const TokenTypes = {
  ILLEGAL: new TokenType('ILLEGAL'),
  EOF: new TokenType('EOF'),

  IDENTIFIER: new TokenType('IDENTIFIER'),
  STRING_LITERAL: new TokenType('STRING_LITERAL'),
  COMMENT: new TokenType('COMMENT'),

  COLON: new TokenType(':'),
  EQUALS: new TokenType('='),
  LEFT_ANGLE_BRACKET: new TokenType('<'),
  RIGHT_ANGLE_BRACKET: new TokenType('>'),
  FORWARD_SLASH: new TokenType('/'),
  QUESTION_MARK: new TokenType('?'),
} satisfies Record<string, TokenType>;

export type Token = {
  tokenType: TokenType;
  tokenLiteral: string;
  lineNumber: number;
  columnNumber: number;
};
