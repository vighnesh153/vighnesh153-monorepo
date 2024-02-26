package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ImportStatement
import kotlin.test.Test
import kotlin.test.assertEquals

class ImportStatementTest {
    private data class ImportStatementsTestcase(
        val id: Int,
        val input: String,
        val expectedStatementCount: Int,
        val expectedIdentifiersForEachImport: List<List<String>>,
    )

    @Test
    fun parseProgram() {
        val testcases = listOf(
            ImportStatementsTestcase(
                id = 1,
                input = "import pokemon;",
                expectedStatementCount = 1,
                expectedIdentifiersForEachImport = listOf(listOf("pokemon"))
            ),
            ImportStatementsTestcase(
                id = 2,
                input = "import com.pikachu.is.the.best;",
                expectedStatementCount = 1,
                expectedIdentifiersForEachImport = listOf(listOf("com", "pikachu", "is", "the", "best"))
            ),
            ImportStatementsTestcase(
                id = 3,
                input = """
                    import com.pikachu.is.the.best;
                    import greninja.is.the.best.too;
                """.trimIndent(),
                expectedStatementCount = 2,
                expectedIdentifiersForEachImport = listOf(
                    listOf("com", "pikachu", "is", "the", "best"),
                    listOf("greninja", "is", "the", "best", "too"),
                )
            ),
        )

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(testcase.expectedStatementCount, program.getStatements().size)

            for (i in program.getStatements().indices) {
                val statement = program.getStatements()[i] as ImportStatement
                val expectedIdentifiers = testcase.expectedIdentifiersForEachImport[i]

                assertEquals(
                    expectedIdentifiers,
                    statement.dotSeparatedIdentifiers.map { it.tokenLiteral },
                )
            }
        }
    }
}
