package dev.vighnesh153.xml.formatter.lexer

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Test

class LexerNextTokenTest {

    @Test
    fun returnsEof_whenInputIsEmpty() {
        val lexer = XmlLexer(LexerInputReader(""))

        assertEquals(
            Token(
                tokenType = TokenType.Eof,
                tokenLiteral = TokenType.Eof.value,
                lineNumber = 1,
                columnNumber = 0
            ),
            lexer.nextToken()
        )
    }

    @Test
    fun parsesEmptyXmlPrologNode() {
        val lexer = XmlLexer(LexerInputReader("<?xml?>"))

        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 1,
                columnNumber = 1
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.QuestionMark,
                tokenLiteral = "?",
                lineNumber = 1,
                columnNumber = 2
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "xml",
                lineNumber = 1,
                columnNumber = 3
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.QuestionMark,
                tokenLiteral = "?",
                lineNumber = 1,
                columnNumber = 6
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 1,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
    }

    @Test
    fun parsesXmlPrologNodeWithAttributes() {
        val lexer = XmlLexer(LexerInputReader("<?xml version=\"1.0\" encoding=\"utf-8\"?>"))

        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 1,
                columnNumber = 1
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.QuestionMark,
                tokenLiteral = "?",
                lineNumber = 1,
                columnNumber = 2
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "xml",
                lineNumber = 1,
                columnNumber = 3
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "version",
                lineNumber = 1,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Equals,
                tokenLiteral = "=",
                lineNumber = 1,
                columnNumber = 14
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "1.0",
                lineNumber = 1,
                columnNumber = 15
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "encoding",
                lineNumber = 1,
                columnNumber = 21
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Equals,
                tokenLiteral = "=",
                lineNumber = 1,
                columnNumber = 29
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "utf-8",
                lineNumber = 1,
                columnNumber = 30
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.QuestionMark,
                tokenLiteral = "?",
                lineNumber = 1,
                columnNumber = 37
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 1,
                columnNumber = 38
            ),
            lexer.nextToken()
        )
    }

    @Test
    fun parsesEmptyManifestTagWithAttributes() {
        val lexer = XmlLexer(
            LexerInputReader(
                """
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pokemon.pikachu">
</manifest>
        """
            )
        )

        // skip past: <?xml version="1.0" encoding="utf-8"?>
        repeat(11) {
            lexer.nextToken()
        }

        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 3,
                columnNumber = 1
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "manifest",
                lineNumber = 3,
                columnNumber = 2
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "xmlns",
                lineNumber = 4,
                columnNumber = 5
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Colon,
                tokenLiteral = ":",
                lineNumber = 4,
                columnNumber = 10
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "android",
                lineNumber = 4,
                columnNumber = 11
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Equals,
                tokenLiteral = "=",
                lineNumber = 4,
                columnNumber = 18
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "http://schemas.android.com/apk/res/android",
                lineNumber = 4,
                columnNumber = 19
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "package",
                lineNumber = 5,
                columnNumber = 5
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Equals,
                tokenLiteral = "=",
                lineNumber = 5,
                columnNumber = 12
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "com.pokemon.pikachu",
                lineNumber = 5,
                columnNumber = 13
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 5,
                columnNumber = 34
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 6,
                columnNumber = 1
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.ForwardSlash,
                tokenLiteral = "/",
                lineNumber = 6,
                columnNumber = 2
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "manifest",
                lineNumber = 6,
                columnNumber = 3
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 6,
                columnNumber = 11
            ),
            lexer.nextToken()
        )
    }

    @Test
    fun parsesCommentNode() {
        val lexer = XmlLexer(
            LexerInputReader(
                """
<?xml version="1.0" encoding="utf-8"?>
<manifest 
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pokemon.pikachu">
    <!-- This is a comment -->
</manifest>
        """
            )
        )

        // skip past opening tag of manifest
        repeat(22) {
            lexer.nextToken()
        }

        assertEquals(
            Token(
                tokenType = TokenType.CommentLiteral,
                tokenLiteral = " This is a comment ",
                lineNumber = 6,
                columnNumber = 5
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 7,
                columnNumber = 1
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.ForwardSlash,
                tokenLiteral = "/",
                lineNumber = 7,
                columnNumber = 2
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "manifest",
                lineNumber = 7,
                columnNumber = 3
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 7,
                columnNumber = 11
            ),
            lexer.nextToken()
        )
    }

    @Test
    fun reportsError_whenCommentStartIsInvalid() {
        val lexer = XmlLexer(LexerInputReader("<!<<"))

        assertEquals(
            Token(
                tokenType = TokenType.Illegal,
                tokenLiteral = "<",
                lineNumber = 1,
                columnNumber = 3
            ),
            lexer.nextToken()
        )
        assertIterableEquals(
            listOf(
                UnexpectedCharacterLexerError(
                    expectedCh = '-',
                    actualCh = '<',
                    lineNumber = 1,
                    columnNumber = 3
                ),
            ),
            lexer.errors
        )
    }

    @Test
    fun reportsError_whenCommentIsUnclosed() {
        val lexer = XmlLexer(LexerInputReader("<!--"))

        assertEquals(
            Token(
                tokenType = TokenType.Illegal,
                tokenLiteral = "null",
                lineNumber = 1,
                columnNumber = 4
            ),
            lexer.nextToken()
        )
        assertIterableEquals(
            listOf(
                UnclosedCommentLiteralLexerError(
                    lineNumber = 1,
                    columnNumber = 4
                ),
            ),
            lexer.errors
        )
    }

    @Test
    fun readsEscapeSequences() {
        val lexer = XmlLexer(
            LexerInputReader(
                """
<my-tag prop="\n \" \u1234 \t \\">
</my-tag>
        """
            )
        )

        // Skip past: <my-tag prop=
        repeat(4) { lexer.nextToken() }

        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "\n \" \u1234 \t \\",
                lineNumber = 2,
                columnNumber = 14
            ),
            lexer.nextToken()
        )

        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 2,
                columnNumber = 34
            ),
            lexer.nextToken()
        )
    }

    @Test
    fun reportsError_whenUnicodeSequenceIsInvalid() {
        val lexer = XmlLexer(
            LexerInputReader(
                """
<my-tag prop="\n \" \u123x"
"""
            )
        )

        // Skip past: <my-tag prop=
        repeat(4) { lexer.nextToken() }

        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "\n \" x",
                lineNumber = 2,
                columnNumber = 14
            ), lexer.nextToken()
        )
        assertEquals(
            listOf(
                InvalidUnicodeCharacterLexerError(
                    ch = 'x',
                    lineNumber = 2,
                    columnNumber = 25,
                )
            ),
            lexer.errors
        )
    }

    @Test
    fun reportsError_whenEscapeSequenceIsInvalid() {
        val lexer = XmlLexer(
            LexerInputReader(
                """
<my-tag prop="\x"
"""
            )
        )

        // Skip past: <my-tag prop=
        repeat(4) { lexer.nextToken() }

        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "",
                lineNumber = 2,
                columnNumber = 14
            ), lexer.nextToken()
        )
        assertEquals(
            listOf(
                InvalidEscapeCharacterLexerError(
                    ch = 'x',
                    lineNumber = 2,
                    columnNumber = 16,
                )
            ),
            lexer.errors
        )
    }

    @Test
    fun reportsError_whenEscapeSequenceIsUnclosed() {
        val lexer = XmlLexer(
            LexerInputReader(
                """
<my-tag prop="\n \
""".trim()
            )
        )

        // Skip past: <my-tag prop=
        repeat(4) { lexer.nextToken() }

        assertEquals(
            Token(
                tokenType = TokenType.StringLiteral,
                tokenLiteral = "\n ",
                lineNumber = 1,
                columnNumber = 14
            ), lexer.nextToken()
        )
        assertEquals(
            listOf(
                UnclosedEscapeSequenceLexerError(
                    lineNumber = 1,
                    columnNumber = 18,
                ),
                UnclosedStringLiteralLexerError(
                    lineNumber = 1,
                    columnNumber = 18,
                )
            ),
            lexer.errors
        )
    }

    @Test
    fun readsTagName() {
        val lexer = XmlLexer(LexerInputReader("<my-tag"))

        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 1,
                columnNumber = 1
            ), lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "my-tag",
                lineNumber = 1,
                columnNumber = 2
            ), lexer.nextToken()
        )
    }

    @Test
    fun readsNakedTextNode() {
        val lexer = XmlLexer(LexerInputReader("my-text-node"))

        assertEquals(
            Token(
                tokenType = TokenType.TextNode,
                tokenLiteral = "my-text-node",
                lineNumber = 1,
                columnNumber = 1
            ), lexer.nextToken()
        )
    }

    @Test
    fun readsTextNodes_withinXmlTags() {
        val lexer = XmlLexer(
            LexerInputReader(
                """
    <pokemon>
      <name>Pikachu</name>
      <types>electric, god</types>
      <desc>
        Best pokemon ever!!!
      </desc>
    </pokemon>
        """
            )
        )

        // <pokemon>
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 2,
                columnNumber = 5
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "pokemon",
                lineNumber = 2,
                columnNumber = 6
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 2,
                columnNumber = 13
            ),
            lexer.nextToken()
        )

        // <name>Pikachu</name>
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 3,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "name",
                lineNumber = 3,
                columnNumber = 8
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 3,
                columnNumber = 12
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.TextNode,
                tokenLiteral = "Pikachu",
                lineNumber = 3,
                columnNumber = 13
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 3,
                columnNumber = 20
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.ForwardSlash,
                tokenLiteral = "/",
                lineNumber = 3,
                columnNumber = 21
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "name",
                lineNumber = 3,
                columnNumber = 22
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 3,
                columnNumber = 26
            ),
            lexer.nextToken()
        )

        // <types>electric, god</types>
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 4,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "types",
                lineNumber = 4,
                columnNumber = 8
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 4,
                columnNumber = 13
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.TextNode,
                tokenLiteral = "electric, god",
                lineNumber = 4,
                columnNumber = 14
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 4,
                columnNumber = 27
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.ForwardSlash,
                tokenLiteral = "/",
                lineNumber = 4,
                columnNumber = 28
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "types",
                lineNumber = 4,
                columnNumber = 29
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 4,
                columnNumber = 34
            ),
            lexer.nextToken()
        )

        // <desc>
        //    Best pokemon ever!!!
        // </desc>
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 5,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "desc",
                lineNumber = 5,
                columnNumber = 8
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 5,
                columnNumber = 12
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.TextNode,
                tokenLiteral = "Best pokemon ever!!!\n      ",
                lineNumber = 6,
                columnNumber = 9
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 7,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.ForwardSlash,
                tokenLiteral = "/",
                lineNumber = 7,
                columnNumber = 8
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "desc",
                lineNumber = 7,
                columnNumber = 9
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 7,
                columnNumber = 13
            ),
            lexer.nextToken()
        )

        // </pokemon>
        assertEquals(
            Token(
                tokenType = TokenType.LeftAngleBracket,
                tokenLiteral = "<",
                lineNumber = 8,
                columnNumber = 5
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.ForwardSlash,
                tokenLiteral = "/",
                lineNumber = 8,
                columnNumber = 6
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.Identifier,
                tokenLiteral = "pokemon",
                lineNumber = 8,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
        assertEquals(
            Token(
                tokenType = TokenType.RightAngleBracket,
                tokenLiteral = ">",
                lineNumber = 8,
                columnNumber = 14
            ),
            lexer.nextToken()
        )
    }

    @Test
    fun reportsError_whenIllegalCharacterFound() {
        val lexer = XmlLexer(LexerInputReader("<?xml !?>"))

        // skip past: <?xml
        repeat(3) { lexer.nextToken() }

        assertEquals(
            Token(
                tokenType = TokenType.Illegal,
                tokenLiteral = "!",
                lineNumber = 1,
                columnNumber = 7
            ),
            lexer.nextToken()
        )
        assertEquals(
            listOf(
                IllegalCharacterLexerError(
                    ch = '!',
                    lineNumber = 1,
                    columnNumber = 7
                )
            ),
            lexer.errors
        )
    }
}