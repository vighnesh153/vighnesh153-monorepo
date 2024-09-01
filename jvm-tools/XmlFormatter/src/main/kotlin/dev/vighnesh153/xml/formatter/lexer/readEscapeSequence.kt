package dev.vighnesh153.xml.formatter.lexer

internal fun XmlLexer.readEscapeSequence(): Char? {
    assert(inputReader.currChar == BACKSLASH_CHARACTER) {
        "Attempting to read an escape sequence when start character isn't '\\'"
    }

    // move over the backslash
    inputReader.readNextChar()

    return when (inputReader.currChar) {
        'u' -> parseUnicodeCharacter()
        't' -> '\t'
        'n' -> '\n'
        '\\' -> '\\'
        '"' -> '"'
        EOF_CHARACTER -> {
            addError(
                UnclosedEscapeSequenceLexerError(
                    lineNumber = inputReader.lineNumber,
                    columnNumber = inputReader.columnNumber,
                )
            )
            null
        }

        else -> {
            addError(
                InvalidEscapeCharacterLexerError(
                    ch = inputReader.currChar,
                    lineNumber = inputReader.lineNumber,
                    columnNumber = inputReader.columnNumber,
                )
            )
            null
        }
    }
}

private fun XmlLexer.parseUnicodeCharacter(): Char? {
    assert(inputReader.currChar == 'u') {
        "Attempting to read a unicode character when start character isn't 'u'"
    }

    val unicodeCharacterBuilder = StringBuilder()

    // unicode: \u0000 to \uFFFF
    repeat(4) {
        val peek = inputReader.peekChar()?.lowercase()?.getOrNull(0)
        if (peek != null && (peek.isDigit() || peek in "abcdef")) {
            inputReader.readNextChar()
            unicodeCharacterBuilder.append(inputReader.currChar)
        } else {
            addError(
                InvalidUnicodeCharacterLexerError(
                    ch = peek,
                    lineNumber = inputReader.lineNumber,
                    columnNumber = inputReader.columnNumber,
                )
            )
            return null
        }
    }

    // https://stackoverflow.com/a/20239460/8822610
    return java.lang.String.valueOf(
        Character.toChars(
            Integer.parseInt(
                unicodeCharacterBuilder.toString(),
                16
            )
        )
    ).getOrNull(0)
}