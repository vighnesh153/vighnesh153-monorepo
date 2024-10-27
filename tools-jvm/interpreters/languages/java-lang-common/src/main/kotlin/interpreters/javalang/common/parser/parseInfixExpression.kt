package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.InfixExpression

fun Parser.parseInfixExpression(left: ExpressionNode?): ExpressionNode? {
    if (left == null) {
        return null
    }

    val operatorToken = currentToken
    val precedence = currentPrecedence()

    nextToken()

    val right = parseExpression(precedence)

    if (right == null) {
        createUnableToParseExpressionAfterToken(operatorToken)
        return null
    }

    return InfixExpression(
        operatorToken = operatorToken,
        left = left,
        right = right
    )
}