package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlCommentNode
import dev.vighnesh153.xml.formatter.ast.XmlExpression
import dev.vighnesh153.xml.formatter.ast.XmlPrologNode
import dev.vighnesh153.xml.formatter.ast.XmlTagNode
import dev.vighnesh153.xml.formatter.ast.XmlTextNode

internal fun XmlExpression.format(
    indentationLevel: Int,
    indentation: Int,
    sortAttributes: Boolean,
): String = when (this) {
    is XmlPrologNode -> this.format(
        indentationLevel = indentationLevel,
        indentation = indentation
    )

    is XmlTagNode -> this.format(
        indentationLevel = indentationLevel,
        indentation = indentation,
        shouldSortAttributes = sortAttributes
    )

    is XmlCommentNode -> this.format(
        indentationLevel = indentationLevel,
        indentation = indentation
    )

    is XmlTextNode -> this.format(
        indentationLevel = indentationLevel,
        indentation = indentation
    )

    else -> throw Error("Unexpected xml expression '${toString(0)}'")
}