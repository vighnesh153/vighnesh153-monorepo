package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlProgram

internal fun XmlProgram.format(
    indentation: Int,
    sortAttributes: Boolean,
): String = statements.joinToString("\n") {
    formatXmlExpression(
        expr = it,
        indentationLevel = 0,
        indentation = indentation,
        sortAttributes = sortAttributes
    )
} + "\n"
