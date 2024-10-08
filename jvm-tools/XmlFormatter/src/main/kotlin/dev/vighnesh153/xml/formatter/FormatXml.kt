package dev.vighnesh153.xml.formatter

import dev.vighnesh153.xml.formatter.fmt.format
import dev.vighnesh153.xml.formatter.lexer.LexerError
import dev.vighnesh153.xml.formatter.lexer.LexerInputReader
import dev.vighnesh153.xml.formatter.lexer.XmlLexer
import dev.vighnesh153.xml.formatter.parser.ParserError
import dev.vighnesh153.xml.formatter.parser.XmlParser

sealed interface XmlFormatResponse

data class LexerErrorResponse(val errors: List<LexerError>) : XmlFormatResponse
data class ParserErrorResponse(val errors: List<ParserError>) : XmlFormatResponse
data class UnknownErrorResponse(val error: Exception) : XmlFormatResponse
data class FormatSuccessResponse(val formattedXml: String) : XmlFormatResponse

/**
 * Formats xml string content
 *
 * @param indentation count of indentation spaces for each indentation block
 * @param sortAttributes whether to sort the xml tag attributes
 */
fun formatXml(
    rawXml: String,
    indentation: Int = 4,
    sortAttributes: Boolean = true,
): XmlFormatResponse = try {
    val inputReader = LexerInputReader(rawXml)
    val lexer = XmlLexer(inputReader)
    val parser = XmlParser(lexer)
    val program = parser.parseProgram()

    when {
        lexer.errors.isNotEmpty() -> LexerErrorResponse(errors = lexer.errors)
        parser.errors.isNotEmpty() -> ParserErrorResponse(errors = parser.errors)
        else -> FormatSuccessResponse(
            formattedXml = program.format(
                indentation = indentation,
                sortAttributes = sortAttributes
            )
        )
    }
} catch (e: Exception) {
    UnknownErrorResponse(e)
}