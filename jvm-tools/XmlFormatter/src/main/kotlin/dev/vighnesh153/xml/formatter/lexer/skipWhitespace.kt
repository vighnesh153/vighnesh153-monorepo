package dev.vighnesh153.xml.formatter.lexer

internal fun XmlLexer.skipWhitespace() {
    while (inputReader.currChar?.isWhitespace() == true) {
        inputReader.readNextChar()
    }
}
