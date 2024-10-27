package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.ExpressionStatement
import interpreters.javalang.common.ast.StatementNode
import interpreters.javalang.common.tokens.TokenType

internal fun Parser.parseExpressionStatement(): StatementNode {
    return ExpressionStatement(
        token = currentToken,
        expression = parseExpression(Precedence.Lowest),
    )
}

internal fun Parser.parseExpression(precedence: Precedence): ExpressionNode? {
    val prefixParseFunction = prefixParseFunctions[currentToken.tokenType]
    if (prefixParseFunction == null) {
        createNoPrefixParseFunctionFoundError(currentToken)
        return null
    }

    var leftExpression: ExpressionNode? = prefixParseFunction.invoke() ?: return null

    if (postfixParseFunctions.containsKey(peekToken.tokenType)) {
        nextToken()

        val postfixParseFunction = postfixParseFunctions[currentToken.tokenType]
        leftExpression = postfixParseFunction?.invoke(leftExpression)
    }

    while (
        isPeekToken(TokenType.SEMICOLON).not() &&
        isPeekToken(TokenType.EOF).not() &&
        precedence < peekPrecedence()
    ) {
        val infixParseFunction = infixParseFunctions[peekToken.tokenType] ?: return leftExpression

        nextToken()

        leftExpression = infixParseFunction.invoke(leftExpression!!)
    }

    return leftExpression
}
