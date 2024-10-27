export class XmlTokenType {
  static Illegal = new XmlTokenType("Illegal");
  static Eof = new XmlTokenType("Eof");

  static Identifier = new XmlTokenType("Identifier");
  static StringLiteral = new XmlTokenType("StringLiteral");
  static CommentLiteral = new XmlTokenType("CommentLiteral");
  static TextNode = new XmlTokenType("TextNode");

  static Colon = new XmlTokenType(":");
  static Equals = new XmlTokenType("=");
  static LeftAngleBracket = new XmlTokenType("<");
  static RightAngleBracket = new XmlTokenType(">");
  static ForwardSlash = new XmlTokenType("/");
  static QuestionMark = new XmlTokenType("?");

  private constructor(public readonly value: string) {}
}
