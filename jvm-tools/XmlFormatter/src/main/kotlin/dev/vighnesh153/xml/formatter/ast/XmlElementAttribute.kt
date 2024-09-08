package dev.vighnesh153.xml.formatter.ast

import dev.vighnesh153.xml.formatter.lexer.Token

class XmlElementAttribute(
    val namespaces: List<Token>,
    val value: Token,
) {
    override fun toString(): String {
        val key = namespaces.joinToString(":") { it.tokenLiteral }
        return "$key=\"${value.tokenLiteral}\""
    }
}
