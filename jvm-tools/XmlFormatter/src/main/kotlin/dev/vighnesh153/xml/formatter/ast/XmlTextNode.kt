package dev.vighnesh153.xml.formatter.ast

import dev.vighnesh153.xml.formatter.lexer.Token

class XmlTextNode(val text: Token) : XmlExpression {
    override fun toString(indentation: Int): String {
        return "${buildIndentation(indentation)}${text.tokenLiteral.trim()}"
    }
}
