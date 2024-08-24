/* eslint-disable @typescript-eslint/no-use-before-define */

import { Token } from '@vighnesh153/lexer-xml';

export interface XmlExpression {
  toString(indentation: number): string;
}

export class XmlElementProperty {
  constructor(
    public readonly colonSeparatedKeys: readonly Token[],
    public readonly value: Token
  ) {}

  toString(): string {
    return `${this.colonSeparatedKeys.map((key) => key.tokenLiteral).join(':')}="${this.value.tokenLiteral}"`;
  }
}

export class XmlProgram implements XmlExpression {
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
  #properties: XmlElementProperty[] = [];

  get properties(): readonly XmlElementProperty[] {
    return [...this.#properties];
  }

  addProperty(property: XmlElementProperty): void {
    this.#properties.push(property);
  }

  toString(indentation: number = 0): string {
    const stringBuilder: string[] = [];

    stringBuilder.push(`${buildIndentationSpace(indentation)}<?xml`);
    for (const property of this.properties) {
      stringBuilder.push(property.toString());
    }

    return stringBuilder.join(' ') + `?>`;
  }
}

// <manifest />
export class XmlTagNode implements XmlExpression {
  #tagIdentifier: Token;

  #properties: XmlElementProperty[] = [];
  #children: XmlExpression[] = [];

  get tagIdentifier(): Token {
    return this.#tagIdentifier;
  }

  get properties(): readonly XmlElementProperty[] {
    return [...this.#properties];
  }

  get children(): readonly XmlExpression[] {
    return [...this.#children];
  }

  constructor(tagIdentifier: Token) {
    this.#tagIdentifier = tagIdentifier;
  }

  addProperty(property: XmlElementProperty): void {
    this.#properties.push(property);
  }

  addChild(statement: XmlExpression): void {
    this.#children.push(statement);
  }

  toString(indentation: number = 0): string {
    const { tagIdentifier, properties, children } = this;

    const stringBuilder: string[] = [];

    stringBuilder.push(`${buildIndentationSpace(indentation)}<${tagIdentifier.tokenLiteral}`);
    if (properties.length === 1) {
      const serializedProps = properties.map((property) => property.toString()).join(' ');
      stringBuilder[stringBuilder.length - 1] += ' ' + serializedProps;
    } else if (properties.length > 1) {
      properties.forEach((property) => {
        stringBuilder.push(`${buildIndentationSpace(indentation + 1)}${property.toString()}`);
      });
    }

    if (children.length === 0) {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + ' />';
    } else {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + '>';
    }

    for (const child of children) {
      stringBuilder.push(child.toString(indentation + 1));
    }

    if (children.length > 0) {
      stringBuilder.push(`${buildIndentationSpace(indentation)}</${tagIdentifier.tokenLiteral}>`);
    }

    return stringBuilder.join('\n');
  }
}

export class XmlCommentNode implements XmlExpression {
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
