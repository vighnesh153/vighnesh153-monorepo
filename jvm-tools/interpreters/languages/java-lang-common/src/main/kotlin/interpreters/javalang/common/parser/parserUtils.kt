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
