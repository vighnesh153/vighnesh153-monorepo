package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlPrologNode
import dev.vighnesh153.xml.formatter.lexer.LexerInputReader
import dev.vighnesh153.xml.formatter.lexer.XmlLexer
import dev.vighnesh153.xml.formatter.parser.XmlParser
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class FormatXmlPrologNodeTest {
    private val lexerInputReader =
        LexerInputReader(
            input = """
                <? xml  encoding =   "utf-8"  version =  "2.0"   ?>
            """
        )
    private val lexer = XmlLexer(lexerInputReader)
    private val parser = XmlParser(lexer)
    private val program = parser.parseProgram()

    @Test
    fun formatsWithZeroIndentation() {
        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            "<?xml encoding=\"utf-8\" version=\"2.0\"?>",
            (program.statements.first() as XmlPrologNode).format(
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
            "        <?xml encoding=\"utf-8\" version=\"2.0\"?>",
            (program.statements.first() as XmlPrologNode).format(
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
            "      <?xml encoding=\"utf-8\" version=\"2.0\"?>",
            (program.statements.first() as XmlPrologNode).format(
                indentationLevel = 2,
                indentation = 3,
            )
        )
    }
}