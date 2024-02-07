package interpreters.javalang.common.tokens

data class Token(
    val tokenType: TokenType,
    val tokenLiteral: String
) {
    companion object {
        val EOF = Token(tokenType = TokenType.EOF, tokenLiteral = "")
    }
}
