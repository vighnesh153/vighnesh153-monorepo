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
            TokenType.INTEGER_LITERAL to PrefixParseFunction { parseIntegerLiteral() },
            TokenType.FLOAT_LITERAL to PrefixParseFunction { parseFloatLiteral() },
            TokenType.LONG_LITERAL to PrefixParseFunction { parseLongLiteral() },
            TokenType.DOUBLE_LITERAL to PrefixParseFunction { parseDoubleLiteral() },
            TokenType.STRING_LITERAL to PrefixParseFunction { parseStringLiteral() },
        )
        infixParseFunctions = mutableMapOf()
        postfixParseFunctions = mutableMapOf()

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
