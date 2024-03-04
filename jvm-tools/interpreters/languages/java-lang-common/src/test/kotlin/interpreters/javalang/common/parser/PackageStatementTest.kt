package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.PackageStatement
import kotlin.test.Test
import kotlin.test.assertEquals

class PackageStatementTest {
    private data class PackageStatementsTestcase(
        val id: Int,
        val input: String,
        val expectedStatementCount: Int,
        val expectedIdentifiersForEachPackage: List<List<String>>,
    )

    @Test
    fun parseProgram() {
        val testcases = listOf(
            PackageStatementsTestcase(
                id = 1,
                input = "package pokemon;",
                expectedStatementCount = 1,
                expectedIdentifiersForEachPackage = listOf(listOf("pokemon"))
            ),
            PackageStatementsTestcase(
                id = 2,
                input = "package com.pikachu.is.the.best;",
                expectedStatementCount = 1,
                expectedIdentifiersForEachPackage = listOf(listOf("com", "pikachu", "is", "the", "best"))
            ),
            PackageStatementsTestcase(
                id = 3,
                input = """
                    package com.pikachu.is.the.best;
                    package greninja.is.the.best.too;
                """.trimIndent(),
                expectedStatementCount = 2,
                expectedIdentifiersForEachPackage = listOf(
                    listOf("com", "pikachu", "is", "the", "best"),
                    listOf("greninja", "is", "the", "best", "too"),
                )
            ),
        )

        assertEquals(testcases.map { it.id }.toSet().size, testcases.size, "Testcases don't have unique ids")

        for (testcase in testcases) {
            val parser = createParser(input = testcase.input)
            val program = parser.parseProgram()

            parser.checkForParserErrors()

            assertEquals(testcase.expectedStatementCount, program.getStatements().size)

            for (i in program.getStatements().indices) {
                val statement = program.getStatements()[i] as PackageStatement
                val expectedIdentifiers = testcase.expectedIdentifiersForEachPackage[i]

                assertEquals(
                    expectedIdentifiers,
                    statement.dotSeparatedIdentifiers.map { it.tokenLiteral },
                )
            }
        }
    }
}
