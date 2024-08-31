package dev.vighnesh153.xml.formatter.lexer

import kotlin.Error
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class LexerInputReaderTest {
    @Test
    fun readsEmptyString_withoutErrors() {
        val reader = LexerInputReader("")

        assertEquals(null, reader.currChar)
    }

    @Test
    fun readsStringWithSingleChar_withoutErrors() {
        val reader = LexerInputReader("p")

        assertEquals('p', reader.currChar)
    }

    @Test
    fun updatesCurrChar_whenReadNextCharIsCalled() {
        val reader = LexerInputReader("pika")

        assertEquals('p', reader.currChar)
        reader.readNextChar()
        assertEquals('i', reader.currChar)
        reader.readNextChar()
        assertEquals('k', reader.currChar)
        reader.readNextChar()
        assertEquals('a', reader.currChar)
        repeat(10) {
            reader.readNextChar()
            assertNull(reader.currChar)
        }
    }

    @Test
    fun updatesPeekChar_whenReadNextCharIsCalled() {
        val reader = LexerInputReader("pika")

        assertEquals('i', reader.peekChar())
        reader.readNextChar()
        assertEquals('k', reader.peekChar())
        reader.readNextChar()
        assertEquals('a', reader.peekChar())
        repeat(10) {
            reader.readNextChar()
            assertNull(reader.peekChar())
        }
    }

    @Test
    fun peekChar_throwsError_whenFutureOffsetIsNegative() {
        val reader = LexerInputReader("pika")

        val ex = assertThrows<Error> { reader.peekChar(-1) }
        assertEquals("Expected future offset to be non-negative, found '-1'", ex.message)
    }

    @Test
    fun peekChar_returnsCorrectChar_whenFutureOffsetIsProvided() {
        val reader = LexerInputReader("pika")

        assertEquals('k', reader.peekChar(1))
        assertEquals('a', reader.peekChar(2))
        assertNull(reader.peekChar(3))
        assertNull(reader.peekChar(4))
    }

    @Test
    fun correctlyCalculatesLineAndColumnNumbers() {
        val reader = LexerInputReader(
            """
pi
pikachu
"""
        )

        // current character is the first character of the above string which is a
        // new line character. Move to next character
        reader.readNextChar()

        // line 2
        assertEquals(2, reader.lineNumber)
        assertEquals(1, reader.columnNumber)
        reader.readNextChar()
        assertEquals(2, reader.lineNumber)
        assertEquals(2, reader.columnNumber)

        reader.readNextChar()

        // line 3
        repeat(7) {
            reader.readNextChar()
            assertEquals(3, reader.lineNumber)
            assertEquals(it + 1, reader.columnNumber)
        }

        reader.readNextChar()
        reader.readNextChar()

        // line 4
        assertEquals(4, reader.lineNumber)
        assertEquals(1, reader.columnNumber)
    }
}