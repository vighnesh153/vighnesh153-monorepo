export type Token<T> = {
  tokenType: T;
  tokenLiteral: string;
  lineNumber: number;
  columnNumber: number;
};

export function cloneToken<T>(token: Token<T>): Token<T> {
  return { ...token };
}
