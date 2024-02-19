package interpreters.javalang.common.lexer

import kotlin.math.min

internal fun Lexer.readSingleLineComment(): String {
    if (currentCharacter != '/' || peekCharacter() != '/') {
        throw Error("You should not attempt to read single line comment that doesn't start with '//'")
    }

    // get past second '/'
    readNextCharacter()
    readNextCharacter()

    val startIndex = currentIndex
    while (currentCharacter != EOF_CHARACTER && currentCharacter != '\n') {
        readNextCharacter()
    }
    return input.slice(startIndex..min(currentIndex, input.lastIndex))
}

internal fun Lexer.readMultilineComment(): String {
    if (currentCharacter != '/' || peekCharacter() != '*') {
        throw Error("You should not attempt to read multiline comment that doesn't start with '/*'")
    }

    // get past '/*'
    readNextCharacter()
    readNextCharacter()

    val startIndex = currentIndex
    while (
    // end of multiline comment
        (currentCharacter != '*' || peekCharacter() != '/') &&
        // end of file
        currentCharacter != EOF_CHARACTER
    ) {
        readNextCharacter()
    }
    if (currentCharacter == EOF_CHARACTER) {
        addError(
            createLexerError("Unclosed multiline comment")
        )
        return "<ILLEGAL> Unclosed multiline comment"
    }
    val endIndex = currentIndex
    readNextCharacter()
    return input.slice(startIndex..<endIndex)
}
