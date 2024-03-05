package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode

internal fun interface PrefixParseFunction {
    fun invoke(): ExpressionNode?
}

internal fun interface InfixParseFunction {
    fun invoke(left: ExpressionNode): ExpressionNode
}

internal fun interface PostfixParseFunction {
    fun invoke(left: ExpressionNode?): ExpressionNode?
}