package interpreters.javalang.common.ast

import interpreters.javalang.common.tokens.Token

class IntegerLiteral(
    val token: Token,
    val value: Int,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        return token.tokenLiteral
    }
}

class FloatLiteral(
    val token: Token,
    val value: Float,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        return token.tokenLiteral
    }
}

class LongLiteral(
    val token: Token,
    val value: Long,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        return token.tokenLiteral
    }
}

class DoubleLiteral(
    val token: Token,
    val value: Double,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        return token.tokenLiteral
    }
}

class StringLiteral(
    val token: Token,
    val value: String,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return value
    }

    override fun toString(): String {
        return token.tokenLiteral
    }
}

class CharacterLiteral(
    val token: Token,
    val value: Char,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return "'${token.tokenLiteral}'"
    }

    override fun toString(): String {
        return "'$value'"
    }
}

class BooleanLiteral(
    val token: Token,
    val value: Boolean,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        return "$value"
    }
}
