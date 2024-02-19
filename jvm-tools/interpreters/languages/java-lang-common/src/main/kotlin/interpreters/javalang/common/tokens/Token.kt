package interpreters.javalang.common.tokens

data class Token(
    val tokenType: TokenType,
    val tokenLiteral: String,
    val lineNumber: Int,
    val columnNumber: Int,
) {
    companion object {
        const val EOF_TOKEN_LITERAL = ""

        fun buildEOF(lineNumber: Int, columnNumber: Int): Token {
            return Token(
                tokenType = TokenType.EOF,
                tokenLiteral = EOF_TOKEN_LITERAL,
                lineNumber = lineNumber,
                columnNumber = columnNumber
            )
        }
    }
}
