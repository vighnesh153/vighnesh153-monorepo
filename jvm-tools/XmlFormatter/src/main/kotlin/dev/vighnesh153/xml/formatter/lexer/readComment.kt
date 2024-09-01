package dev.vighnesh153.xml.formatter.lexer

internal fun XmlLexer.readComment(): String? {
    assert(inputReader.currChar == LEFT_ANGLE_BRACKET && inputReader.peekChar() == BANG_CHARACTER) {
        "Attempting to read a comment when doesn't start with '<!'"
    }

    // Move past "<!"
    inputReader.readNextChar()
    inputReader.readNextChar()

    // Move past "--"
    repeat(2) {
        if (inputReader.currChar != '-') {
            addError(
                UnexpectedCharacterLexerError(
                    expectedCh = '-',
                    actualCh = inputReader.currChar,
                    lineNumber = inputReader.lineNumber,
                    columnNumber = inputReader.columnNumber,
                )
            )
            return null
        }
        inputReader.readNextChar()
    }

    val commentLiteralBuilder = StringBuilder()

    while (true) {
        // unclosed comment
        if (inputReader.currChar.isEOF()) {
            addError(
                UnclosedCommentLiteralLexerError(
                    lineNumber = inputReader.lineNumber,
                    columnNumber = inputReader.columnNumber,
                )
            )
            return null
        }

        val peek = inputReader.peekChar()
        val peekNext = inputReader.peekChar(futureOffset = 1)

        // end of comment
        if (inputReader.currChar == '-' && peek == '-' && peekNext == '>') {
            // Move past: "--" and land on ">"
            inputReader.readNextChar()
            inputReader.readNextChar()

            return commentLiteralBuilder.toString()
        }

        commentLiteralBuilder.append(inputReader.currChar)

        // move on to next character
        inputReader.readNextChar()
    }
}