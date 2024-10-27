package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlProgram
import dev.vighnesh153.xml.formatter.ast.XmlTagNode
import dev.vighnesh153.xml.formatter.lexer.LexerInputReader
import dev.vighnesh153.xml.formatter.lexer.XmlLexer
import dev.vighnesh153.xml.formatter.parser.XmlParser
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class FormatXmlTagNodeTest {
    private lateinit var lexer: XmlLexer
    private lateinit var parser: XmlParser
    private lateinit var program: XmlProgram

    @Test
    fun formatsEmptySelfClosingTagNode() {
        setXml("< manifest  /     >")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            "<manifest />",
            (program.statements.first() as XmlTagNode).format(
                indentationLevel = 0,
                indentation = 4,
                shouldSortAttributes = true
            )
        )
    }

    @Test
    fun formatsSelfClosingTagNode_withAttributes() {
        setXml(
            """
            <manifest   simpleAttribute = "some random value" deeply :  nested:attribute = "20" />
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <manifest
                    simpleAttribute="some random value"
                    deeply:nested:attribute="20" />
            """.trimIndent(),
            (program.statements.first() as XmlTagNode).format(
                indentationLevel = 0,
                indentation = 4,
                shouldSortAttributes = true
            )
        )
    }

    @Test
    fun formatsTagNode_withAttributesButNoChildren() {
        setXml(
            """
            <manifest   simpleAttribute = "some random value" deeply :  nested:attribute = "20" >
  </ manifest>
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <manifest
                    simpleAttribute="some random value"
                    deeply:nested:attribute="20" />
            """.trimIndent(),
            (program.statements.first() as XmlTagNode).format(
                indentationLevel = 0,
                indentation = 4,
                shouldSortAttributes = true
            )
        )
    }

    @Test
    fun formatsTagNode_withAttributesAndChildren() {
        setXml(
            """
            <manifest    >
             < childTag  special: forces : commando = "Pikachu"  pokemon= "Hurray" />
              < childTag2    pokemon= "Greninja">
                  <  childTag3  Infernape = "lol" >  </ childTag3>
               </ childTag2>
          </ manifest>
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <manifest>
                    <childTag
                        pokemon="Hurray"
                        special:forces:commando="Pikachu" />
                    <childTag2 pokemon="Greninja">
                        <childTag3 Infernape="lol" />
                    </childTag2>
                </manifest>
            """.trimIndent(),
            (program.statements.first() as XmlTagNode).format(
                indentationLevel = 0,
                indentation = 4,
                shouldSortAttributes = true
            )
        )
    }

    @Test
    fun formatTagNode_sortsAttributesBasedOnAndroidRules() {
        setXml("""
            <manifest  
                qlaAttr="prop18"
                name="prop14"
                blaAttr="prop16"
                xmlns:android="prop1"
                android:bla:id="prop5"
                android:zza:name="prop12"
                android:plz:name="prop11"
                android:poki2:id="prop8"
                android:raster="prop22"
                xmlns:app="prop2"
                android:pae="prop21"
                zools:duckie="prop27"
                plaAttr="prop17"
                tools:hungry="prop26"
                style="prop15"
                android:zzb:name="prop13"
                android:id="prop4"
                android:plu:name="prop10"
                zlaAttr="prop19"
                app:bla="prop24"
                xmlns:tools="prop3"
                android:blb:id="prop6"
                android:name="prop9"
                android:layout="prop20"
                app:pla="prop25"
                android:poki1:id="prop7"
                android:temper="prop23"
             />
        """.trimIndent())

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <manifest
                    xmlns:android="prop1"
                    xmlns:app="prop2"
                    xmlns:tools="prop3"
                    android:id="prop4"
                    android:bla:id="prop5"
                    android:blb:id="prop6"
                    android:poki1:id="prop7"
                    android:poki2:id="prop8"
                    android:name="prop9"
                    android:plu:name="prop10"
                    android:plz:name="prop11"
                    android:zza:name="prop12"
                    android:zzb:name="prop13"
                    name="prop14"
                    style="prop15"
                    blaAttr="prop16"
                    plaAttr="prop17"
                    qlaAttr="prop18"
                    zlaAttr="prop19"
                    android:layout="prop20"
                    android:pae="prop21"
                    android:raster="prop22"
                    android:temper="prop23"
                    app:bla="prop24"
                    app:pla="prop25"
                    tools:hungry="prop26"
                    zools:duckie="prop27" />
            """.trimIndent(),
            (program.statements.first() as XmlTagNode).format(
                indentationLevel = 0,
                indentation = 4,
                shouldSortAttributes = true
            )
        )
    }

    @Test
    fun formatsTagNode_withoutSortingAttrs_ifSortAttributesIsFalse() {
        setXml(
            """
            <manifest    >
             < childTag  special: forces : commando = "Pikachu"  pokemon= "Hurray" />
              < childTag2    pokemon= "Greninja">
                  <  childTag3  Infernape = "lol" >  </ childTag3>
               </ childTag2>
          </ manifest>
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <manifest>
                    <childTag
                        special:forces:commando="Pikachu"
                        pokemon="Hurray" />
                    <childTag2 pokemon="Greninja">
                        <childTag3 Infernape="lol" />
                    </childTag2>
                </manifest>
            """.trimIndent(),
            (program.statements.first() as XmlTagNode).format(
                indentationLevel = 0,
                indentation = 4,
                shouldSortAttributes = false
            )
        )
    }

    private fun setXml(input: String) {
        lexer = XmlLexer(LexerInputReader(input))
        parser = XmlParser(lexer)
        program = parser.parseProgram()
    }
}