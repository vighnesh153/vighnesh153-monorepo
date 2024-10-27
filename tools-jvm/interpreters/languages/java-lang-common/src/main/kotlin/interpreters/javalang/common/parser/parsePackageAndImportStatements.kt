package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ImportStatement
import interpreters.javalang.common.ast.PackageStatement
import interpreters.javalang.common.ast.StatementNode
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType

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
