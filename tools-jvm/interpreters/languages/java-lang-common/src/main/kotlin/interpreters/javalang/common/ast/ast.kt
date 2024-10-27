package interpreters.javalang.common.ast

import interpreters.javalang.common.tokens.Token
import kotlin.text.StringBuilder

abstract class LanguageNode {
    abstract fun tokenLiteral(): String

    abstract override fun toString(): String
}

abstract class StatementNode : LanguageNode()
abstract class ExpressionNode : LanguageNode()

class ProgramNode : LanguageNode() {
    private val statements = mutableListOf<StatementNode>()

    fun getStatements(): List<StatementNode> = statements

    fun addStatement(statement: StatementNode) {
        this.statements.add(statement)
    }

    override fun toString(): String = StringBuilder().apply {
        statements.forEach {
            append(it.toString())
            append("\n")
        }
    }.toString()

    override fun tokenLiteral(): String = "<PROGRAM>"
}

class PackageStatement(
    val token: Token,  // The TokenType.PACKAGE_KEYWORD token
    val dotSeparatedIdentifiers: List<Token>,
) : StatementNode() {

    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        return "${token.tokenLiteral} ${dotSeparatedIdentifiers.joinToString { "." }};"
    }
}

class ImportStatement(
    val token: Token,  // The TokenType.IMPORT_KEYWORD token
    val dotSeparatedIdentifiers: List<Token>,
    val isStaticImport: Boolean,
) : StatementNode() {

    override fun tokenLiteral(): String {
        return token.tokenLiteral
    }

    override fun toString(): String {
        if (isStaticImport) {
            return "${token.tokenLiteral} static ${dotSeparatedIdentifiers.joinToString { "." }};"
        }
        return "${token.tokenLiteral} ${dotSeparatedIdentifiers.joinToString { "." }};"
    }
}

class ExpressionStatement(
    val token: Token,
    val expression: ExpressionNode?,
) : StatementNode() {
    override fun tokenLiteral(): String {
        return expression?.tokenLiteral() ?: token.tokenLiteral
    }

    override fun toString(): String {
        return expression?.toString() ?: token.toString()
    }
}

class PrefixExpression(
    val operatorToken: Token,
    val right: ExpressionNode,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return "${operatorToken.tokenLiteral}${right.tokenLiteral()}"
    }

    override fun toString(): String {
        return "${operatorToken.tokenLiteral}$right"
    }
}

class PostfixExpression(
    val operatorToken: Token,
    val left: ExpressionNode,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return "${left.tokenLiteral()}${operatorToken.tokenLiteral}"
    }

    override fun toString(): String {
        return "$left${operatorToken.tokenLiteral}"
    }
}

class InfixExpression(
    val operatorToken: Token,
    val left: ExpressionNode,
    val right: ExpressionNode,
) : ExpressionNode() {
    override fun tokenLiteral(): String {
        return "(${left.tokenLiteral()} ${operatorToken.tokenLiteral} ${right.tokenLiteral()})"
    }

    override fun toString(): String {
        return "($left ${operatorToken.tokenLiteral} $right)"
    }
}

