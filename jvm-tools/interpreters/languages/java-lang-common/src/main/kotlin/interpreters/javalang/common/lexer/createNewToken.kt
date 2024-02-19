package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType

fun Lexer.createNewToken(tokenType: TokenType, tokenLiteral: String): Token {
    val lineNumber = tokenStartLineNumber
    val columnNumber = tokenStartColumnNumber
    if (lineNumber == null || columnNumber == null) {
        throw Error("lineNumber and columnNumber are not initialized!!")
    }
    return Token(
        tokenType = tokenType,
        tokenLiteral = tokenLiteral,
        lineNumber = lineNumber,
        columnNumber = columnNumber,
    )
}
