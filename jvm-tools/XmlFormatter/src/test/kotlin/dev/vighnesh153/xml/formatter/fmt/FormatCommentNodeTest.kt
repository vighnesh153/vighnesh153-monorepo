package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlCommentNode
import dev.vighnesh153.xml.formatter.lexer.LexerInputReader
import dev.vighnesh153.xml.formatter.lexer.XmlLexer
import dev.vighnesh153.xml.formatter.parser.XmlParser
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class FormatCommentNodeTest {
    private val lexerInputReader =
        LexerInputReader(
            input = """
            <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->
        """.trimIndent()
        )
    private val lexer = XmlLexer(lexerInputReader)
    private val parser = XmlParser(lexer)
    private val program = parser.parseProgram()

    @Test
    fun formatsWithZeroIndentation() {
        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->""",
            (program.statements.first() as XmlCommentNode).format(
                indentationLevel = 0,
                indentation = 4,
            )
        )
    }

    @Test
    fun formatsWithTwoIndentationLevel() {
        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """        <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->""",
            (program.statements.first() as XmlCommentNode).format(
                indentationLevel = 2,
                indentation = 4,
            )
        )
    }

    @Test
    fun formatsWithTwoIndentationLevelAndThreeIndentation() {
        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """      <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->""",
            (program.statements.first() as XmlCommentNode).format(
                indentationLevel = 2,
                indentation = 3,
            )
        )
    }
}