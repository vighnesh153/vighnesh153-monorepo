package dev.vighnesh153.xml.formatter.lexer

class XmlLexer(internal val inputReader: LexerInputReader) {
    private val mutableErrors = mutableListOf<LexerError>()
    val errors: List<LexerError>
        get() = mutableErrors.toList()

    internal var currentToken: Token? = null

    fun addError(error: LexerError): Unit {
        mutableErrors.add(error)
    }
}