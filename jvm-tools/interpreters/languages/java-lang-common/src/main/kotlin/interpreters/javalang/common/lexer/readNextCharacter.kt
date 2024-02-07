package interpreters.javalang.common.lexer

fun Lexer.readNextCharacter() {
    currentCharacter = if (peekIndex >= input.length)
        Char.MIN_VALUE
    else
        input[peekIndex]
    currentIndex = peekIndex
    peekIndex += 1
}