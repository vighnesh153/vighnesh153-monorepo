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

internal fun Parser.parsePackageStatement(): StatementNode? {
    val dotSeparatedIdentifiers = mutableListOf<Token>()
    val importStatement = PackageStatement(
        token = currentToken,
        dotSeparatedIdentifiers = dotSeparatedIdentifiers
    )

    if (parseDotSeparatedIdentifiers(dotSeparatedIdentifiers).not()) {
        return null
    }

    return importStatement
}

internal fun Parser.parseImportStatement(): StatementNode? {
    val dotSeparatedIdentifiers = mutableListOf<Token>()

    val isStaticImport = isPeekToken(TokenType.STATIC_KEYWORD)
    val packageStatement = ImportStatement(
        token = currentToken,
        dotSeparatedIdentifiers = dotSeparatedIdentifiers,
        isStaticImport = isStaticImport,
    )

    if (isStaticImport) {
        nextToken()
    }

    if (parseDotSeparatedIdentifiers(dotSeparatedIdentifiers).not()) {
        return null
    }

    return packageStatement
}

internal fun Parser.parseDotSeparatedIdentifiers(
    dotSeparatedIdentifiers: MutableList<Token>
): Boolean {
    if (expectPeek(TokenType.IDENTIFIER).not()) {
        return false
    }

    dotSeparatedIdentifiers.add(currentToken)

    while (isPeekToken(TokenType.SEMICOLON).not() && isPeekToken(TokenType.EOF).not()) {
        if (expectPeek(TokenType.DOT).not()) {
            return false
        }
        if (expectPeek(TokenType.IDENTIFIER).not()) {
            return false
        }
        dotSeparatedIdentifiers.add(currentToken)
    }

    if (expectPeek(TokenType.SEMICOLON).not()) {
        return false
    }

    return true
}

internal fun Parser.isCurrentToken(tokenType: TokenType): Boolean {
    return currentToken.tokenType == tokenType
}

internal fun Parser.isPeekToken(tokenType: TokenType): Boolean {
    return peekToken.tokenType == tokenType
}

internal fun Parser.expectPeek(tokenType: TokenType): Boolean {
    if (isPeekToken(tokenType)) {
        nextToken()
        return true
    }
    createUnexpectedPeekError(
        expectedTokenType = tokenType,
        actualToken = peekToken
    )
    return false
}
