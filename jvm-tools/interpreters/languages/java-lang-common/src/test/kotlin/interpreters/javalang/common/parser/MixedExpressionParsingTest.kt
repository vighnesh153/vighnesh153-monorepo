package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.BooleanLiteral
import interpreters.javalang.common.ast.CharacterLiteral
import interpreters.javalang.common.ast.DoubleLiteral
import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.ExpressionStatement
import interpreters.javalang.common.ast.FloatLiteral
import interpreters.javalang.common.ast.Identifier
import interpreters.javalang.common.ast.InfixExpression
import interpreters.javalang.common.ast.IntegerLiteral
import interpreters.javalang.common.ast.LongLiteral
import interpreters.javalang.common.ast.PostfixExpression
import interpreters.javalang.common.ast.PrefixExpression
import interpreters.javalang.common.ast.StringLiteral
import interpreters.javalang.common.tokens.TokenType.ASTERISK
import interpreters.javalang.common.tokens.TokenType.CARET
import interpreters.javalang.common.tokens.TokenType.INTEGER_LITERAL
import interpreters.javalang.common.tokens.TokenType.CHARACTER_LITERAL
import interpreters.javalang.common.tokens.TokenType.DECREMENT
import interpreters.javalang.common.tokens.TokenType.FLOAT_LITERAL
import interpreters.javalang.common.tokens.TokenType.LONG_LITERAL
import interpreters.javalang.common.tokens.TokenType.FALSE_KEYWORD
import interpreters.javalang.common.tokens.TokenType.TRUE_KEYWORD
import interpreters.javalang.common.tokens.TokenType.DOUBLE_LITERAL
import interpreters.javalang.common.tokens.TokenType.IDENTIFIER
import interpreters.javalang.common.tokens.TokenType.INCREMENT
import interpreters.javalang.common.tokens.TokenType.MINUS
import interpreters.javalang.common.tokens.TokenType.PLUS
import interpreters.javalang.common.tokens.TokenType.STRING_LITERAL
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class MixedExpressionParsingTest {
    data class Testcase(
        val id: Int,
        val input: String,
        val expectedExpression: ExpressionNode,
    )

    private val testcases = listOf(
        Testcase(1, "12345", IntegerLiteral(createTestToken(INTEGER_LITERAL, "12345"), 12345)),
        Testcase(2, "12.345f", FloatLiteral(createTestToken(FLOAT_LITERAL, "12.345f"), 12.345f)),
        Testcase(3, "123.45F", FloatLiteral(createTestToken(FLOAT_LITERAL, "123.45F"), 123.45F)),
        Testcase(4, "12345L", LongLiteral(createTestToken(LONG_LITERAL, "12345L"), 12345L)),
        Testcase(5, "false", BooleanLiteral(createTestToken(FALSE_KEYWORD, "false"), false)),
        Testcase(6, "true", BooleanLiteral(createTestToken(TRUE_KEYWORD, "true"), true)),
        Testcase(7, "123.456", DoubleLiteral(createTestToken(DOUBLE_LITERAL, "123.456"), 123.456)),
        Testcase(8, "\"pikachu\"", StringLiteral(createTestToken(STRING_LITERAL, "pikachu"), "pikachu")),
        Testcase(9, "'\n'", CharacterLiteral(createTestToken(CHARACTER_LITERAL, "\n"), '\n')),
        Testcase(
            10, "1 + 2 * 3",
            InfixExpression(
                operatorToken = createTestToken(PLUS, "+"),
                left = IntegerLiteral(createTestToken(INTEGER_LITERAL, "1"), 1),
                right = InfixExpression(
                    operatorToken = createTestToken(ASTERISK, "*"),
                    left = IntegerLiteral(createTestToken(INTEGER_LITERAL, "2"), 2),
                    right = IntegerLiteral(createTestToken(INTEGER_LITERAL, "3"), 3)
                )
            )
        ),

        Testcase(
            11, "++1-2--*a^b",
            InfixExpression(
                operatorToken = createTestToken(CARET, "^"),
                left = InfixExpression(
                    operatorToken = createTestToken(MINUS, "-"),
                    left = PrefixExpression(
                        operatorToken = createTestToken(INCREMENT, "++"),
                        right = IntegerLiteral(
                            token = createTestToken(INTEGER_LITERAL, "1"),
                            value = 1
                        ),
                    ),
                    right = InfixExpression(
                        operatorToken = createTestToken(ASTERISK, "*"),
                        left = PostfixExpression(
                            operatorToken = createTestToken(DECREMENT, "--"),
                            left = IntegerLiteral(
                                token = createTestToken(INTEGER_LITERAL, "2"),
                                value = 2,
                            )
                        ),
                        right = Identifier(
                            createTestToken(IDENTIFIER, "a"),
                            value = "a",
                        )
                    ),
                ),
                right = Identifier(
                    createTestToken(IDENTIFIER, "b"),
                    value = "b",
                )
            )
        ),
    )

    @Test
    fun mixedExpressionParsing() {
        assertEquals(testcases.map { it.id }.toSet().size, testcases.size, "Testcases don't have unique ids")

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(1, program.getStatements().size)

            val statement = program.getStatements().first() as ExpressionStatement
            val expression = statement.expression as ExpressionNode

            assertTrue(
                expression.isSameAs(testcase.expectedExpression),
                "For testcase=${testcase.id}, expected '${testcase.expectedExpression}', found '$expression'"
            )
        }
    }
}