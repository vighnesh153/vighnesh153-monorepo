package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlTagNode
import dev.vighnesh153.xml.formatter.ast.XmlTextNode
import dev.vighnesh153.xml.formatter.ast.buildIndentation

internal fun XmlTagNode.format(
    indentationLevel: Int,
    indentation: Int,
    shouldSortAttributes: Boolean,
): String {
    val tagName = namespaces.joinToString(":") { it.tokenLiteral }

    val stringBuilder = mutableListOf<String>()

    // push: <tag-name
    stringBuilder.add(
        "${
            buildIndentation(
                indentationLevel = indentationLevel,
                indentation = indentation
            )
        }<$tagName"
    )

    // push attributes
    if (attributes.size == 1) {
        stringBuilder[stringBuilder.lastIndex] += " ${attributes.first().format()}"
    } else if (attributes.size > 1) {
        val attrs =
            if (shouldSortAttributes) sortAttributes(attributes) else attributes
        stringBuilder.addAll(attrs.map {
            "${
                buildIndentation(
                    indentationLevel = indentationLevel + 1,
                    indentation = indentation
                )
            }${it.format()}"
        })
    }

    if (children.isEmpty()) {
        // push self closing tag's end marker
        stringBuilder[stringBuilder.lastIndex] += " />"
    } else {
        // push tag opening's end marker
        stringBuilder[stringBuilder.lastIndex] += ">"

        // if only a text node as child, format it on same line
        if (children.size == 1 && children.first() is XmlTextNode) {
            return stringBuilder.joinToString("\n") + (children.first() as XmlTextNode).format(
                indentationLevel = 0,
                indentation = indentation
            ) + "</$tagName>"
        }

        // push children
        stringBuilder.addAll(
            children.map {
                formatXmlExpression(
                    expr = it,
                    indentationLevel = indentationLevel + 1,
                    indentation = indentation,
                    sortAttributes = shouldSortAttributes
                )
            }
        )

        // push closing tag
        stringBuilder.add(
            "${
                buildIndentation(
                    indentationLevel = indentationLevel,
                    indentation = indentation
                )
            }</$tagName>"
        )
    }

    return stringBuilder.joinToString("\n")
}
