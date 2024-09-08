package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlElementAttribute

internal fun XmlElementAttribute.format(): String {
    val combinedNamespaces = namespaces.joinToString(":") { it.tokenLiteral }
    return """
        $combinedNamespaces="${value.tokenLiteral}"
        """.trim()
}