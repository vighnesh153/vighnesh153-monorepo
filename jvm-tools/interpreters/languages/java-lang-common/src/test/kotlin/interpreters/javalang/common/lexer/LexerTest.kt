package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals

class LexerTest {
    @Test
    fun lexerNextToken() {
        val input = """
5,;@
        """.trimIndent()

        val expectedTokens = listOf(
            ExpectedToken(id = 0, tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "5"),
            ExpectedToken(id = 1, tokenType = TokenType.COMMA, tokenLiteral = ","),
            ExpectedToken(id = 2, tokenType = TokenType.SEMICOLON, tokenLiteral = ";"),
            ExpectedToken(id = 3, tokenType = TokenType.AT_SIGN, tokenLiteral = "@"),
            ExpectedToken(id = 4, tokenType = TokenType.EOF, tokenLiteral = ""),
        )

        // In the expectedTokens, if ids are not unique, throw error
        if (expectedTokens.map { it.id }.toSet().size != expectedTokens.size) {
            throw Error("Some of the id's are not unique")
        }

        val lexer = Lexer(input)

        for (expectedToken in expectedTokens) {
            val actualToken = lexer.nextToken()

            assertEquals("${1}", "1")
            assertEquals(expectedToken.tokenType.name, actualToken.tokenType.name)
            assertEquals(expectedToken.tokenLiteral, actualToken.tokenLiteral)
        }
    }
}

private data class ExpectedToken(
    val id: Int,
    val tokenType: TokenType,
    val tokenLiteral: String,
)
