package dev.vighnesh153.xml.formatter.ast

import dev.vighnesh153.xml.formatter.lexer.Token

class XmlTextNode(val text: Token) : XmlExpression {
    override fun toString(indentationLevel: Int): String {
        return "${buildIndentation(indentationLevel = indentationLevel)}${text.tokenLiteral.trim()}"
    }
}
