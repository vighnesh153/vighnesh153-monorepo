package dev.vighnesh153.xml.formatter.lexer

import kotlin.Error

class LexerInputReader(
    private val input: String,
) {
    var lineNumber = 1
        private set
    var columnNumber = 0
        private set

    var currChar: Char? = null
        private set
    private var prevChar: Char? = null

    private var currentIndex = -1
    private var peekIndex = 0

    init {
        readNextChar()
    }

    fun readNextChar() {
        prevChar = currChar
        if (peekIndex >= input.length) {
            currChar = null
        } else {
            currChar = input[peekIndex]
            columnNumber++
        }
        if (prevChar == '\n') {
            lineNumber++
            columnNumber = 1
        }
        currentIndex = peekIndex
        peekIndex = (peekIndex + 1).coerceAtMost(input.length)
    }

    fun peekChar(futureOffset: Int = 0): Char? {
        if (futureOffset < 0) {
            throw Error("Expected future offset to be non-negative, found '$futureOffset'")
        }
        val normalizedPeekIndex = peekIndex + futureOffset
        if (normalizedPeekIndex >= input.length) {
            return null
        }
        return input[normalizedPeekIndex]
    }
}