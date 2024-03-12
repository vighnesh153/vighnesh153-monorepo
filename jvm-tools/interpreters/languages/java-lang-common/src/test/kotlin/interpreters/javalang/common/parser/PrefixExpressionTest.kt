package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.*
import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class PrefixExpressionTest {
    data class Testcase(
        val id: Int,
        val input: String,
        val expectedOutput: PrefixExpression
    )

    @Test
    fun shouldParsePrefixExpressions() {
        val testcases = listOf(
            Testcase(
                id = 1,
                input = "-123",
                expectedOutput = PrefixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.MINUS, tokenLiteral = "-"),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "123"),
                        value = 123,
                    )
                )
            ),
            Testcase(
                id = 2,
                input = "!'a'",
                expectedOutput = PrefixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.BANG, tokenLiteral = "!"),
                    right = CharacterLiteral(
                        token = createTestToken(tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "'a'"),
                        value = 'a',
                    )
                )
            ),
            Testcase(
                id = 3,
                input = "++2",
                expectedOutput = PrefixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
                    right = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2"),
                        value = 2,
                    )
                )
            ),
            Testcase(
                id = 4,
                input = "--43.44",
                expectedOutput = PrefixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.DECREMENT, tokenLiteral = "--"),
                    right = DoubleLiteral(
                        token = createTestToken(tokenType = TokenType.DOUBLE_LITERAL, tokenLiteral = "43.44"),
                        value = 43.44,
                    )
                )
            ),
        )

        assertEquals(testcases.map { it.id }.toSet().size, testcases.size, "Testcases don't have unique ids")

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(1, program.getStatements().size)

            val statement = program.getStatements().first() as ExpressionStatement
            val prefixExpression = statement.expression as PrefixExpression

            assertEquals(prefixExpression.operatorToken.tokenType, testcase.expectedOutput.operatorToken.tokenType)

            assertTrue(
                prefixExpression.right.isSameAs(testcase.expectedOutput.right),
                "For testcase=${testcase.id}, expected '${prefixExpression.right}', found '${testcase.expectedOutput.right}'"
            )
        }
    }
}