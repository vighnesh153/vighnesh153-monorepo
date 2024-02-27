package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.*
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

    @Test
    fun shouldParseLongLiterals() {
        data class LongTestCase(
            val id: Int,
            val input: String,
            val expectedOutput: Long,
        )

        val testcases = listOf(
            LongTestCase(id = 1, input = "5L", expectedOutput = 5L),
            LongTestCase(id = 2, input = "42L", expectedOutput = 42L),
            LongTestCase(id = 3, input = "101L", expectedOutput = 101L),
            LongTestCase(id = 4, input = "404L", expectedOutput = 404L),
            LongTestCase(id = 5, input = "9999L", expectedOutput = 9999L),
        )

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(1, program.getStatements().size)

            val statement = program.getStatements()[0] as ExpressionStatement
            val longLiteral = statement.expression as LongLiteral

            assertEquals(testcase.expectedOutput, longLiteral.value)
        }
    }

    @Test
    fun shouldParseDoubleLiterals() {
        data class DoubleTestCase(
            val id: Int,
            val input: String,
            val expectedOutput: Double,
        )

        val testcases = listOf(
            DoubleTestCase(id = 1, input = "5.0", expectedOutput = 5.0),
            DoubleTestCase(id = 2, input = "42.0", expectedOutput = 42.0),
            DoubleTestCase(id = 3, input = ".101", expectedOutput = 0.101),
            DoubleTestCase(id = 4, input = "404.232", expectedOutput = 404.232),
            DoubleTestCase(id = 5, input = "9999.13", expectedOutput = 9999.13),
        )

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(1, program.getStatements().size)

            val statement = program.getStatements()[0] as ExpressionStatement
            val floatLiteral = statement.expression as DoubleLiteral

            assertEquals(testcase.expectedOutput, floatLiteral.value)
        }
    }
}
