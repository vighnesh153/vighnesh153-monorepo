package dev.vighnesh153.xml.formatter.fmt

import dev.vighnesh153.xml.formatter.ast.XmlElementAttribute
import dev.vighnesh153.xml.formatter.lexer.Token
import dev.vighnesh153.xml.formatter.lexer.TokenType
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class FormatXmlElementAttributeTest {
    @Test
    fun formatsWithSingleNamespace() {
        val xmlElementAttribute = XmlElementAttribute(
            namespaces = listOf(
                createToken(TokenType.Identifier, "pokemon"),
            ),
            value = createToken(TokenType.StringLiteral, "pikachu")
        )

        assertEquals(
            """
                pokemon="pikachu"
            """.trim(),
            xmlElementAttribute.format()
        )
    }

    @Test
    fun formatsWithMultipleNamespaces() {
        val xmlElementAttribute = XmlElementAttribute(
            namespaces = listOf(
                createToken(TokenType.Identifier, "pokemon"),
                createToken(TokenType.Identifier, "electric"),
                createToken(TokenType.Identifier, "yellow"),
            ),
            value = createToken(TokenType.StringLiteral, "pikachu")
        )

        assertEquals(
            """
                pokemon:electric:yellow="pikachu"
            """.trim(),
            xmlElementAttribute.format()
        )
    }

    private fun createToken(tokenType: TokenType, tokenLiteral: String) = Token(
        tokenType = tokenType,
        tokenLiteral = tokenLiteral,
        lineNumber = 1,
        columnNumber = 1,
    )
}