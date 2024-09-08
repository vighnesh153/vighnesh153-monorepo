package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlElementAttribute

internal fun sortAttributes(attributes: List<XmlElementAttribute>): List<XmlElementAttribute> {
    val sortedAttrs = mutableListOf<XmlElementAttribute>()
    var intermediateAttrs = attributes

    fun moveAttrsToResult(attrsToBeMoved: List<XmlElementAttribute>) {
        if (attributes.isEmpty()) {
            return
        }
        sortedAttrs.addAll(naiveSort(attrsToBeMoved))
        intermediateAttrs = intermediateAttrs.filter { it !in attrsToBeMoved }
    }

    // xmlns:android
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.size == 2 && it.namespaces.first().tokenLiteral == "xmlns" && it.namespaces[1].tokenLiteral == "android" })

    // xmlns:*
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.isNotEmpty() && it.namespaces.first().tokenLiteral == "xmlns" })

    // android:id
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.size == 2 && it.namespaces.first().tokenLiteral == "android" && it.namespaces[1].tokenLiteral == "id" })

    // android.*:id
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.isNotEmpty() && it.namespaces.first().tokenLiteral == "android" && it.namespaces.last().tokenLiteral == "id" })

    // android:name
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.size == 2 && it.namespaces.first().tokenLiteral == "android" && it.namespaces[1].tokenLiteral == "name" })

    // android.*:name
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.isNotEmpty() && it.namespaces.first().tokenLiteral == "android" && it.namespaces.last().tokenLiteral == "name" })

    // name
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.size == 1 && it.namespaces.first().tokenLiteral == "name" })

    // style
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.size == 1 && it.namespaces.first().tokenLiteral == "style" })

    // no-namespace attributes
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.size == 1 })

    // android:*
    moveAttrsToResult(intermediateAttrs.filter { it.namespaces.size > 1 && it.namespaces.first().tokenLiteral == "android" })

    // remaining attributes
    moveAttrsToResult(intermediateAttrs)

    return sortedAttrs
}

private fun naiveSort(attrs: List<XmlElementAttribute>) =
    attrs.sortedBy { attr -> attr.namespaces.joinToString(":") { it.tokenLiteral } }