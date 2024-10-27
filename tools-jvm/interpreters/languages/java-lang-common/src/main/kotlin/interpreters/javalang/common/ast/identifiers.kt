package interpreters.javalang.common.ast

import interpreters.javalang.common.tokens.Token

class Identifier(
    val token: Token,
    val value: String,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        return value
    }
}
