/* eslint-disable @typescript-eslint/no-use-before-define */

import { Token } from '@vighnesh153/lexer-xml';

export type AstNodeType = 'XML_PROGRAM' | 'XML_PROLOG_NODE' | 'XML_TAG_NODE' | 'XML_COMMENT_NODE' | 'XML_TEXT_NODE';

export interface XmlExpression {
  readonly astNodeType: AstNodeType;

  toString(indentation: number): string;
}

export class XmlElementAttribute {
  constructor(
    public readonly namespaces: readonly Token[],
    public readonly value: Token
  ) {}

  toString(): string {
    return `${this.namespaces.map((namespace) => namespace.tokenLiteral).join(':')}="${this.value.tokenLiteral}"`;
  }
}

export class XmlProgram implements XmlExpression {
  readonly astNodeType: AstNodeType = 'XML_PROGRAM';

  #statements: XmlExpression[] = [];

  get statements(): readonly XmlExpression[] {
    return [...this.#statements];
  }

  addStatement(statement: XmlExpression): void {
    this.#statements.push(statement);
  }

  toString(indentation: number): string {
    return this.#statements.map((statement) => statement.toString(indentation)).join('\n');
  }
}

// <?xml version="1.0"?>
export class XmlPrologNode implements XmlExpression {
  readonly astNodeType: AstNodeType = 'XML_PROLOG_NODE';

  #attributes: XmlElementAttribute[] = [];

  get attributes(): readonly XmlElementAttribute[] {
    return [...this.#attributes];
  }

  addAttribute(attribute: XmlElementAttribute): void {
    this.#attributes.push(attribute);
  }

  toString(indentation: number = 0): string {
    const stringBuilder: string[] = [];

    stringBuilder.push(`${buildIndentationSpace(indentation)}<?xml`);
    for (const attribute of this.attributes) {
      stringBuilder.push(attribute.toString());
    }

    return stringBuilder.join(' ') + `?>`;
  }
}

// <manifest />
export class XmlTagNode implements XmlExpression {
  readonly astNodeType: AstNodeType = 'XML_TAG_NODE';

  #namespaces: Token[] = [];
  #attributes: XmlElementAttribute[] = [];
  #children: XmlExpression[] = [];

  get namespaces(): readonly Token[] {
    return [...this.#namespaces];
  }

  get attributes(): readonly XmlElementAttribute[] {
    return [...this.#attributes];
  }

  get children(): readonly XmlExpression[] {
    return [...this.#children];
  }

  addNamespace(ns: Token): void {
    this.#namespaces.push(ns);
  }

  addAttribute(attribute: XmlElementAttribute): void {
    this.#attributes.push(attribute);
  }

  addChild(statement: XmlExpression): void {
    this.#children.push(statement);
  }

  toString(indentation: number = 0): string {
    const { namespaces, attributes, children } = this;
    const tag = namespaces.map((ns) => ns.tokenLiteral).join(':');

    const stringBuilder: string[] = [];

    stringBuilder.push(`${buildIndentationSpace(indentation)}<${tag}`);
    if (attributes.length === 1) {
      const serializedAttrs = attributes.map((attribute) => attribute.toString()).join(' ');
      stringBuilder[stringBuilder.length - 1] += ' ' + serializedAttrs;
    } else if (attributes.length > 1) {
      attributes.forEach((attribute) => {
        stringBuilder.push(`${buildIndentationSpace(indentation + 1)}${attribute.toString()}`);
      });
    }

    if (children.length === 0) {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + ' />';
    } else {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + '>';
    }

    // if only a single text node child
    if (children.length === 1 && children[0].astNodeType === 'XML_TEXT_NODE') {
      return stringBuilder.join('\n') + children[0].toString(0) + `</${tag}>`;
    }

    for (const child of children) {
      stringBuilder.push(child.toString(indentation + 1));
    }

    if (children.length > 0) {
      stringBuilder.push(`${buildIndentationSpace(indentation)}</${tag}>`);
    }

    return stringBuilder.join('\n');
  }
}

export class XmlCommentNode implements XmlExpression {
  readonly astNodeType: AstNodeType = 'XML_COMMENT_NODE';

  constructor(public readonly comment: Readonly<Token>) {}

  toString(indentation: number): string {
    return `${buildIndentationSpace(indentation)}<!-- ${this.comment.tokenLiteral.trim()} -->`;
  }
}

function buildIndentationSpace(indentation: number): string {
  return Array.from({ length: indentation * 4 })
    .map(() => ' ')
    .join('');
}

export class XmlTextNode implements XmlExpression {
  readonly astNodeType: AstNodeType = 'XML_TEXT_NODE';

  constructor(public readonly text: Readonly<Token>) {}

  toString(indentation: number): string {
    return `${buildIndentationSpace(indentation)}${this.text.tokenLiteral.trim()}`;
  }
}
