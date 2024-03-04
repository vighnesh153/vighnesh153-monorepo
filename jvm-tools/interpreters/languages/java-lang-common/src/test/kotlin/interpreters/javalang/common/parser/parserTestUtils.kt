package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.*
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType


fun ExpressionNode.isSameAs(other: ExpressionNode): Boolean {
    return when (other) {
        is FloatLiteral -> isSameAs(other)
        is IntegerLiteral -> isSameAs(other)
        is LongLiteral -> isSameAs(other)
        is DoubleLiteral -> isSameAs(other)
        is CharacterLiteral -> isSameAs(other)
        is StringLiteral -> isSameAs(other)
        else -> false
    }
}

fun ExpressionNode.isSameAs(other: FloatLiteral): Boolean {
    if (this !is FloatLiteral) {
        return false
    }
    return this.value == other.value
}

fun ExpressionNode.isSameAs(other: IntegerLiteral): Boolean {
    if (this !is IntegerLiteral) {
        return false
    }
    return this.value == other.value
}

fun ExpressionNode.isSameAs(other: LongLiteral): Boolean {
    if (this !is LongLiteral) {
        return false
    }
    return this.value == other.value
}

fun ExpressionNode.isSameAs(other: DoubleLiteral): Boolean {
    if (this !is DoubleLiteral) {
        return false
    }
    return this.value == other.value
}

fun ExpressionNode.isSameAs(other: StringLiteral): Boolean {
    if (this !is StringLiteral) {
        return false
    }
    return this.value == other.value
}

fun ExpressionNode.isSameAs(other: CharacterLiteral): Boolean {
    if (this !is CharacterLiteral) {
        return false
    }
    return this.value == other.value
}

fun createTestToken(
    tokenType: TokenType,
    tokenLiteral: String,
    lineNumber: Int = -1,
    columnNumber: Int = -1,
): Token = Token(
    tokenType = tokenType,
    tokenLiteral = tokenLiteral,
    lineNumber = lineNumber,
    columnNumber = columnNumber
)
