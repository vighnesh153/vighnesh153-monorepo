package dev.vighnesh153.xml.formatter.lexer

enum class TokenType(val value: String) {
    Illegal("Illegal"),
    Eof("eof"),

    Identifier("Identifier"),
    StringLiteral("StringLiteral"),
    CommentLiteral("CommentLiteral"),
    TextNode("TextNode"),

    Colon(":"),
    Equals("="),
    LeftAngleBracket("<"),
    RightAngleBracket(">"),
    ForwardSlash("/"),
    QuestionMark("?");
}