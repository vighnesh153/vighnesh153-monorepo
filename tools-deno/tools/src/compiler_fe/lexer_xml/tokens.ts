export class XmlTokenType {
  static Illegal: XmlTokenType = new XmlTokenType("Illegal");
  static Eof: XmlTokenType = new XmlTokenType("Eof");

  static Identifier: XmlTokenType = new XmlTokenType("Identifier");
  static StringLiteral: XmlTokenType = new XmlTokenType("StringLiteral");
  static CommentLiteral: XmlTokenType = new XmlTokenType("CommentLiteral");
  static TextNode: XmlTokenType = new XmlTokenType("TextNode");

  static Colon: XmlTokenType = new XmlTokenType(":");
  static Equals: XmlTokenType = new XmlTokenType("=");
  static LeftAngleBracket: XmlTokenType = new XmlTokenType("<");
  static RightAngleBracket: XmlTokenType = new XmlTokenType(">");
  static ForwardSlash: XmlTokenType = new XmlTokenType("/");
  static QuestionMark: XmlTokenType = new XmlTokenType("?");

  private constructor(public readonly value: string) {}
}
