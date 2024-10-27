package dev.vighnesh153.xml.formatter.parser

import dev.vighnesh153.xml.formatter.lexer.Token
import dev.vighnesh153.xml.formatter.lexer.TokenType

sealed interface ParserError {
    val culpritToken: Token
}

data class UnexpectedTokenParserError(
    override val culpritToken: Token,
    val expectedTokenTypes: List<TokenType>,
) : ParserError

data class UnexpectedPrologTagParserError(
    override val culpritToken: Token,
) : ParserError

data class UnexpectedClosingTagLiteralParserError(
    override val culpritToken: Token,
) : ParserError

data class UnexpectedEofParserError(
    override val culpritToken: Token,
) : ParserError
