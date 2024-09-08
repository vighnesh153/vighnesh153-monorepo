package dev.vighnesh153.xml.formatter.ast

sealed interface XmlExpression {
    fun toString(indentation: Int): String
}
