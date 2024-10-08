package dev.vighnesh153.xml.formatter.lexer

sealed interface LexerError {
    val lineNumber: Int
    val columnNumber: Int
}

data class IllegalCharacterLexerError(
    val ch: Char?,
    override val lineNumber: Int,
    override val columnNumber: Int,
) : LexerError

data class UnexpectedCharacterLexerError(
    val expectedCh: Char?,
    val actualCh: Char?,
    override val lineNumber: Int,
    override val columnNumber: Int,
) : LexerError

data class InvalidEscapeCharacterLexerError(
    val ch: Char?,
    override val lineNumber: Int,
    override val columnNumber: Int,
) : LexerError

data class InvalidUnicodeCharacterLexerError(
    val ch: Char?,
    override val lineNumber: Int,
    override val columnNumber: Int,
) : LexerError

data class UnclosedCommentLiteralLexerError(
    override val lineNumber: Int,
    override val columnNumber: Int,
) : LexerError

data class UnclosedEscapeSequenceLexerError(
    override val lineNumber: Int,
    override val columnNumber: Int,
) : LexerError

data class UnclosedStringLiteralLexerError(
    override val lineNumber: Int,
    override val columnNumber: Int,
) : LexerError
