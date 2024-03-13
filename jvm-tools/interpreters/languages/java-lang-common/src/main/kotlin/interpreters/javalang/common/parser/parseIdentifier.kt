package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.Identifier

fun Parser.parseIdentifier(): ExpressionNode {
    return Identifier(
        token = currentToken,
        value = currentToken.tokenLiteral
    )
}
