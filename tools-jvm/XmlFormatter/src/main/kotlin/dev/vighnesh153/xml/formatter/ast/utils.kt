package dev.vighnesh153.xml.formatter.ast

internal fun buildIndentation(indentationLevel: Int, indentation: Int = 4): String =
    " ".repeat(indentationLevel * indentation)
