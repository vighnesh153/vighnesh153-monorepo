package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlProgram
import dev.vighnesh153.xml.formatter.ast.XmlTagNode
import dev.vighnesh153.xml.formatter.lexer.LexerInputReader
import dev.vighnesh153.xml.formatter.lexer.XmlLexer
import dev.vighnesh153.xml.formatter.parser.XmlParser
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class FormatXmlExpressionTest {
    private lateinit var lexer: XmlLexer
    private lateinit var parser: XmlParser
    private lateinit var program: XmlProgram

    @Test
    fun formatsXmlPrologNode() {
        setXml("""<? xml  encoding =   "utf-8"  version =  "2.0"   ?>""")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """<?xml encoding="utf-8" version="2.0"?>""",
            program.statements.first().format(
                indentationLevel = 0,
                indentation = 4,
                sortAttributes = true
            )
        )
    }

    @Test
    fun formatsXmlTagNode() {
        setXml(
            """
           <manifest   simpleProperty = "some random value" deeply :  nested:property = "20" >
                    </ manifest> 
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <manifest
                    simpleProperty="some random value"
                    deeply:nested:property="20" />
            """.trimIndent(),
            program.statements.first().format(
                indentationLevel = 0,
                indentation = 4,
                sortAttributes = true
            )
        )
    }

    @Test
    fun formatsXmlCommentNode() {
        setXml(
            """
           <!--
            
            
            
<uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> 



--> 
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->
            """.trimIndent(),
            program.statements.first().format(
                indentationLevel = 0,
                indentation = 4,
                sortAttributes = true
            )
        )
    }

    @Test
    fun formatsXmlTextNode() {
        setXml("< pokemon  >  Pikachu    < /  pokemon >")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            "Pikachu",
            (program.statements.first() as XmlTagNode).children.first().format(
                indentationLevel = 0,
                indentation = 4,
                sortAttributes = true
            )
        )
    }

    private fun setXml(input: String) {
        lexer = XmlLexer(LexerInputReader(input))
        parser = XmlParser(lexer)
        program = parser.parseProgram()
    }
}