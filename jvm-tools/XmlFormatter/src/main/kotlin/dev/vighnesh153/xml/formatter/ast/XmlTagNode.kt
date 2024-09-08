package dev.vighnesh153.xml.formatter.ast

import dev.vighnesh153.xml.formatter.lexer.Token

class XmlTagNode(
) : XmlExpression {
    private val mutableNamespaces = mutableListOf<Token>()
    val namespaces: List<Token>
        get() = mutableNamespaces.toList()

    private val mutableAttributes = mutableListOf<XmlElementAttribute>()
    val attributes: List<XmlElementAttribute>
        get() = mutableAttributes.toList()

    private val mutableChildren = mutableListOf<XmlExpression>()
    val children: List<XmlExpression>
        get() = mutableChildren.toList()

    fun addNamespace(ns: Token) {
        mutableNamespaces.add(ns)
    }

    fun addAttribute(attr: XmlElementAttribute) {
        mutableAttributes.add(attr)
    }

    fun addChild(child: XmlExpression) {
        mutableChildren.add(child)
    }

    override fun toString(indentation: Int): String {
        val builder = mutableListOf<String>()

        val tag = mutableNamespaces.joinToString(":") { it.tokenLiteral }

        builder.add("${buildIndentation(indentation)}<$tag")
        if (mutableAttributes.size == 1) {
            val serializedAttrs = mutableAttributes.joinToString(" ") { it.toString() }
            builder[builder.lastIndex] += " $serializedAttrs"
        } else if (mutableAttributes.size > 1) {
            for (attr in mutableAttributes) {
                builder.add("${buildIndentation(indentation + 1)}$attr")
            }
        }

        if (mutableChildren.isEmpty()) {
            builder[builder.lastIndex] += " />"
        } else {
            builder[builder.lastIndex] += ">"
        }

        // if only a single text node child
        if (mutableChildren.size == 1 && mutableChildren.first() is XmlTextNode) {
            return builder.joinToString("\n") + mutableChildren.first()
                .toString(0) + "</$tag>"
        }

        for (child in mutableChildren) {
            builder.add(child.toString(indentation + 1))
        }

        if (mutableChildren.isNotEmpty()) {
            builder.add("${buildIndentation(indentation)}</$tag>")
        }

        return builder.joinToString("\n")
    }
}