package dev.vighnesh153.xml.formatter.lexer

internal fun XmlLexer.readStringLiteral(): String {
    assert(inputReader.currChar == DOUBLE_QUOTE) {
        "Attempting to read a string literal when start character isn't '\"'"
    }

    // move over first double quote
    inputReader.readNextChar()

    val stringLiteralBuilder = StringBuilder()
    while (inputReader.currChar.isNotEOF() && inputReader.currChar != DOUBLE_QUOTE) {
        if (inputReader.currChar == BACKSLASH_CHARACTER) {
            stringLiteralBuilder.append(readEscapeSequence())
        } else {
            stringLiteralBuilder.append(inputReader.currChar)
        }
        inputReader.readNextChar()
    }

    if (inputReader.currChar.isEOF()) {
        addError(
            UnclosedStringLiteralLexerError(
                lineNumber = inputReader.lineNumber,
                columnNumber = inputReader.columnNumber,
            )
        )
    }

    return stringLiteralBuilder.toString()
}