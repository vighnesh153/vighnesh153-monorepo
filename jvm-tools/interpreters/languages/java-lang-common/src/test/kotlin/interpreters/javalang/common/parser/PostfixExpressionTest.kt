package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.*
import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class PostfixExpressionTest {
    data class Testcase(
        val id: Int,
        val input: String,
        val expectedOutput: PostfixExpression
    )

    @Test
    fun shouldParsePrefixExpressions() {
        val testcases = listOf(
            Testcase(
                id = 1,
                input = "123++",
                expectedOutput = PostfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
                    left = IntegerLiteral(
                        token = createTestToken(tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "123"),
                        value = 123,
                    )
                )
            ),
            Testcase(
                id = 2,
                input = "false--",
                expectedOutput = PostfixExpression(
                    operatorToken = createTestToken(tokenType = TokenType.DECREMENT, tokenLiteral = "--"),
                    left = BooleanLiteral(
                        token = createTestToken(tokenType = TokenType.FALSE_KEYWORD, tokenLiteral = "false"),
                        value = false,
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
            val postfixExpression = statement.expression as PostfixExpression

            assertEquals(postfixExpression.operatorToken.tokenType, testcase.expectedOutput.operatorToken.tokenType)

            assertTrue(
                postfixExpression.left.isSameAs(testcase.expectedOutput.left),
                "For testcase=${testcase.id}, expected '${postfixExpression.left}' to be '${testcase.expectedOutput.left}'"
            )
        }
    }
}