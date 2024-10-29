export class XmlTokenType {
  static Illegal: XmlTokenType = /* @__PURE__ */ new XmlTokenType("Illegal");
  static Eof: XmlTokenType = /* @__PURE__ */ new XmlTokenType("Eof");

  static Identifier: XmlTokenType = /* @__PURE__ */ new XmlTokenType(
    "Identifier",
  );
  static StringLiteral: XmlTokenType = /* @__PURE__ */ new XmlTokenType(
    "StringLiteral",
  );
  static CommentLiteral: XmlTokenType = /* @__PURE__ */ new XmlTokenType(
    "CommentLiteral",
  );
  static TextNode: XmlTokenType = /* @__PURE__ */ new XmlTokenType("TextNode");

  static Colon: XmlTokenType = /* @__PURE__ */ new XmlTokenType(":");
  static Equals: XmlTokenType = /* @__PURE__ */ new XmlTokenType("=");
  static LeftAngleBracket: XmlTokenType = /* @__PURE__ */ new XmlTokenType("<");
  static RightAngleBracket: XmlTokenType = /* @__PURE__ */ new XmlTokenType(
    ">",
  );
  static ForwardSlash: XmlTokenType = /* @__PURE__ */ new XmlTokenType("/");
  static QuestionMark: XmlTokenType = /* @__PURE__ */ new XmlTokenType("?");

  private constructor(public readonly value: string) {}
}
