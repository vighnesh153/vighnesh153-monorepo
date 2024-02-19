package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals

class LexerErrorsTest {
    @Test
    fun lexerNextToken_readCharacterLiteral_errors() {
        val input = """
            'aa'
            'b
        """.trimIndent()

        val lexer = Lexer(input)
        var token = lexer.nextToken()
        while (token.tokenType != TokenType.EOF) {
            token = lexer.nextToken()
        }

        val expectedLexerErrors = listOf(
            "Too many characters in the character literal",
            "Unclosed character literal",
        )
        val actualErrors = lexer.getErrors()

        assertEquals(expectedLexerErrors, actualErrors.map { it.errorMessage })
    }

    @Test
    fun lexerNextToken_readStringLiteral_errors() {
        val input = """
            "aa
        """.trimIndent()

        val lexer = Lexer(input)
        var token = lexer.nextToken()
        while (token.tokenType != TokenType.EOF) {
            token = lexer.nextToken()
        }

        val expectedLexerErrors = listOf(
            "Unclosed string literal",
        )
        val actualErrors = lexer.getErrors()

        assertEquals(expectedLexerErrors, actualErrors.map { it.errorMessage })
    }

    @Test
    fun lexerNextToken_multilineComment_errors() {
        val input = """
            /* adslm
            dalkmsd
        """.trimIndent()

        val lexer = Lexer(input)
        var token = lexer.nextToken()
        while (token.tokenType != TokenType.EOF) {
            token = lexer.nextToken()
        }

        val expectedLexerErrors = listOf(
            "Unclosed multiline comment",
        )
        val actualErrors = lexer.getErrors()

        assertEquals(expectedLexerErrors, actualErrors.map { it.errorMessage })
    }

    @Test
    fun lexerNextToken_longNumber_errors() {
        val input = """
            1.4l
        """.trimIndent()

        val lexer = Lexer(input)
        var token = lexer.nextToken()
        while (token.tokenType != TokenType.EOF) {
            token = lexer.nextToken()
        }

        val expectedLexerErrors = listOf(
            "A floating point number cannot be long at the same time",
        )
        val actualErrors = lexer.getErrors()

        assertEquals(expectedLexerErrors, actualErrors.map { it.errorMessage })
    }
}
