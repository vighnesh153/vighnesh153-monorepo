package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.PostfixExpression

fun Parser.parsePostfixExpression(left: ExpressionNode?): ExpressionNode? {
    val operatorToken = currentToken

    if (left == null) {
        createUnableToParseExpressionBeforeToken(operatorToken)
        return null
    }

    return PostfixExpression(
        operatorToken = operatorToken,
        left = left,
    )
}