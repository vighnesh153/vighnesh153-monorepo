package interpreters.javalang.common.lexer

val validEscapeSequences = listOf("\\t", "\\n", "\\'", "\"", "\\\\")

internal fun Lexer.readEscapeSequence(): String {
    if (currentCharacter != '\\') {
        throw Error("You should not attempt to read an escaped sequence if it doesn't start with '\\'")
    }

    // move past '\'
    readNextCharacter()

    return when (peekCharacter()) {
        'u' -> {
            // unicode
            readNextCharacter()
            val startIndex = currentIndex + 1
            for (i in 1..4) {
                if (peekCharacter().isDigit()) {
                    readNextCharacter()
                } else {
                    addError(
                        createLexerError("Invalid unicode sequence '\\${peekCharacter()}'")
                    )
                    return "<ILLEGAL> Invalid unicode"
                }
            }
            input.slice(startIndex..currentIndex)
        }

        't' -> "\\t"
        'n' -> "\\n"
        '\'' -> "'"
        '"' -> "\""
        '\\' -> "\\"
        EOF_CHARACTER -> {
            // no more characters in the file
            addError(
                createLexerError("Unclosed character literal")
            )
            "<ILLEGAL> Unclosed character literal"
        }

        else -> {
            // invalid escape character
            addError(
                createLexerError("Invalid escape sequence '\\${peekCharacter()}'")
            )
            "<ILLEGAL> Invalid escape sequence"
        }
    }
}

internal fun isEscapeSequence(input: String): Boolean {
    if (validEscapeSequences.contains(input)) {
        return true
    }
    return isValidUnicodeSequence(input)
}

internal fun isValidUnicodeSequence(input: String): Boolean {
    if (input.length != 6) {
        return false
    }
    if (input.startsWith("\\u").not()) {
        return false
    }
    for (i in 2..5) {
        if (input[i].isDigit().not()) {
            return false
        }
    }
    return true
}
