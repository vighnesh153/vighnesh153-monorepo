package dev.vighnesh153.xml.formatter.ast

import dev.vighnesh153.xml.formatter.lexer.Token

class XmlCommentNode(val comment: Token) : XmlExpression {
    override fun toString(indentationLevel: Int): String {
        return "${buildIndentation(indentationLevel = indentationLevel)}<!-- ${comment.tokenLiteral.trim()} -->"
    }
}
