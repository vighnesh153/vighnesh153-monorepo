import { not, assert } from '@vighnesh153/tools-platform-independent';
import { nextToken, Token, XmlLexer, TokenType, TokenTypes } from '@vighnesh153/lexer-xml';
import { ParserError } from './ParserError';
import {
  XmlCommentNode,
  XmlElementAttribute,
  XmlExpression,
  XmlProgram,
  XmlPrologNode,
  XmlTagNode,
  XmlTextNode,
} from './ast';

export class XmlParser {
  readonly #errors: Array<ParserError> = [];

  #currentToken!: Readonly<Token>;
  #peekToken!: Readonly<Token>;

  get errors(): Readonly<Array<ParserError>> {
    return this.#errors.map((error) => error.copy());
  }

  constructor(readonly lexer: XmlLexer) {
    this.nextToken();
    this.nextToken();
  }

  parseProgram(): XmlProgram {
    const program = new XmlProgram();

    while (not(this.isCurrentToken(TokenTypes.EOF))) {
      const statement = this.parseStatement();
      if (statement === null) {
        break;
      }
      program.addStatement(statement);
      this.nextToken();
    }

    return program;
  }

  addError(error: ParserError): void {
    this.#errors.push(error);
  }

  isCurrentToken(tokenType: TokenType): boolean {
    return this.#currentToken.tokenType === tokenType;
  }

  isPeekToken(tokenType: TokenType): boolean {
    return this.#peekToken.tokenType === tokenType;
  }

  expectPeek(tokenType: TokenType): boolean {
    if (this.isPeekToken(tokenType)) {
      this.nextToken();
      return true;
    }
    this.addError(
      new ParserError({
        errorType: 'UNEXPECTED_TOKEN',
        culpritToken: this.#peekToken,
      })
    );
    return false;
  }

  private nextToken() {
    if (this.#peekToken) {
      this.#currentToken = this.#peekToken;
    }
    this.#peekToken = nextToken(this.lexer);
  }

  private parseStatement(): XmlExpression | null {
    if (this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET)) {
      if (this.isPeekToken(TokenTypes.QUESTION_MARK)) {
        return this.parseXmlPrologNode();
      }
      if (this.isPeekToken(TokenTypes.IDENTIFIER)) {
        return this.parseXmlTagNode();
      }
      this.addError(
        new ParserError({
          errorType: 'UNEXPECTED_TOKEN',
          culpritToken: this.#peekToken,
        })
      );
      return null;
    }
    if (this.isCurrentToken(TokenTypes.COMMENT)) {
      return this.parseXmlCommentNode();
    }
    if (this.isCurrentToken(TokenTypes.TEXT_NODE)) {
      return this.parseXmlTextNode();
    }
    this.addError(
      new ParserError({
        errorType: 'UNEXPECTED_TOKEN',
        culpritToken: this.#currentToken,
      })
    );
    return null;
  }

  private parseXmlPrologNode(): XmlPrologNode | null {
    assert(
      this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET),
      `Shouldn't call parseXmlPrologNode when current token is not '<'`
    );

    // move past "<"
    this.nextToken();

    assert(
      this.isCurrentToken(TokenTypes.QUESTION_MARK),
      `Shouldn't call parseXmlPrologNode when expression doesn't start with '<?'`
    );

    if (not(this.expectPeek(TokenTypes.IDENTIFIER))) {
      return null;
    }

    if (this.#currentToken.tokenLiteral !== 'xml') {
      this.addError(
        new ParserError({
          errorType: 'UNEXPECTED_PROLOG_TAG',
          culpritToken: this.#currentToken,
        })
      );
      return null;
    }

    this.nextToken();

    const xmlPrologNode = new XmlPrologNode();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.isCurrentToken(TokenTypes.EOF)) {
        this.addError(
          new ParserError({
            culpritToken: this.#currentToken,
            errorType: 'UNEXPECTED_EOF',
          })
        );
        return null;
      }

      if (this.isCurrentToken(TokenTypes.QUESTION_MARK)) {
        if (not(this.expectPeek(TokenTypes.RIGHT_ANGLE_BRACKET))) {
          return null;
        }
        return xmlPrologNode;
      }

      const attribute = this.parseAttribute();
      if (attribute === null) {
        return null;
      }
      xmlPrologNode.addAttribute(attribute);
      this.nextToken();
    }
  }

  private parseXmlTagNode(): XmlTagNode | null {
    assert(
      this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET),
      `Shouldn't call parseXmlTagNode when current token is not '<'`
    );

    this.nextToken();

    assert(
      this.isCurrentToken(TokenTypes.IDENTIFIER),
      `Shouldn't call parseXmlTagNode when statement doesn't start with "<IDENTIFIER"`
    );

    const xmlTagNode = new XmlTagNode();
    xmlTagNode.addNamespace(this.#currentToken);
    this.nextToken();

    while (this.isCurrentToken(TokenTypes.COLON)) {
      if (!this.expectPeek(TokenTypes.IDENTIFIER)) {
        return null;
      }
      xmlTagNode.addNamespace(this.#currentToken);
      this.nextToken();
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.isCurrentToken(TokenTypes.EOF)) {
        this.addError(
          new ParserError({
            culpritToken: this.#currentToken,
            errorType: 'UNEXPECTED_EOF',
          })
        );
        return null;
      }

      if (this.isCurrentToken(TokenTypes.FORWARD_SLASH)) {
        break;
      }

      if (this.isCurrentToken(TokenTypes.RIGHT_ANGLE_BRACKET)) {
        break;
      }

      const attribute = this.parseAttribute();
      if (attribute === null) {
        return null;
      }
      xmlTagNode.addAttribute(attribute);
      this.nextToken();
    }

    if (this.isCurrentToken(TokenTypes.FORWARD_SLASH)) {
      if (not(this.expectPeek(TokenTypes.RIGHT_ANGLE_BRACKET))) {
        return null;
      }
      return xmlTagNode;
    }

    assert(
      this.isCurrentToken(TokenTypes.RIGHT_ANGLE_BRACKET),
      `Expected ">" found ${this.#currentToken.tokenLiteral}`
    );

    // move past ">"
    this.nextToken();

    // parse children
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.isPeekToken(TokenTypes.EOF)) {
        this.addError(
          new ParserError({
            culpritToken: this.#peekToken,
            errorType: 'UNEXPECTED_EOF',
          })
        );
        return null;
      }

      if (this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET) && this.isPeekToken(TokenTypes.FORWARD_SLASH)) {
        break;
      }

      const statement = this.parseStatement();
      if (statement === null) {
        return null;
      }
      xmlTagNode.addChild(statement);
      this.nextToken();
    }

    assert(this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET), `Expected "<" found ${this.#currentToken.tokenLiteral}`);

    // Move past "<"
    this.nextToken();

    if (not(this.expectPeek(TokenTypes.IDENTIFIER))) {
      return null;
    }

    const closingTagNamespaces = [this.#currentToken];
    this.nextToken();

    while (this.isCurrentToken(TokenTypes.COLON)) {
      if (!this.expectPeek(TokenTypes.IDENTIFIER)) {
        return null;
      }
      closingTagNamespaces.push(this.#currentToken);
      this.nextToken();
    }

    const openingTagName = xmlTagNode.namespaces.map((part) => part.tokenLiteral).join(':');
    const closingTagName = closingTagNamespaces.map((ns) => ns.tokenLiteral).join(':');
    if (openingTagName !== closingTagName) {
      this.addError(
        new ParserError({
          culpritToken: {
            ...closingTagNamespaces[0],
            tokenLiteral: closingTagName,
          },
          errorType: 'UNEXPECTED_CLOSING_TAG_LITERAL',
        })
      );
      return null;
    }

    if (not(this.isCurrentToken(TokenTypes.RIGHT_ANGLE_BRACKET))) {
      this.addError(
        new ParserError({
          culpritToken: this.#currentToken,
          errorType: 'UNEXPECTED_TOKEN',
        })
      );
      return null;
    }

    return xmlTagNode;
  }

  private parseAttribute(): XmlElementAttribute | null {
    if (not(this.isCurrentToken(TokenTypes.IDENTIFIER))) {
      this.addError(
        new ParserError({
          culpritToken: this.#currentToken,
          errorType: 'UNEXPECTED_TOKEN',
        })
      );
      return null;
    }

    const namespaces: Readonly<Token>[] = [this.#currentToken];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.isPeekToken(TokenTypes.EOF)) {
        this.addError(
          new ParserError({
            culpritToken: this.#peekToken,
            errorType: 'UNEXPECTED_EOF',
          })
        );
        return null;
      }
      if (this.isPeekToken(TokenTypes.EQUALS)) {
        break;
      }

      if (not(this.expectPeek(TokenTypes.COLON))) {
        return null;
      }
      if (not(this.expectPeek(TokenTypes.IDENTIFIER))) {
        return null;
      }
      namespaces.push(this.#currentToken);
    }

    assert(this.isPeekToken(TokenTypes.EQUALS), `Expected "=" found ${this.#peekToken.tokenLiteral}`);

    // we know next token is equals. move to that.
    this.nextToken();

    if (not(this.expectPeek(TokenTypes.STRING_LITERAL))) {
      return null;
    }

    return new XmlElementAttribute(namespaces, this.#currentToken);
  }

  private parseXmlCommentNode(): XmlCommentNode {
    assert(
      this.isCurrentToken(TokenTypes.COMMENT),
      `Shouldn't call parseXmlCommentNode when current token is not a comment token`
    );

    return new XmlCommentNode(this.#currentToken);
  }

  private parseXmlTextNode(): XmlTextNode {
    assert(
      this.isCurrentToken(TokenTypes.TEXT_NODE),
      `Shouldn't call parseXmlTextNode when current token is not a text token`
    );

    return new XmlTextNode(this.#currentToken);
  }
}
