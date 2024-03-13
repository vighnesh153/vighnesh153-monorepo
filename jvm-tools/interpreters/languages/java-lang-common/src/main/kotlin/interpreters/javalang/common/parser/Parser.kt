package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.*
import interpreters.javalang.common.errors.InterpreterError
import interpreters.javalang.common.lexer.Lexer
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType


class Parser(
    internal val lexer: Lexer,
    private val errors: MutableList<InterpreterError>
) {
    internal val prefixParseFunctions: Map<TokenType, PrefixParseFunction>
    internal val infixParseFunctions: Map<TokenType, InfixParseFunction>
    internal val postfixParseFunctions: Map<TokenType, PostfixParseFunction>

    internal lateinit var currentToken: Token
    internal lateinit var peekToken: Token

    fun isPeekTokenInitialized(): Boolean = this::peekToken.isInitialized

    init {
        prefixParseFunctions = mutableMapOf(
            // identifier
            TokenType.IDENTIFIER to PrefixParseFunction { parseIdentifier() },

            // literals
            TokenType.INTEGER_LITERAL to PrefixParseFunction { parseIntegerLiteral() },
            TokenType.FLOAT_LITERAL to PrefixParseFunction { parseFloatLiteral() },
            TokenType.LONG_LITERAL to PrefixParseFunction { parseLongLiteral() },
            TokenType.DOUBLE_LITERAL to PrefixParseFunction { parseDoubleLiteral() },
            TokenType.STRING_LITERAL to PrefixParseFunction { parseStringLiteral() },
            TokenType.CHARACTER_LITERAL to PrefixParseFunction { parseCharacterLiteral() },
            TokenType.TRUE_KEYWORD to PrefixParseFunction { parseBooleanLiteral() },
            TokenType.FALSE_KEYWORD to PrefixParseFunction { parseBooleanLiteral() },

            // operators
            TokenType.INCREMENT to PrefixParseFunction { parsePrefixExpression() },
            TokenType.DECREMENT to PrefixParseFunction { parsePrefixExpression() },
            TokenType.BANG to PrefixParseFunction { parsePrefixExpression() },
            TokenType.MINUS to PrefixParseFunction { parsePrefixExpression() },
        )
        infixParseFunctions = mutableMapOf(
            // operators
            TokenType.PLUS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.MINUS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.ASTERISK to InfixParseFunction { parseInfixExpression(it) },
            TokenType.FORWARD_SLASH to InfixParseFunction { parseInfixExpression(it) },
            TokenType.CARET to InfixParseFunction { parseInfixExpression(it) },
            TokenType.AMPERSAND to InfixParseFunction { parseInfixExpression(it) },
            TokenType.VERTICAL_BAR to InfixParseFunction { parseInfixExpression(it) },
            TokenType.DOUBLE_AMPERSAND to InfixParseFunction { parseInfixExpression(it) },
            TokenType.DOUBLE_VERTICAL_BAR to InfixParseFunction { parseInfixExpression(it) },
            TokenType.LEFT_ANGLE_BRACKET to InfixParseFunction { parseInfixExpression(it) },
            TokenType.RIGHT_ANGLE_BRACKET to InfixParseFunction { parseInfixExpression(it) },
            TokenType.LEFT_ANGLE_BRACKET_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.RIGHT_ANGLE_BRACKET_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.PLUS_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.MINUS_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.ASTERISK_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.FORWARD_SLASH_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.MODULUS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.MODULUS_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.CARET_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.DOUBLE_EQUALS to InfixParseFunction { parseInfixExpression(it) },
            TokenType.BANG_EQUALS to InfixParseFunction { parseInfixExpression(it) },
        )
        postfixParseFunctions = mutableMapOf(
            // operators
            TokenType.INCREMENT to PostfixParseFunction { parsePostfixExpression(it) },
            TokenType.DECREMENT to PostfixParseFunction { parsePostfixExpression(it) },
        )

        nextToken()
        nextToken()
    }

    fun getErrors(): List<InterpreterError> = errors

    fun addError(error: InterpreterError) {
        errors.add(error)
    }
}

internal fun Parser.parseStatement(): StatementNode? {
    return when (currentToken.tokenType) {
        TokenType.PACKAGE_KEYWORD -> parsePackageStatement()
        TokenType.IMPORT_KEYWORD -> parseImportStatement()
        else -> parseExpressionStatement()
    }
}
