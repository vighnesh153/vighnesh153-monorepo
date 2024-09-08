package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlPrologNode
import dev.vighnesh153.xml.formatter.ast.buildIndentation

internal fun XmlPrologNode.format(
    indentationLevel: Int,
    indentation: Int,
): String {
    val stringBuilder = StringBuilder()

    stringBuilder.append(
        buildIndentation(
            indentationLevel = indentationLevel,
            indentation = indentation
        )
    )
    stringBuilder.append("<?xml")

    for (attr in attributes) {
        stringBuilder.append(" ${attr.format()}")
    }

    return "$stringBuilder?>"
}