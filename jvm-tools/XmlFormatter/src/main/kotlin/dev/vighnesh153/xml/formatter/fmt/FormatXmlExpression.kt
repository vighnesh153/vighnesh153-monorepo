package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlCommentNode
import dev.vighnesh153.xml.formatter.ast.XmlExpression
import dev.vighnesh153.xml.formatter.ast.XmlPrologNode
import dev.vighnesh153.xml.formatter.ast.XmlTagNode
import dev.vighnesh153.xml.formatter.ast.XmlTextNode

internal fun formatXmlExpression(
    expr: XmlExpression,
    indentationLevel: Int,
    indentation: Int,
    sortAttributes: Boolean,
): String = when (expr) {
    is XmlPrologNode -> expr.format(
        indentationLevel = indentationLevel,
        indentation = indentation
    )

    is XmlTagNode -> expr.format(
        indentationLevel = indentationLevel,
        indentation = indentation,
        shouldSortAttributes = sortAttributes
    )

    is XmlCommentNode -> expr.format(
        indentationLevel = indentationLevel,
        indentation = indentation
    )

    is XmlTextNode -> expr.format(
        indentationLevel = indentationLevel,
        indentation = indentation
    )

    else -> throw Error("Unexpected xml expression '${expr.toString(0)}'")
}