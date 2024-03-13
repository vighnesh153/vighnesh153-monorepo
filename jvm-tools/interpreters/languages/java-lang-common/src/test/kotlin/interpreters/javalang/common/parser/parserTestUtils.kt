package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.BooleanLiteral
import interpreters.javalang.common.ast.CharacterLiteral
import interpreters.javalang.common.ast.DoubleLiteral
import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.FloatLiteral
import interpreters.javalang.common.ast.Identifier
import interpreters.javalang.common.ast.InfixExpression
import interpreters.javalang.common.ast.IntegerLiteral
import interpreters.javalang.common.ast.LongLiteral
import interpreters.javalang.common.ast.PostfixExpression
import interpreters.javalang.common.ast.PrefixExpression
import interpreters.javalang.common.ast.StringLiteral
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType


fun ExpressionNode.isSameAs(other: ExpressionNode): Boolean {
    val result = when (other) {
        // expressions
        is PrefixExpression -> isSameAs(other)
        is PostfixExpression -> isSameAs(other)
        is InfixExpression -> isSameAs(other)

        // identifier
        is Identifier -> isSameAs(other)

        // literals
        is FloatLiteral -> isSameAs(other)
        is IntegerLiteral -> isSameAs(other)
        is LongLiteral -> isSameAs(other)
        is DoubleLiteral -> isSameAs(other)
        is CharacterLiteral -> isSameAs(other)
        is StringLiteral -> isSameAs(other)
        is BooleanLiteral -> isSameAs(other)

        else -> false
    }

    return result
}

fun ExpressionNode.isSameAs(other: PrefixExpression): Boolean {
    if (this !is PrefixExpression) {
        return false
    }
    val isOperatorSame = this.operatorToken.tokenType == other.operatorToken.tokenType
    val isRightSame = this.right.isSameAs(other.right)
    return isOperatorSame && isRightSame
}

fun ExpressionNode.isSameAs(other: PostfixExpression): Boolean {
    if (this !is PostfixExpression) {
        return false
    }
    val isOperatorSame = this.operatorToken.tokenType == other.operatorToken.tokenType
    val isLeftSame = this.left.isSameAs(other.left)
    return isOperatorSame && isLeftSame
}

fun ExpressionNode.isSameAs(other: InfixExpression): Boolean {
    if (this !is InfixExpression) {
        return false
    }
    val isOperatorSame = this.operatorToken.tokenType == other.operatorToken.tokenType
    val isLeftSame = this.left.isSameAs(other.left)
    val isRightSame = this.right.isSameAs(other.right)
    return isOperatorSame && isLeftSame && isRightSame
}

fun ExpressionNode.isSameAs(other: Identifier): Boolean {
    if (this !is Identifier) {
        return false
    }
    return this.value == other.value
}

fun ExpressionNode.isSameAs(other: FloatLiteral): Boolean {
    if (this !is FloatLiteral) {
        return false
    }
    val isTokenLiteralSame = this.tokenLiteral() == other.tokenLiteral()
    val isValueSame = this.value == other.value
    return isTokenLiteralSame && isValueSame
}

fun ExpressionNode.isSameAs(other: IntegerLiteral): Boolean {
    if (this !is IntegerLiteral) {
        return false
    }
    val isTokenLiteralSame = this.tokenLiteral() == other.tokenLiteral()
    val isValueSame = this.value == other.value
    return isTokenLiteralSame && isValueSame
}

fun ExpressionNode.isSameAs(other: LongLiteral): Boolean {
    if (this !is LongLiteral) {
        return false
    }
    val isTokenLiteralSame = this.tokenLiteral() == other.tokenLiteral()
    val isValueSame = this.value == other.value
    return isTokenLiteralSame && isValueSame
}

fun ExpressionNode.isSameAs(other: DoubleLiteral): Boolean {
    if (this !is DoubleLiteral) {
        return false
    }
    val isTokenLiteralSame = this.tokenLiteral() == other.tokenLiteral()
    val isValueSame = this.value == other.value
    return isTokenLiteralSame && isValueSame
}

fun ExpressionNode.isSameAs(other: StringLiteral): Boolean {
    if (this !is StringLiteral) {
        return false
    }
    val isTokenLiteralSame = this.tokenLiteral() == other.tokenLiteral()
    val isValueSame = this.value == other.value
    return isTokenLiteralSame && isValueSame
}

fun ExpressionNode.isSameAs(other: CharacterLiteral): Boolean {
    if (this !is CharacterLiteral) {
        return false
    }
    val isTokenLiteralSame = this.tokenLiteral() == other.tokenLiteral()
    val isValueSame = this.value == other.value
    return isTokenLiteralSame && isValueSame
}

fun ExpressionNode.isSameAs(other: BooleanLiteral): Boolean {
    if (this !is BooleanLiteral) {
        return false
    }
    val isTokenLiteralSame = this.tokenLiteral() == other.tokenLiteral()
    val isValueSame = this.value == other.value
    return isTokenLiteralSame && isValueSame
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
