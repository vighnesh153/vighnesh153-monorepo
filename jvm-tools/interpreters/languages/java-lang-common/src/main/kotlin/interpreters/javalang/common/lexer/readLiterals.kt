package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType

internal fun Lexer.readCharacterLiteral(): String {
    if (currentCharacter != SINGLE_QUOTE) {
        throw Error("You should not attempt to read a character literal if it doesn't start with \"'\"")
    }
    readNextCharacter()
    val stringBuilder = StringBuilder()

    while (currentCharacter != SINGLE_QUOTE && currentCharacter != EOF_CHARACTER) {
        if (currentCharacter == '\\') {
            stringBuilder.append(readEscapeSequence())
        } else {
            stringBuilder.append(currentCharacter)
        }
        readNextCharacter()
    }

    if (currentCharacter == EOF_CHARACTER) {
        addError(
            createLexerError("Unclosed character literal")
        )
        return "<ILLEGAL> Unclosed character literal"
    }

    // current character is ending single quote

    val character = stringBuilder.toString()
    if (character.length == 1) {
        return character
    }
    if (isEscapeSequence(character).not()) {
        addError(
            createLexerError("Too many characters in the character literal")
        )
        return "<ILLEGAL> Invalid character sequence"
    }
    return character
}

internal fun Lexer.readStringLiteral(): String {
    if (currentCharacter != DOUBLE_QUOTE) {
        throw Error("You should not attempt to read a string literal if it doesn't start with '\"'")
    }
    readNextCharacter()
    val stringBuilder = StringBuilder()

    while (currentCharacter != DOUBLE_QUOTE && currentCharacter != EOF_CHARACTER) {
        if (currentCharacter == '\\') {
            stringBuilder.append(readEscapeSequence())
        } else {
            stringBuilder.append(currentCharacter)
        }
        readNextCharacter()
    }
    if (currentCharacter == EOF_CHARACTER) {
        addError(
            createLexerError("Unclosed string literal")
        )
        return "<ILLEGAL> Unclosed string literal"
    }

    // current character is ending double quote

    return stringBuilder.toString()
}

internal fun Lexer.readNumberLiteral(): Token {
    if (currentCharacter.isDigit().not() && currentCharacter != '.') {
        throw Error("You should not attempt to read a number that doesn't start with a digit or a floating point, found=$currentCharacter")
    }

    val startIndex = currentIndex
    var containsDecimalPoint = currentCharacter == '.'

    var peek = peekCharacter()
    while (true) {
        if (peek == '.') {
            if (containsDecimalPoint) {
                return when (currentCharacter.lowercase()) {
                    "f" -> createNewToken(
                        tokenType = TokenType.FLOAT_LITERAL,
                        tokenLiteral = input.slice(startIndex..currentIndex),
                    )

                    else -> createNewToken(
                        tokenType = TokenType.DOUBLE_LITERAL,
                        tokenLiteral = input.slice(startIndex..currentIndex),
                    )
                }
            }
            // In Kotlin, check if this is decimal point or object access point
            containsDecimalPoint = true
        } else if (peek.lowercase() == "f") {
            readNextCharacter()
            return createNewToken(
                tokenType = TokenType.FLOAT_LITERAL,
                tokenLiteral = input.slice(startIndex..currentIndex),
            )
        } else if (peek.lowercase() == "l") {
            readNextCharacter()
            if (containsDecimalPoint) {
                addError(
                    createLexerError("A floating point number cannot be long at the same time")
                )
                return createNewToken(
                    tokenType = TokenType.ILLEGAL,
                    tokenLiteral = "$currentCharacter"
                )
            }
            return createNewToken(
                tokenType = TokenType.LONG_LITERAL,
                tokenLiteral = input.slice(startIndex..currentIndex)
            )
        } else if (peek.isDigit()) {
            // continue with the loop
        } else {
            break
        }

        readNextCharacter()
        peek = peekCharacter()
    }

    if (containsDecimalPoint) {
        return createNewToken(
            tokenType = TokenType.DOUBLE_LITERAL,
            tokenLiteral = input.slice(startIndex..currentIndex)
        )
    }
    return createNewToken(
        tokenType = TokenType.INTEGER_LITERAL,
        tokenLiteral = input.slice(startIndex..currentIndex)
    )
}
