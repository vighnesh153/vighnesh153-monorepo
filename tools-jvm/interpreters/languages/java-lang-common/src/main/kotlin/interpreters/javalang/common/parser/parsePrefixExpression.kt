package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.PrefixExpression

fun Parser.parsePrefixExpression(): ExpressionNode? {
    val operatorToken = currentToken

    nextToken()

    val rightExpression = parseExpression(Precedence.PrefixPostfixOperator)

    if (rightExpression == null) {
        createUnableToParseExpressionAfterToken(operatorToken)
        return null
    }

    return PrefixExpression(
        operatorToken = operatorToken,
        right = rightExpression,
    )
}