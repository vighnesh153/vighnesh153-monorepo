package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionStatement
import interpreters.javalang.common.ast.FloatLiteral
import interpreters.javalang.common.ast.ImportStatement
import interpreters.javalang.common.ast.IntegerLiteral
import kotlin.test.Test
import kotlin.test.assertEquals

class ParseLiteralTest {
    @Test
    fun shouldParseIntegerLiterals() {
        data class IntegerTestCase(
            val id: Int,
            val input: String,
            val expectedOutput: Int,
        )

        val testcases = listOf(
            IntegerTestCase(id = 1, input = "5", expectedOutput = 5),
            IntegerTestCase(id = 2, input = "42", expectedOutput = 42),
            IntegerTestCase(id = 3, input = "101", expectedOutput = 101),
            IntegerTestCase(id = 4, input = "404", expectedOutput = 404),
            IntegerTestCase(id = 5, input = "9999", expectedOutput = 9999),
        )

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(1, program.getStatements().size)

            val statement = program.getStatements()[0] as ExpressionStatement
            val integerLiteral = statement.expression as IntegerLiteral

            assertEquals(testcase.expectedOutput, integerLiteral.value)
        }
    }

    @Test
    fun shouldParseFloatLiterals() {
        data class FloatTestCase(
            val id: Int,
            val input: String,
            val expectedOutput: Float,
        )

        val testcases = listOf(
            FloatTestCase(id = 1, input = "5f", expectedOutput = 5f),
            FloatTestCase(id = 2, input = "42.0f", expectedOutput = 42.0f),
            FloatTestCase(id = 3, input = ".101f", expectedOutput = 0.101f),
            FloatTestCase(id = 4, input = "404.232f", expectedOutput = 404.232f),
            FloatTestCase(id = 5, input = "9999.13f", expectedOutput = 9999.13f),
        )

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(1, program.getStatements().size)

            val statement = program.getStatements()[0] as ExpressionStatement
            val floatLiteral = statement.expression as FloatLiteral

            assertEquals(testcase.expectedOutput, floatLiteral.value)
        }
    }
}
