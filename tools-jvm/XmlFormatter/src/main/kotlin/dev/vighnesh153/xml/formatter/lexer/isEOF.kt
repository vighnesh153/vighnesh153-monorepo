package dev.vighnesh153.xml.formatter.lexer

internal fun Char?.isEOF() = this == EOF_CHARACTER
internal fun Char?.isNotEOF() = !isEOF()
