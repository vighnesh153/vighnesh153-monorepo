package dev.vighnesh153.xml.formatter.lexer

import kotlin.Error
import kotlin.test.Test
import kotlin.test.expect

class LexerInputReaderTest {
    @Test
    fun readsEmptyString_withoutErrors() {
        val reader = LexerInputReader("")

        expect(reader.currChar) { null }
    }

    @Test
    fun readsStringWithSingleChar_withoutErrors() {
        val reader = LexerInputReader("p")

        expect(reader.currChar) { 'p' }
    }

    @Test
    fun updatesCurrChar_whenReadNextCharIsCalled() {
        val reader = LexerInputReader("pika")

        expect(reader.currChar) { 'p' }
        reader.readNextChar()
        expect(reader.currChar) { 'i' }
        reader.readNextChar()
        expect(reader.currChar) { 'k' }
        reader.readNextChar()
        expect(reader.currChar) { 'a' }
        repeat(10) {
            reader.readNextChar()
            expect(reader.currChar) { null }
        }
    }

    @Test
    fun updatesPeekChar_whenReadNextCharIsCalled() {
        val reader = LexerInputReader("pika")

        expect(reader.peekChar()) { 'i' }
        reader.readNextChar()
        expect(reader.peekChar()) { 'k' }
        reader.readNextChar()
        expect(reader.peekChar()) { 'a' }
        repeat(10) {
            reader.readNextChar()
            expect(reader.peekChar()) { null }
        }
    }

    @Test
    fun peekChar_throwsError_whenFutureOffsetIsNegative() {
        val reader = LexerInputReader("pika")

        try {
            reader.peekChar(-1)
            throw Error("reader.peekChar(-1) should have thrown error because futureOffset is negative")
        } catch (e: Error) {
            expect(e.message) {
                "Expected future offset to be non-negative, found '-1'"
            }
        }
    }

    @Test
    fun peekChar_returnsCorrectChar_whenFutureOffsetIsProvided() {
        val reader = LexerInputReader("pika")

        expect(reader.peekChar(1)) { 'k' }
        expect(reader.peekChar(2)) { 'a' }
        expect(reader.peekChar(3)) { null }
        expect(reader.peekChar(4)) { null }
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
        expect(reader.lineNumber) { 2 }
        expect(reader.columnNumber) { 1 }
        reader.readNextChar()
        expect(reader.lineNumber) { 2 }
        expect(reader.columnNumber) { 2 }

        reader.readNextChar()

        // line 3
        repeat(7) {
            reader.readNextChar()
            expect(reader.lineNumber) { 3 }
            expect(reader.columnNumber) { it + 1 }
        }

        reader.readNextChar()
        reader.readNextChar()

        // line 4
        expect(reader.lineNumber) { 4 }
        expect(reader.columnNumber) { 1 }
    }
}