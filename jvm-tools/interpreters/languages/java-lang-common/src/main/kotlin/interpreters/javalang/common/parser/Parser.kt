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
    internal val prefixParseFunctions = mutableMapOf<TokenType, PrefixParseFunction>()
    internal val infixParseFunctions = mutableMapOf<TokenType, InfixParseFunction>()
    internal val postfixParseFunctions = mutableMapOf<TokenType, PostfixParseFunction>()

    internal lateinit var currentToken: Token
    internal lateinit var peekToken: Token

    fun isPeekTokenInitialized(): Boolean = this::peekToken.isInitialized

    init {
        nextToken()
        nextToken()
    }

    fun getErrors(): List<InterpreterError> = errors

    fun addError(error: InterpreterError) {
        errors.add(error)
    }
}

internal fun Parser.parseProgram(): ProgramNode {
    val programNode = ProgramNode()

    while (isCurrentToken(TokenType.EOF).not()) {
        val statement = parseStatement()
        if (statement != null) {
            programNode.addStatement(statement)
        }
        nextToken()
    }

    return programNode
}

internal fun Parser.parseStatement(): StatementNode? {
    return when (currentToken.tokenType) {
        TokenType.PACKAGE_KEYWORD -> parsePackageStatement()
        TokenType.IMPORT_KEYWORD -> parseImportStatement()
        else -> throw Error("Not implemented")
    }
}
