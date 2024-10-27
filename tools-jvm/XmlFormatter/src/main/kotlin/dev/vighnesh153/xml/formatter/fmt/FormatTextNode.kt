package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlTextNode
import dev.vighnesh153.xml.formatter.ast.buildIndentation

internal fun XmlTextNode.format(
    indentationLevel: Int,
    indentation: Int,
): String = "${
    buildIndentation(
        indentationLevel = indentationLevel,
        indentation = indentation
    )
}${text.tokenLiteral.trim()}"
