package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionStatement
import interpreters.javalang.common.ast.InfixExpression
import interpreters.javalang.common.ast.IntegerLiteral
import interpreters.javalang.common.ast.PrefixExpression
import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class InfixExpressionTest {
    data class Testcase(
        val id: Int,
        val input: String,
        val expectedOutput: InfixExpression
    )

    @Test
    fun shouldParsePrefixExpressions() {
        val testcases = listOf(
            Testcase(
                id = 1,
                input = "1 + 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.PLUS, tokenLiteral = "+"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 2,
                input = "1 - 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.MINUS, tokenLiteral = "-"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 3,
                input = "1 * 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.ASTERISK, tokenLiteral = "*"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 4,
                input = "1 / 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.FORWARD_SLASH, tokenLiteral = "/"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 5,
                input = "1 ^ 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.CARET, tokenLiteral = "^"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 6,
                input = "1 & 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.AMPERSAND, tokenLiteral = "&"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 7,
                input = "1 | 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.VERTICAL_BAR, tokenLiteral = "|"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 8,
                input = "1 && 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = "&&"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 9,
                input = "1 || 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = "||"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 10,
                input = "1 < 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.LEFT_ANGLE_BRACKET, tokenLiteral = "<"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 11,
                input = "1 > 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.RIGHT_ANGLE_BRACKET, tokenLiteral = ">"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 12,
                input = "1 <= 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(
                        tokenType = TokenType.LEFT_ANGLE_BRACKET_EQUALS,
                        tokenLiteral = "<="
                    ),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 13,
                input = "1 >= 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(
                        tokenType = TokenType.RIGHT_ANGLE_BRACKET_EQUALS,
                        tokenLiteral = ">="
                    ),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 14,
                input = "1 = 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.EQUALS, tokenLiteral = "="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 15,
                input = "1 += 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.PLUS_EQUALS, tokenLiteral = "+="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 16,
                input = "1 -= 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.MINUS_EQUALS, tokenLiteral = "-="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 17,
                input = "1 *= 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = "*="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 18,
                input = "1 /= 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.FORWARD_SLASH_EQUALS, tokenLiteral = "/="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 19,
                input = "1 % 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.MODULUS, tokenLiteral = "%"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 20,
                input = "1 %= 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.MODULUS_EQUALS, tokenLiteral = "%="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 21,
                input = "1 ^= 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.CARET_EQUALS, tokenLiteral = "^="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 22,
                input = "1 == 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = "=="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
            Testcase(
                id = 23,
                input = "1 != 2",
                expectedOutput = InfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.BANG_EQUALS, tokenLiteral = "!="),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
                        value = 1,
                    ),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    ),
                ),
            ),
        )

        assertEquals(testcases.map { it.id }.toSet().size, testcases.size, "Testcases don't have unique ids")

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(1, program.getStatements().size)

            val statement = program.getStatements().first() as ExpressionStatement
            val infixExpression = statement.expression as InfixExpression

            assertEquals(infixExpression.operatorToken.tokenType, testcase.expectedOutput.operatorToken.tokenType)

            assertTrue(
                infixExpression.left.isSameAs(testcase.expectedOutput.left),
                "For testcase=${testcase.id}, expected '${infixExpression.left}', found '${testcase.expectedOutput.left}'"
            )
            assertTrue(
                infixExpression.right.isSameAs(testcase.expectedOutput.right),
                "For testcase=${testcase.id}, expected '${infixExpression.right}', found '${testcase.expectedOutput.right}'"
            )
        }
    }
}