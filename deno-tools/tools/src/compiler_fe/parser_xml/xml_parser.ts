import { not } from "@vighnesh153/tools";
import { assert } from "@std/assert";
import { nextToken, XmlTokenType } from "@/compiler_fe/lexer_xml/mod.ts";
import { ParserError } from "./parser_error.ts";
import {
  XmlCommentNode,
  XmlElementAttribute,
  type XmlExpression,
  XmlProgram,
  XmlPrologNode,
  XmlTagNode,
  XmlTextNode,
} from "./ast.ts";
import type { Lexer, Token } from "@/compiler_fe/lexer_core/mod.ts";

export class XmlParser {
  readonly #errors: Array<ParserError> = [];

  #currentToken!: Readonly<Token<XmlTokenType>>;
  #peekToken!: Readonly<Token<XmlTokenType>>;

  get errors(): Readonly<Array<ParserError>> {
    return this.#errors.map((error) => error.copy());
  }

  constructor(readonly lexer: Lexer<XmlTokenType>) {
    this.nextToken();
    this.nextToken();
  }

  parseProgram(): XmlProgram {
    const program = new XmlProgram();

    while (not(this.isCurrentToken(XmlTokenType.Eof))) {
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

  isCurrentToken(tokenType: XmlTokenType): boolean {
    return this.#currentToken.tokenType === tokenType;
  }

  isPeekToken(tokenType: XmlTokenType): boolean {
    return this.#peekToken.tokenType === tokenType;
  }

  expectPeek(tokenType: XmlTokenType): boolean {
    if (this.isPeekToken(tokenType)) {
      this.nextToken();
      return true;
    }
    this.addError(
      new ParserError({
        errorType: "UNEXPECTED_TOKEN",
        culpritToken: this.#peekToken,
      }),
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
    if (this.isCurrentToken(XmlTokenType.LeftAngleBracket)) {
      if (this.isPeekToken(XmlTokenType.QuestionMark)) {
        return this.parseXmlPrologNode();
      }
      if (this.isPeekToken(XmlTokenType.Identifier)) {
        return this.parseXmlTagNode();
      }
      this.addError(
        new ParserError({
          errorType: "UNEXPECTED_TOKEN",
          culpritToken: this.#peekToken,
        }),
      );
      return null;
    }
    if (this.isCurrentToken(XmlTokenType.CommentLiteral)) {
      return this.parseXmlCommentNode();
    }
    if (this.isCurrentToken(XmlTokenType.TextNode)) {
      return this.parseXmlTextNode();
    }
    this.addError(
      new ParserError({
        errorType: "UNEXPECTED_TOKEN",
        culpritToken: this.#currentToken,
      }),
    );
    return null;
  }

  private parseXmlPrologNode(): XmlPrologNode | null {
    assert(
      this.isCurrentToken(XmlTokenType.LeftAngleBracket),
      `Shouldn't call parseXmlPrologNode when current token is not '<'`,
    );

    // move past "<"
    this.nextToken();

    assert(
      this.isCurrentToken(XmlTokenType.QuestionMark),
      `Shouldn't call parseXmlPrologNode when expression doesn't start with '<?'`,
    );

    if (not(this.expectPeek(XmlTokenType.Identifier))) {
      return null;
    }

    if (this.#currentToken.tokenLiteral !== "xml") {
      this.addError(
        new ParserError({
          errorType: "UNEXPECTED_PROLOG_TAG",
          culpritToken: this.#currentToken,
        }),
      );
      return null;
    }

    this.nextToken();

    const xmlPrologNode = new XmlPrologNode();

    while (true) {
      if (this.isCurrentToken(XmlTokenType.Eof)) {
        this.addError(
          new ParserError({
            culpritToken: this.#currentToken,
            errorType: "UNEXPECTED_EOF",
          }),
        );
        return null;
      }

      if (this.isCurrentToken(XmlTokenType.QuestionMark)) {
        if (not(this.expectPeek(XmlTokenType.RightAngleBracket))) {
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
      this.isCurrentToken(XmlTokenType.LeftAngleBracket),
      `Shouldn't call parseXmlTagNode when current token is not '<'`,
    );

    this.nextToken();

    assert(
      this.isCurrentToken(XmlTokenType.Identifier),
      `Shouldn't call parseXmlTagNode when statement doesn't start with "<IDENTIFIER"`,
    );

    const xmlTagNode = new XmlTagNode();
    xmlTagNode.addNamespace(this.#currentToken);
    this.nextToken();

    while (this.isCurrentToken(XmlTokenType.Colon)) {
      if (!this.expectPeek(XmlTokenType.Identifier)) {
        return null;
      }
      xmlTagNode.addNamespace(this.#currentToken);
      this.nextToken();
    }

    while (true) {
      if (this.isCurrentToken(XmlTokenType.Eof)) {
        this.addError(
          new ParserError({
            culpritToken: this.#currentToken,
            errorType: "UNEXPECTED_EOF",
          }),
        );
        return null;
      }

      if (this.isCurrentToken(XmlTokenType.ForwardSlash)) {
        break;
      }

      if (this.isCurrentToken(XmlTokenType.RightAngleBracket)) {
        break;
      }

      const attribute = this.parseAttribute();
      if (attribute === null) {
        return null;
      }
      xmlTagNode.addAttribute(attribute);
      this.nextToken();
    }

    if (this.isCurrentToken(XmlTokenType.ForwardSlash)) {
      if (not(this.expectPeek(XmlTokenType.RightAngleBracket))) {
        return null;
      }
      return xmlTagNode;
    }

    assert(
      this.isCurrentToken(XmlTokenType.RightAngleBracket),
      `Expected ">" found ${this.#currentToken.tokenLiteral}`,
    );

    // move past ">"
    this.nextToken();

    // parse children
    while (true) {
      if (this.isPeekToken(XmlTokenType.Eof)) {
        this.addError(
          new ParserError({
            culpritToken: this.#peekToken,
            errorType: "UNEXPECTED_EOF",
          }),
        );
        return null;
      }

      if (
        this.isCurrentToken(XmlTokenType.LeftAngleBracket) &&
        this.isPeekToken(XmlTokenType.ForwardSlash)
      ) {
        break;
      }

      const statement = this.parseStatement();
      if (statement === null) {
        return null;
      }
      xmlTagNode.addChild(statement);
      this.nextToken();
    }

    assert(
      this.isCurrentToken(XmlTokenType.LeftAngleBracket),
      `Expected "<" found ${this.#currentToken.tokenLiteral}`,
    );

    // Move past "<"
    this.nextToken();

    if (not(this.expectPeek(XmlTokenType.Identifier))) {
      return null;
    }

    const closingTagNamespaces = [this.#currentToken];
    this.nextToken();

    while (this.isCurrentToken(XmlTokenType.Colon)) {
      if (!this.expectPeek(XmlTokenType.Identifier)) {
        return null;
      }
      closingTagNamespaces.push(this.#currentToken);
      this.nextToken();
    }

    const openingTagName = xmlTagNode.namespaces.map((part) =>
      part.tokenLiteral
    ).join(":");
    const closingTagName = closingTagNamespaces.map((ns) => ns.tokenLiteral)
      .join(":");
    if (openingTagName !== closingTagName) {
      this.addError(
        new ParserError({
          culpritToken: {
            ...closingTagNamespaces[0],
            tokenLiteral: closingTagName,
          },
          errorType: "UNEXPECTED_CLOSING_TAG_LITERAL",
        }),
      );
      return null;
    }

    if (not(this.isCurrentToken(XmlTokenType.RightAngleBracket))) {
      this.addError(
        new ParserError({
          culpritToken: this.#currentToken,
          errorType: "UNEXPECTED_TOKEN",
        }),
      );
      return null;
    }

    return xmlTagNode;
  }

  private parseAttribute(): XmlElementAttribute | null {
    if (not(this.isCurrentToken(XmlTokenType.Identifier))) {
      this.addError(
        new ParserError({
          culpritToken: this.#currentToken,
          errorType: "UNEXPECTED_TOKEN",
        }),
      );
      return null;
    }

    const namespaces: Readonly<Token<XmlTokenType>>[] = [this.#currentToken];

    while (true) {
      if (this.isPeekToken(XmlTokenType.Eof)) {
        this.addError(
          new ParserError({
            culpritToken: this.#peekToken,
            errorType: "UNEXPECTED_EOF",
          }),
        );
        return null;
      }
      if (this.isPeekToken(XmlTokenType.Equals)) {
        break;
      }

      if (not(this.expectPeek(XmlTokenType.Colon))) {
        return null;
      }
      if (not(this.expectPeek(XmlTokenType.Identifier))) {
        return null;
      }
      namespaces.push(this.#currentToken);
    }

    assert(
      this.isPeekToken(XmlTokenType.Equals),
      `Expected "=" found ${this.#peekToken.tokenLiteral}`,
    );

    // we know next token is equals. move to that.
    this.nextToken();

    if (not(this.expectPeek(XmlTokenType.StringLiteral))) {
      return null;
    }

    return new XmlElementAttribute(namespaces, this.#currentToken);
  }

  private parseXmlCommentNode(): XmlCommentNode {
    assert(
      this.isCurrentToken(XmlTokenType.CommentLiteral),
      `Shouldn't call parseXmlCommentNode when current token is not a comment token`,
    );

    return new XmlCommentNode(this.#currentToken);
  }

  private parseXmlTextNode(): XmlTextNode {
    assert(
      this.isCurrentToken(XmlTokenType.TextNode),
      `Shouldn't call parseXmlTextNode when current token is not a text token`,
    );

    return new XmlTextNode(this.#currentToken);
  }
}
