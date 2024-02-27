package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ExpressionNode
import interpreters.javalang.common.ast.FloatLiteral
import interpreters.javalang.common.ast.IntegerLiteral
import java.lang.NumberFormatException

fun Parser.parseIntegerLiteral(): ExpressionNode? {
    val token = currentToken
    return try {
        IntegerLiteral(
            token = token,
            value = token.tokenLiteral.toInt(),
        )
    } catch (e: NumberFormatException) {
        createUnexpectedNumberFormatError(e.message ?: "Unknown error occurred", token)
        null
    }
}

fun Parser.parseFloatLiteral(): ExpressionNode? {
    val token = currentToken
    return try {
        FloatLiteral(
            token = token,
            value = token.tokenLiteral.toFloat(),
        )
    } catch (e: NumberFormatException) {
        createUnexpectedNumberFormatError(e.message ?: "Unknown error occurred", token)
        null
    }
}
