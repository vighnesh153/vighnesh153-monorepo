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

a ++
b += c + ++d

x --
y-= z++ - --a

a *=b*= c = d

a /= b/c = d

a %=  b  %c = d

a!=b !c =d

a &&b &c&&d &e

a|b||c||d|e

a^b^c^=d^e

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

            // a ++
            // b +=    c + ++d
            ExpectedToken(id = 38, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 39, tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
            ExpectedToken(id = 40, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 41, tokenType = TokenType.PLUS_EQUALS, tokenLiteral = "+="),
            ExpectedToken(id = 42, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 43, tokenType = TokenType.PLUS, tokenLiteral = "+"),
            ExpectedToken(id = 44, tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
            ExpectedToken(id = 45, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            // x --
            // y-= z++ - --a
            ExpectedToken(id = 46, tokenType = TokenType.IDENTIFIER, tokenLiteral = "x"),
            ExpectedToken(id = 47, tokenType = TokenType.DECREMENT, tokenLiteral = "--"),
            ExpectedToken(id = 48, tokenType = TokenType.IDENTIFIER, tokenLiteral = "y"),
            ExpectedToken(id = 49, tokenType = TokenType.MINUS_EQUALS, tokenLiteral = "-="),
            ExpectedToken(id = 50, tokenType = TokenType.IDENTIFIER, tokenLiteral = "z"),
            ExpectedToken(id = 51, tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
            ExpectedToken(id = 52, tokenType = TokenType.MINUS, tokenLiteral = "-"),
            ExpectedToken(id = 53, tokenType = TokenType.DECREMENT, tokenLiteral = "--"),
            ExpectedToken(id = 54, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),

            // a *=b*= c = d
            ExpectedToken(id = 55, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 56, tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = "*="),
            ExpectedToken(id = 57, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 58, tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = "*="),
            ExpectedToken(id = 59, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 60, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 61, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            // a /= b/c = d
            ExpectedToken(id = 62, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 63, tokenType = TokenType.FORWARD_SLASH_EQUALS, tokenLiteral = "/="),
            ExpectedToken(id = 64, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 65, tokenType = TokenType.FORWARD_SLASH, tokenLiteral = "/"),
            ExpectedToken(id = 66, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 67, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 68, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            //a %=  b  %c = d
            ExpectedToken(id = 69, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 70, tokenType = TokenType.MODULUS_EQUALS, tokenLiteral = "%="),
            ExpectedToken(id = 71, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 72, tokenType = TokenType.MODULUS, tokenLiteral = "%"),
            ExpectedToken(id = 73, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 74, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 75, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            // a!=b !c =d
            ExpectedToken(id = 76, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 77, tokenType = TokenType.BANG_EQUALS, tokenLiteral = "!="),
            ExpectedToken(id = 78, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 79, tokenType = TokenType.BANG, tokenLiteral = "!"),
            ExpectedToken(id = 80, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 81, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 82, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            //a &&b &c&&d &e
            ExpectedToken(id = 83, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 84, tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = "&&"),
            ExpectedToken(id = 85, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 86, tokenType = TokenType.AMPERSAND, tokenLiteral = "&"),
            ExpectedToken(id = 87, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 88, tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = "&&"),
            ExpectedToken(id = 89, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),
            ExpectedToken(id = 90, tokenType = TokenType.AMPERSAND, tokenLiteral = "&"),
            ExpectedToken(id = 91, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e"),

            // a|b||c||d|e
            ExpectedToken(id = 92, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 93, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = "|"),
            ExpectedToken(id = 94, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 95, tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = "||"),
            ExpectedToken(id = 96, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 97, tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = "||"),
            ExpectedToken(id = 98, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),
            ExpectedToken(id = 99, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = "|"),
            ExpectedToken(id = 100, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e"),

            // a^b^c^=d^e
            ExpectedToken(id = 101, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 102, tokenType = TokenType.CARET, tokenLiteral = "^"),
            ExpectedToken(id = 103, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 104, tokenType = TokenType.CARET, tokenLiteral = "^"),
            ExpectedToken(id = 105, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 106, tokenType = TokenType.CARET_EQUALS, tokenLiteral = "^="),
            ExpectedToken(id = 107, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),
            ExpectedToken(id = 108, tokenType = TokenType.CARET, tokenLiteral = "^"),
            ExpectedToken(id = 109, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e"),

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
