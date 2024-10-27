package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlCommentNode
import dev.vighnesh153.xml.formatter.ast.buildIndentation

internal fun XmlCommentNode.format(
    indentationLevel: Int,
    indentation: Int,
): String = "${
    buildIndentation(
        indentationLevel = indentationLevel,
        indentation = indentation
    )
}<!-- ${comment.tokenLiteral.trim()} -->"
