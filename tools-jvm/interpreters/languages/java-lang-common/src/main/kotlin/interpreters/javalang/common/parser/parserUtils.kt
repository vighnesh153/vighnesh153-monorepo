package interpreters.javalang.common.parser

import interpreters.javalang.common.tokens.TokenType

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

internal fun Parser.currentPrecedence(): Precedence {
    return precedences.getOrDefault(currentToken.tokenType, Precedence.Lowest)
}

internal fun Parser.peekPrecedence(): Precedence {
    return precedences.getOrDefault(peekToken.tokenType, Precedence.Lowest)
}
