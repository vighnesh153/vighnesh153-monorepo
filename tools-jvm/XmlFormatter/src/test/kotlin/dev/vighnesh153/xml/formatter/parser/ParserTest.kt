package dev.vighnesh153.xml.formatter.parser

import dev.vighnesh153.xml.formatter.ast.XmlProgram
import dev.vighnesh153.xml.formatter.lexer.LexerInputReader
import dev.vighnesh153.xml.formatter.lexer.Token
import dev.vighnesh153.xml.formatter.lexer.TokenType
import dev.vighnesh153.xml.formatter.lexer.XmlLexer
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Test

class ParserTest {
    private lateinit var lexer: XmlLexer
    private lateinit var parser: XmlParser
    private lateinit var program: XmlProgram

    @Test
    fun xmlParser_parsesEmptyXmlInput() {
        setXml("")

        assertEquals(0, parser.errors.size)
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_parsesXmlPrologTag_withoutAttributes() {
        setXml("< ? xml ? >")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals("<?xml?>", program.toString(0))
    }

    @Test
    fun xmlParser_parsesXmlPrologTag_withAttributes() {
        setXml(
            """
            < ? xml version  =  "1.0" encoding ="UTF-8" ? >
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
                <?xml version="1.0" encoding="UTF-8"?>
            """.trim(), program.toString(0)
        )
    }

    @Test
    fun xmlParser_parsesXmlTag_whenSelfClosing() {
        setXml("< manifest / >")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals("<manifest />", program.toString(0))
    }

    @Test
    fun xmlParser_parsesXmlTag_whenEmpty() {
        setXml("< manifest > < /   manifest>")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals("<manifest />", program.toString(0))
    }

    @Test
    fun xmlParser_parsesXmlTag_withSingleAttributeHavingNoNamespace() {
        setXml("""< manifest package= "com.pokemon.pikachu" / >""")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals("""<manifest package="com.pokemon.pikachu" />""", program.toString(0))
    }

    @Test
    fun xmlParser_parsesXmlTag_withMultipleAttributesHavingNoNamespace() {
        setXml("""< manifest package= "com.pokemon.pikachu" attr2  =   "2.0" / >""")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
            <manifest
                package="com.pokemon.pikachu"
                attr2="2.0" />
            """.trimIndent(), program.toString(0)
        )
    }

    @Test
    fun xmlParser_parsesXmlTag_withNamespaces() {
        setXml("""< namespace1 : namespace2 : namespace3 > </ namespace1 : namespace2 : namespace3>""")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals("<namespace1:namespace2:namespace3 />", program.toString(0))
    }

    @Test
    fun xmlParser_parsesNakedXmlTextNode() {
        setXml("pikachu")

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals("pikachu", program.toString(0))
    }

    @Test
    fun xmlParser_parsesXmlTag_withMultipleAttributesHavingNamespaces() {
        setXml(
            """
            <uses-feature      android :    name   =    
    
                "android.hardware.touchscreen" 
                
                android
                
                :
                
                required      =
                "false" />
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
            <uses-feature
                android:name="android.hardware.touchscreen"
                android:required="false" />
        """.trimIndent(), program.toString(0)
        )
    }

    @Test
    fun xmlParser_parsesXmlTag_withChildren() {
        setXml(
            """
    <?xml 
    
    
    
    
    version="1.0" encoding="utf-8" ?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.pokemon.charizard">
        <uses-feature android:name="android.hardware.touchscreen" android:required="false" />
        <!-- 
        
        
        
        <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> 
        
        
        -->

        <application
            android:allowBackup="true"
            android:label="Pikachu"
            android:supportsRtl="true"
                        >
            <receiver
                android:name=".MyReceiver"
                android:enabled="true"
                android:exported="true">
                <intent-filter>
                    <action android:name="SOME_INTENT_FILTER_1" />
                    <action android:name="SOME_INTENT_FILTER_2" 
                    />
                </intent-filter>
            </receiver>

            <activity
                android:name=".MainActivity"
                 android:exported="true"
                android:launchMode=
                "singleTask"
                >
                <intent-filter>
                    <
                    action 
                    android:name="android.intent.action.MAIN" />
                    <category 
                    android
                    :name="android.intent.category.LAUNCHER" />
                </intent-filter>

                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
                </intent-filter>
                
            </ activity  >
      </ application >
    </  manifest  >

        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(2, program.statements.size)
        assertEquals(
            """
            <?xml version="1.0" encoding="utf-8"?>
            <manifest
                xmlns:android="http://schemas.android.com/apk/res/android"
                package="com.pokemon.charizard">
                <uses-feature
                    android:name="android.hardware.touchscreen"
                    android:required="false" />
                <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->
                <application
                    android:allowBackup="true"
                    android:label="Pikachu"
                    android:supportsRtl="true">
                    <receiver
                        android:name=".MyReceiver"
                        android:enabled="true"
                        android:exported="true">
                        <intent-filter>
                            <action android:name="SOME_INTENT_FILTER_1" />
                            <action android:name="SOME_INTENT_FILTER_2" />
                        </intent-filter>
                    </receiver>
                    <activity
                        android:name=".MainActivity"
                        android:exported="true"
                        android:launchMode="singleTask">
                        <intent-filter>
                            <action android:name="android.intent.action.MAIN" />
                            <category android:name="android.intent.category.LAUNCHER" />
                        </intent-filter>
                        <intent-filter>
                            <action android:name="android.intent.action.MAIN" />
                            <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
                        </intent-filter>
                    </activity>
                </application>
            </manifest>
        """.trimIndent(), program.toString(0)
        )
    }

    @Test
    fun xmlParser_parsesXmlTag_withTextNodeChildrenAndAttributes() {
        setXml(
            """
    <    pokemon >
      <name
    >
      Pikachu<
    /
    
    name
>
      <
types    comma-separated   =  "true"    >    
      electric, god<  /
      types>
      <
      desc
      >
        
  Best pokemon ever!!!
      
                      </
                  desc    ><
                      /pokemon
                      >
        """
        )

        assertEquals(0, parser.errors.size)
        assertEquals(1, program.statements.size)
        assertEquals(
            """
            <pokemon>
                <name>Pikachu</name>
                <types comma-separated="true">electric, god</types>
                <desc>Best pokemon ever!!!</desc>
            </pokemon>
        """.trimIndent(), program.toString(0)
        )
    }

    @Test
    fun xmlParser_throwsError_whenUnexpectedToken() {
        setXml("?")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.QuestionMark,
                        tokenLiteral = "?",
                        lineNumber = 1,
                        columnNumber = 1
                    ),
                    expectedTokenTypes = listOf(
                        TokenType.LeftAngleBracket,
                        TokenType.CommentLiteral,
                        TokenType.TextNode
                    )
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenEofWhileReadingAttributes() {
        setXml("< manifest fruit")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedEofParserError(
                    Token(
                        tokenType = TokenType.Eof,
                        tokenLiteral = "eof",
                        lineNumber = 1,
                        columnNumber = 16,
                    ),
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenAttributeExprDoesNotHaveEqualsSignAndValue() {
        setXml("""< manifest pokemon fruit="orange" / >""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.Identifier,
                        tokenLiteral = "fruit",
                        lineNumber = 1,
                        columnNumber = 20
                    ),
                    expectedTokenTypes = listOf(TokenType.Equals, TokenType.Colon)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenNoIdentifierInAttributeAfterColon() {
        setXml("""< manifest fruit:="orange" / >""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.Equals,
                        tokenLiteral = "=",
                        lineNumber = 1,
                        columnNumber = 18
                    ),
                    expectedTokenTypes = listOf(TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenNoStringLiteralInAttributeAfterEqualsSign() {
        setXml("""< manifest fruit= fruit="orange" / >""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.Identifier,
                        tokenLiteral = "fruit",
                        lineNumber = 1,
                        columnNumber = 19
                    ),
                    expectedTokenTypes = listOf(TokenType.StringLiteral)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenIdentifierAfterEqualsSignInAttribute() {
        setXml("""< manifest fruit= orange / >""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.Identifier,
                        tokenLiteral = "orange",
                        lineNumber = 1,
                        columnNumber = 19
                    ),
                    expectedTokenTypes = listOf(TokenType.StringLiteral)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlPrologParser_throwsError_whenIdentifierAfterEqualsSignInAttribute() {
        setXml("<? xml fruit= orange ?>")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.Identifier,
                        tokenLiteral = "orange",
                        lineNumber = 1,
                        columnNumber = 15
                    ),
                    expectedTokenTypes = listOf(TokenType.StringLiteral)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlPrologParser_throwsError_whenUnexpectedEof() {
        setXml("<? xml  ")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedEofParserError(
                    Token(
                        tokenType = TokenType.Eof,
                        tokenLiteral = "eof",
                        lineNumber = 1,
                        columnNumber = 8
                    ),
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenUnexpectedEof() {
        setXml("< manifest  ")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedEofParserError(
                    Token(
                        tokenType = TokenType.Eof,
                        tokenLiteral = "eof",
                        lineNumber = 1,
                        columnNumber = 12
                    ),
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlPrologParser_throwsError_whenUnexpectedTokenWhileClosing() {
        setXml("<? xml  ? <")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.LeftAngleBracket,
                        tokenLiteral = "<",
                        lineNumber = 1,
                        columnNumber = 11
                    ),
                    expectedTokenTypes = listOf(TokenType.RightAngleBracket)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenUnexpectedTokenWhileClosing() {
        setXml("< manifest  / <")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.LeftAngleBracket,
                        tokenLiteral = "<",
                        lineNumber = 1,
                        columnNumber = 15
                    ),
                    expectedTokenTypes = listOf(TokenType.RightAngleBracket)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlPrologParser_throwsError_whenNoTagName() {
        setXml("<? ?>")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.QuestionMark,
                        tokenLiteral = "?",
                        lineNumber = 1,
                        columnNumber = 4
                    ),
                    expectedTokenTypes = listOf(TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlPrologParser_throwsError_whenTagNameIsNotXml() {
        setXml("<? manifest  ?>")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedPrologTagParserError(
                    Token(
                        tokenType = TokenType.Identifier,
                        tokenLiteral = "manifest",
                        lineNumber = 1,
                        columnNumber = 4
                    ),
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenUnclosedOpeningTag() {
        setXml("< manifest >")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedEofParserError(
                    Token(
                        tokenType = TokenType.Eof,
                        tokenLiteral = "eof",
                        lineNumber = 1,
                        columnNumber = 12
                    ),
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenChildTagHasIncorrectClosingToken() {
        setXml("< manifest > <child-tag /< </manifest>")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.LeftAngleBracket,
                        tokenLiteral = "<",
                        lineNumber = 1,
                        columnNumber = 26
                    ),
                    expectedTokenTypes = listOf(TokenType.RightAngleBracket)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenQuestionMarkInClosingTag() {
        setXml("< manifest > </ ?")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.QuestionMark,
                        tokenLiteral = "?",
                        lineNumber = 1,
                        columnNumber = 17
                    ),
                    expectedTokenTypes = listOf(TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenOpeningAndClosingTagDoNotMatch() {
        setXml("< manifest > </ pokemon>")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedClosingTagLiteralParserError(
                    Token(
                        tokenType = TokenType.Identifier,
                        tokenLiteral = "pokemon",
                        lineNumber = 1,
                        columnNumber = 17
                    ),
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_tagNameWithNamespaces_throwsError_whenOpeningAndClosingTagDoNotMatch() {
        setXml("< ns1 : ns2  > </ ns3 :  ns4>")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedClosingTagLiteralParserError(
                    Token(
                        tokenType = TokenType.Identifier,
                        tokenLiteral = "ns3:ns4",
                        lineNumber = 1,
                        columnNumber = 19
                    ),
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_whenAttributeHasNoName() {
        setXml("""< manifest ="com.pokemon.pikachu" / >""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.Equals,
                        tokenLiteral = "=",
                        lineNumber = 1,
                        columnNumber = 12
                    ),
                    expectedTokenTypes = listOf(TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_ifLeftAngleBracketInsteadOfRightAngleBracket() {
        setXml("""< tag > </ tag <""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.LeftAngleBracket,
                        tokenLiteral = "<",
                        lineNumber = 1,
                        columnNumber = 16
                    ),
                    expectedTokenTypes = listOf(TokenType.RightAngleBracket)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_ifNamelessOpeningTag() {
        setXml("""< >""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.RightAngleBracket,
                        tokenLiteral = ">",
                        lineNumber = 1,
                        columnNumber = 3
                    ),
                    expectedTokenTypes = listOf(TokenType.QuestionMark, TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_ifNamelessSelfClosingTag() {
        setXml("""< />""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.ForwardSlash,
                        tokenLiteral = "/",
                        lineNumber = 1,
                        columnNumber = 3
                    ),
                    expectedTokenTypes = listOf(TokenType.QuestionMark, TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_tagNameNamespacesAreIncompleteInOpeningTag() {
        setXml("""< ns1 : ns2 :  /> """)

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.ForwardSlash,
                        tokenLiteral = "/",
                        lineNumber = 1,
                        columnNumber = 16
                    ),
                    expectedTokenTypes = listOf(TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    @Test
    fun xmlParser_throwsError_tagNameNamespacesAreIncompleteInClosingTag() {
        setXml("""< ns1 : ns2  > </ ns1 : ns2: >""")

        assertEquals(1, parser.errors.size)
        assertIterableEquals(
            listOf(
                UnexpectedTokenParserError(
                    Token(
                        tokenType = TokenType.RightAngleBracket,
                        tokenLiteral = ">",
                        lineNumber = 1,
                        columnNumber = 30
                    ),
                    expectedTokenTypes = listOf(TokenType.Identifier)
                )
            ),
            parser.errors
        )
        assertEquals(0, program.statements.size)
    }

    private fun setXml(input: String) {
        lexer = XmlLexer(LexerInputReader(input))
        parser = XmlParser(lexer)
        program = parser.parseProgram()
    }
}