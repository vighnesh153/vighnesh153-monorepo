package interpreters.javalang.common.parser

import interpreters.javalang.common.errors.toStringForTesting

internal fun Parser.checkForParserErrors() {
    val errors = getErrors()

    assert(errors.isEmpty()) {
        StringBuilder()
            .append("Parser has ${errors.size} errors\n")
            .append(errors.joinToString("\n") { "Parser error: ${it.toStringForTesting()}" })
            .toString()
    }
}

