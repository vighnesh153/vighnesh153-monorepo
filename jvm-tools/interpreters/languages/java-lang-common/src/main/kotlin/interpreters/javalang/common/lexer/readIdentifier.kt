package interpreters.javalang.common.lexer

internal fun Lexer.readIdentifier(): String {
    val startIndex = currentIndex
    if (!currentCharacter.isAcceptableIdentifierStart()) {
        throw Error("You should not attempt to read an identifier which doesn't start with '_' or a letter")
    }
    while (currentCharacter.isAcceptableIdentifierNonStart()) {
        readNextCharacter()
    }
    return input.slice(startIndex..<currentIndex)
}
