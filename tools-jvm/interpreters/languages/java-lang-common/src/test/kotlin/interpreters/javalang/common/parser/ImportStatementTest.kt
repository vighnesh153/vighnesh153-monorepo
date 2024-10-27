package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ImportStatement
import kotlin.test.Test
import kotlin.test.assertEquals

class ImportStatementTest {
    private data class ExpectedImportStatement(
        val identifiersForEachImport: List<String>,
        val isStaticImport: Boolean,
    )

    private data class ImportStatementsTestcase(
        val id: Int,
        val input: String,
        val expectedImportStatements: List<ExpectedImportStatement>,
    )

    @Test
    fun parseProgram() {
        val testcases = listOf(
            ImportStatementsTestcase(
                id = 1,
                input = "import pokemon;",
                expectedImportStatements = listOf(
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("pokemon"),
                        isStaticImport = false,
                    )
                ),
            ),
            ImportStatementsTestcase(
                id = 2,
                input = "import com.pikachu.is.the.best;",
                expectedImportStatements = listOf(
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("com", "pikachu", "is", "the", "best"),
                        isStaticImport = false,
                    )
                ),
            ),
            ImportStatementsTestcase(
                id = 3,
                input = """
                    import com.pikachu.is.the.best;
                    import greninja.is.the.best.too;
                """.trimIndent(),
                expectedImportStatements = listOf(
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("com", "pikachu", "is", "the", "best"),
                        isStaticImport = false,
                    ),
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("greninja", "is", "the", "best", "too"),
                        isStaticImport = false,
                    ),
                ),
            ),
            ImportStatementsTestcase(
                id = 4,
                input = """
                    import static com.pikachu.is.the.best;
                    import greninja.is.the.best.too;
                    import static greninja.is.the.best.too;
                    import com.pikachu.is.the.best;
                """.trimIndent(),
                expectedImportStatements = listOf(
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("com", "pikachu", "is", "the", "best"),
                        isStaticImport = true,
                    ),
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("greninja", "is", "the", "best", "too"),
                        isStaticImport = false,
                    ),
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("greninja", "is", "the", "best", "too"),
                        isStaticImport = true,
                    ),
                    ExpectedImportStatement(
                        identifiersForEachImport = listOf("com", "pikachu", "is", "the", "best"),
                        isStaticImport = false,
                    ),
                ),
            ),
        )

        assertEquals(testcases.map { it.id }.toSet().size, testcases.size, "Testcases don't have unique ids")

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(testcase.expectedImportStatements.size, program.getStatements().size)

            for (i in program.getStatements().indices) {
                val statement = program.getStatements()[i] as ImportStatement
                val expectedImportStatement = testcase.expectedImportStatements[i]

                assertEquals(
                    expectedImportStatement.identifiersForEachImport,
                    statement.dotSeparatedIdentifiers.map { it.tokenLiteral },
                )
                assertEquals(
                    expectedImportStatement.isStaticImport,
                    statement.isStaticImport,
                )
            }
        }
    }
}
