package dev.vighnesh153.xml.formatter.lexer

internal fun XmlLexer.readTextNode(): String {
    val textNodeBuilder = StringBuilder()

    while (inputReader.currChar.isNotEOF() && inputReader.peekChar() != LEFT_ANGLE_BRACKET) {
        textNodeBuilder.append(inputReader.currChar)
        inputReader.readNextChar()
    }

    if (inputReader.peekChar() == LEFT_ANGLE_BRACKET) {
        textNodeBuilder.append(inputReader.currChar)
    }

    return textNodeBuilder.toString()
}
