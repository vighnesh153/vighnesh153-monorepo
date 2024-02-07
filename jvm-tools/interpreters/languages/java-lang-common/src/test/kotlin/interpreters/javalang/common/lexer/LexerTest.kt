package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals

class LexerTest {
    @Test
    fun lexerNextToken() {
        val input = """

,;@+-*/\%!&|^?:.~

'"`

(){}[]<>

abc _aa a123 __11 _

a == b== c

        """.trimIndent()

        val expectedTokens = listOf(

            // ,;@+-*/\%!&|^?:.~
            ExpectedToken(id = 0, tokenType = TokenType.COMMA, tokenLiteral = TokenType.COMMA.value),
            ExpectedToken(id = 1, tokenType = TokenType.SEMICOLON, tokenLiteral = TokenType.SEMICOLON.value),
            ExpectedToken(id = 2, tokenType = TokenType.AT_SIGN, tokenLiteral = TokenType.AT_SIGN.value),
            ExpectedToken(id = 3, tokenType = TokenType.PLUS, tokenLiteral = TokenType.PLUS.value),
            ExpectedToken(id = 4, tokenType = TokenType.MINUS, tokenLiteral = TokenType.MINUS.value),
            ExpectedToken(id = 5, tokenType = TokenType.ASTERISK, tokenLiteral = TokenType.ASTERISK.value),
            ExpectedToken(id = 6, tokenType = TokenType.FORWARD_SLASH, tokenLiteral = TokenType.FORWARD_SLASH.value),
            ExpectedToken(id = 7, tokenType = TokenType.BACK_SLASH, tokenLiteral = TokenType.BACK_SLASH.value),
            ExpectedToken(id = 8, tokenType = TokenType.MODULUS, tokenLiteral = TokenType.MODULUS.value),
            ExpectedToken(id = 9, tokenType = TokenType.BANG, tokenLiteral = TokenType.BANG.value),
            ExpectedToken(id = 10, tokenType = TokenType.AMPERSAND, tokenLiteral = TokenType.AMPERSAND.value),
            ExpectedToken(id = 11, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = TokenType.VERTICAL_BAR.value),
            ExpectedToken(id = 12, tokenType = TokenType.CARET, tokenLiteral = TokenType.CARET.value),
            ExpectedToken(id = 13, tokenType = TokenType.QUESTION, tokenLiteral = TokenType.QUESTION.value),
            ExpectedToken(id = 14, tokenType = TokenType.COLON, tokenLiteral = TokenType.COLON.value),
            ExpectedToken(id = 15, tokenType = TokenType.DOT, tokenLiteral = TokenType.DOT.value),
            ExpectedToken(id = 16, tokenType = TokenType.TILDE, tokenLiteral = TokenType.TILDE.value),

            // '"`
            ExpectedToken(id = 17, tokenType = TokenType.SINGLE_QUOTE, tokenLiteral = TokenType.SINGLE_QUOTE.value),
            ExpectedToken(id = 18, tokenType = TokenType.DOUBLE_QUOTE, tokenLiteral = TokenType.DOUBLE_QUOTE.value),
            ExpectedToken(id = 19, tokenType = TokenType.BACKTICK, tokenLiteral = TokenType.BACKTICK.value),

            // (){}[]<>
            ExpectedToken(
                id = 20,
                tokenType = TokenType.LEFT_PARENTHESIS,
                tokenLiteral = TokenType.LEFT_PARENTHESIS.value
            ),
            ExpectedToken(
                id = 21,
                tokenType = TokenType.RIGHT_PARENTHESIS,
                tokenLiteral = TokenType.RIGHT_PARENTHESIS.value
            ),
            ExpectedToken(
                id = 22,
                tokenType = TokenType.LEFT_CURLY_BRACE,
                tokenLiteral = TokenType.LEFT_CURLY_BRACE.value
            ),
            ExpectedToken(
                id = 23,
                tokenType = TokenType.RIGHT_CURLY_BRACE,
                tokenLiteral = TokenType.RIGHT_CURLY_BRACE.value
            ),
            ExpectedToken(
                id = 24,
                tokenType = TokenType.LEFT_SQUARE_BRACKET,
                tokenLiteral = TokenType.LEFT_SQUARE_BRACKET.value
            ),
            ExpectedToken(
                id = 25,
                tokenType = TokenType.RIGHT_SQUARE_BRACKET,
                tokenLiteral = TokenType.RIGHT_SQUARE_BRACKET.value
            ),
            ExpectedToken(
                id = 26,
                tokenType = TokenType.LEFT_ANGLE_BRACKET,
                tokenLiteral = TokenType.LEFT_ANGLE_BRACKET.value
            ),
            ExpectedToken(
                id = 27,
                tokenType = TokenType.RIGHT_ANGLE_BRACKET,
                tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET.value
            ),

            // abc _aa a123 __11 _
            ExpectedToken(id = 28, tokenType = TokenType.IDENTIFIER, tokenLiteral = "abc"),
            ExpectedToken(id = 29, tokenType = TokenType.IDENTIFIER, tokenLiteral = "_aa"),
            ExpectedToken(id = 30, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a123"),
            ExpectedToken(id = 31, tokenType = TokenType.IDENTIFIER, tokenLiteral = "__11"),
            ExpectedToken(id = 32, tokenType = TokenType.IDENTIFIER, tokenLiteral = "_"),

            // a == b== c
            ExpectedToken(id = 33, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 34, tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = "=="),
            ExpectedToken(id = 35, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 36, tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = "=="),
            ExpectedToken(id = 37, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),

            // eof
            ExpectedToken(id = -1, tokenType = Token.EOF.tokenType, tokenLiteral = Token.EOF.tokenLiteral),
        )

        // In the expectedTokens, if ids are not unique, throw error
        if (expectedTokens.map { it.id }.toSet().size != expectedTokens.size) {
            throw Error("Some of the id's are not unique")
        }

        val lexer = Lexer(input)

        for (expectedToken in expectedTokens) {
            val actualToken = lexer.nextToken()

            assertEquals(expectedToken.tokenType.name, actualToken.tokenType.name, "id: ${expectedToken.id}")
            assertEquals(expectedToken.tokenLiteral, actualToken.tokenLiteral, "id: ${expectedToken.id}")
        }
    }
}

private data class ExpectedToken(
    val id: Int,
    val tokenType: TokenType,
    val tokenLiteral: String,
)
