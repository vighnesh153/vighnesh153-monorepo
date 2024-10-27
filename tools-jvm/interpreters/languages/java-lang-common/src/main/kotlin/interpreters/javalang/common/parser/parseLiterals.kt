package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.*
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

fun Parser.parseLongLiteral(): ExpressionNode? {
    val token = currentToken
    return try {
        val tokenLiteral = token.tokenLiteral
        LongLiteral(
            token = token,
            // remove the trailing "L"
            value = tokenLiteral.slice(0..<tokenLiteral.lastIndex).toLong(),
        )
    } catch (e: NumberFormatException) {
        e.printStackTrace()
        createUnexpectedNumberFormatError(e.message ?: "Unknown error occurred", token)
        null
    }
}

fun Parser.parseDoubleLiteral(): ExpressionNode? {
    val token = currentToken
    return try {
        val tokenLiteral = token.tokenLiteral
        DoubleLiteral(
            token = token,
            value = tokenLiteral.toDouble(),
        )
    } catch (e: NumberFormatException) {
        e.printStackTrace()
        createUnexpectedNumberFormatError(e.message ?: "Unknown error occurred", token)
        null
    }
}

fun Parser.parseStringLiteral(): ExpressionNode {
    return StringLiteral(
        token = currentToken,
        value = currentToken.tokenLiteral
    )
}

fun Parser.parseCharacterLiteral(): ExpressionNode {
    if (currentToken.tokenLiteral.length != 1) {
        throw Error("Character can only have length 1, found token=$currentToken")
    }
    return CharacterLiteral(
        token = currentToken,
        value = currentToken.tokenLiteral[0]
    )
}

fun Parser.parseBooleanLiteral(): ExpressionNode {
    return BooleanLiteral(
        token = currentToken,
        value = currentToken.tokenLiteral == "true"
    )
}
