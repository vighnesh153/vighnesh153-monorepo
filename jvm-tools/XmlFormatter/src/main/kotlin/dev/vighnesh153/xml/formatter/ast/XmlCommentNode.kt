package dev.vighnesh153.xml.formatter.ast

import dev.vighnesh153.xml.formatter.lexer.Token

class XmlCommentNode(val comment: Token) : XmlExpression {
    override fun toString(indentation: Int): String {
        return "${buildIndentation(indentation)}<!-- ${comment.tokenLiteral.trim()} -->"
    }
}
