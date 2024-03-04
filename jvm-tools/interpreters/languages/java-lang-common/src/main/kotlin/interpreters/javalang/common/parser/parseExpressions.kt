package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.ExpressionStatement
import interpreters.javalang.common.ast.StatementNode

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

    val leftExpression = prefixParseFunction.invoke()
    return leftExpression
}
