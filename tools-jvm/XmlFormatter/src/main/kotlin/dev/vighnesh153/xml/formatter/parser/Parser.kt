package dev.vighnesh153.xml.formatter.parser

import dev.vighnesh153.xml.formatter.ast.XmlCommentNode
import dev.vighnesh153.xml.formatter.ast.XmlElementAttribute
import dev.vighnesh153.xml.formatter.ast.XmlExpression
import dev.vighnesh153.xml.formatter.ast.XmlProgram
import dev.vighnesh153.xml.formatter.ast.XmlPrologNode
import dev.vighnesh153.xml.formatter.ast.XmlTagNode
import dev.vighnesh153.xml.formatter.ast.XmlTextNode
import dev.vighnesh153.xml.formatter.lexer.Token
import dev.vighnesh153.xml.formatter.lexer.TokenType
import dev.vighnesh153.xml.formatter.lexer.XmlLexer
import dev.vighnesh153.xml.formatter.lexer.nextToken

class XmlParser(private val lexer: XmlLexer) {
    private val mutableErrors = mutableListOf<ParserError>()
    val errors: List<ParserError>
        get() = mutableErrors.toList()

    private lateinit var currToken: Token
    private var peekToken: Token = lexer.nextToken()

    init {
        nextToken()
    }

    fun parseProgram(): XmlProgram {
        val program = XmlProgram()

        while (!isCurrToken(TokenType.Eof)) {
            val statement = parseStatement() ?: break
            program.addStatement(statement)
            nextToken()
        }

        return program
    }

    private fun nextToken() {
        currToken = peekToken
        peekToken = lexer.nextToken()
    }

    private fun isCurrToken(tokenType: TokenType): Boolean = currToken.tokenType == tokenType
    private fun isPeekToken(tokenType: TokenType): Boolean = peekToken.tokenType == tokenType

    private fun addError(err: ParserError) {
        mutableErrors.add(err)
    }

    private fun parseStatement(): XmlExpression? {
        if (isCurrToken(TokenType.LeftAngleBracket)) {
            if (isPeekToken(TokenType.QuestionMark)) {
                return parseXmlPrologNode()
            }
            if (isPeekToken(TokenType.Identifier)) {
                return parseXmlTagNode()
            }
            addError(
                UnexpectedTokenParserError(
                    peekToken,
                    expectedTokenTypes = listOf(
                        TokenType.QuestionMark,
                        TokenType.Identifier
                    )
                )
            )
            return null
        }
        if (isCurrToken(TokenType.CommentLiteral)) {
            return parseXmlCommentNode()
        }
        if (isCurrToken(TokenType.TextNode)) {
            return parseXmlTextNode()
        }
        addError(
            UnexpectedTokenParserError(
                currToken,
                expectedTokenTypes = listOf(
                    TokenType.LeftAngleBracket,
                    TokenType.CommentLiteral,
                    TokenType.TextNode
                )
            )
        )
        return null
    }

    private fun parseXmlPrologNode(): XmlPrologNode? {
        assert(isCurrToken(TokenType.LeftAngleBracket)) {
            "Attempting to read a prolog node when it doesn't start with '<'"
        }

        // move past "<"
        nextToken()

        assert(isCurrToken(TokenType.QuestionMark)) {
            "Attempting to read a prolog node when it doesn't start with '<?'"
        }

        if (!expectPeek(TokenType.Identifier)) {
            return null
        }

        if (currToken.tokenLiteral != "xml") {
            addError(UnexpectedPrologTagParserError(currToken))
            return null
        }

        nextToken()

        val xmlPrologNode = XmlPrologNode()

        while (true) {
            if (isCurrToken(TokenType.Eof)) {
                addError(UnexpectedEofParserError(currToken))
                return null
            }

            if (isCurrToken(TokenType.QuestionMark)) {
                if (!expectPeek(TokenType.RightAngleBracket)) {
                    return null
                }
                return xmlPrologNode
            }

            val attr = parseAttribute() ?: return null
            xmlPrologNode.addAttribute(attr)

            nextToken()
        }
    }

    private fun parseXmlTagNode(): XmlTagNode? {
        assert(isCurrToken(TokenType.LeftAngleBracket)) {
            "Attempting to read a xml tag node when it doesn't start with '<'"
        }

        nextToken()

        assert(isCurrToken(TokenType.Identifier)) {
            "Attempting to read a xml tag node when it doesn't start with '<' followed by identifier"
        }

        val xmlTagNode = XmlTagNode()
        xmlTagNode.addNamespace(currToken)
        nextToken()

        while (isCurrToken(TokenType.Colon)) {
            if (!expectPeek(TokenType.Identifier)) {
                return null
            }
            xmlTagNode.addNamespace(currToken)
            nextToken()
        }

        while (true) {
            if (isCurrToken(TokenType.Eof)) {
                addError(UnexpectedEofParserError(currToken))
                return null
            }
            if (isCurrToken(TokenType.ForwardSlash)) {
                break
            }
            if (isCurrToken(TokenType.RightAngleBracket)) {
                break
            }

            val attribute = parseAttribute() ?: return null
            xmlTagNode.addAttribute(attribute)
            nextToken()
        }

        if (isCurrToken(TokenType.ForwardSlash)) {
            if (!expectPeek(TokenType.RightAngleBracket)) {
                return null
            }
            return xmlTagNode
        }

        assert(isCurrToken(TokenType.RightAngleBracket)) {
            "Expected '>' found ${currToken.tokenLiteral}"
        }

        // move past ">"
        nextToken()

        // parse children
        while (true) {
            if (isPeekToken(TokenType.Eof)) {
                addError(UnexpectedEofParserError(peekToken))
                return null
            }

            if (isCurrToken(TokenType.LeftAngleBracket) && isPeekToken(TokenType.ForwardSlash)) {
                break
            }

            val stmt = parseStatement() ?: return null
            xmlTagNode.addChild(stmt)
            nextToken()
        }

        assert(isCurrToken(TokenType.LeftAngleBracket)) {
            "Expected '<' found ${currToken.tokenLiteral}"
        }

        // move past "<"
        nextToken()

        if (!expectPeek(TokenType.Identifier)) {
            return null
        }

        val closingTagNamespaces = mutableListOf(currToken)
        nextToken()

        while (isCurrToken(TokenType.Colon)) {
            if (!expectPeek(TokenType.Identifier)) {
                return null
            }
            closingTagNamespaces.add(currToken)
            nextToken()
        }

        val openingTag = xmlTagNode.namespaces.joinToString(":") { it.tokenLiteral }
        val closingTag = closingTagNamespaces.joinToString(":") { it.tokenLiteral }
        if (closingTag != openingTag) {
            addError(
                UnexpectedClosingTagLiteralParserError(
                    closingTagNamespaces[0].copy(
                        tokenLiteral = closingTag
                    )
                )
            )
            return null
        }

        if (!isCurrToken(TokenType.RightAngleBracket)) {
            addError(
                UnexpectedTokenParserError(
                    currToken,
                    expectedTokenTypes = listOf(TokenType.RightAngleBracket)
                )
            )
            return null
        }

        return xmlTagNode
    }

    private fun parseAttribute(): XmlElementAttribute? {
        if (!isCurrToken(TokenType.Identifier)) {
            addError(
                UnexpectedTokenParserError(
                    currToken,
                    expectedTokenTypes = listOf(TokenType.Identifier)
                )
            )
            return null
        }

        val namespaces = mutableListOf(currToken)

        while (true) {
            if (isPeekToken(TokenType.Eof)) {
                addError(UnexpectedEofParserError(peekToken))
                return null
            }
            if (isPeekToken(TokenType.Equals)) {
                break
            }

            if (!expectPeek(
                    TokenType.Colon,
                    expectedTokenTypes = listOf(TokenType.Equals, TokenType.Colon)
                )
            ) {
                return null
            }
            if (!expectPeek(TokenType.Identifier)) {
                return null
            }
            namespaces.add(currToken)
        }

        assert(isPeekToken(TokenType.Equals)) {
            "Expected '=' found ${peekToken.tokenLiteral}"
        }

        // we know next token is equals. move to that
        nextToken()

        if (!expectPeek(TokenType.StringLiteral)) {
            return null
        }

        return XmlElementAttribute(namespaces, value = currToken)
    }

    private fun parseXmlCommentNode(): XmlCommentNode {
        assert(isCurrToken(TokenType.CommentLiteral)) {
            "Expected comment found '${currToken.tokenLiteral}'"
        }

        return XmlCommentNode(currToken)
    }

    private fun parseXmlTextNode(): XmlTextNode {
        assert(isCurrToken(TokenType.TextNode)) {
            "Expected text node found '${currToken.tokenLiteral}'"
        }

        return XmlTextNode(currToken)
    }

    private fun expectPeek(
        tokenType: TokenType,
        expectedTokenTypes: List<TokenType> = listOf(tokenType),
    ): Boolean {
        if (isPeekToken(tokenType)) {
            nextToken()
            return true
        }
        addError(UnexpectedTokenParserError(peekToken, expectedTokenTypes = expectedTokenTypes))
        return false
    }
}
