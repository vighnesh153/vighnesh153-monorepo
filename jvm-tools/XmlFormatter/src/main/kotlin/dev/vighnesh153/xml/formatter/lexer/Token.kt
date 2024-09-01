package dev.vighnesh153.xml.formatter.lexer

data class Token(
    val tokenType: TokenType,
    val tokenLiteral: String,
    val lineNumber: Int,
    val columnNumber: Int,
)
