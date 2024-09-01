package dev.vighnesh153.xml.formatter.lexer

internal fun XmlLexer.readIdentifier(): String {
    assert(inputReader.currChar.isAcceptableIdentifierStart()) {
        "Attempting to read an identifier when start character isn't an acceptable identifier start"
    }

    val identifierBuilder = StringBuilder()

    while (inputReader.peekChar().isAcceptableIdentifierPart()) {
        identifierBuilder.append(inputReader.currChar)
        inputReader.readNextChar()
    }

    if (inputReader.currChar.isAcceptableIdentifierPart()) {
        identifierBuilder.append(inputReader.currChar)
    }

    return identifierBuilder.toString()
}

private fun Char?.isAcceptableIdentifierStart(): Boolean = this?.isJavaIdentifierStart() == true

private fun Char?.isAcceptableIdentifierPart(): Boolean = this?.isJavaIdentifierPart() == true
