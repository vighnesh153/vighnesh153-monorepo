package interpreters.javalang.common.lexer

fun Lexer.lineNumber(): Int {
    if (currentCharacter == EOF_CHARACTER) {
        return input.split("\n").size
    }

    return input.slice(0..currentIndex).count { it == '\n' } + 1
}

fun Lexer.columnNumber(): Int {
    if (currentCharacter == EOF_CHARACTER) {
        return 0
    }

    val linesUptoCurrentIndex = input.slice(0..currentIndex).split("\n").toMutableList()
    linesUptoCurrentIndex.removeLast()
    // currentIndex - (count of characters upto previous line)
    return currentIndex + 1 - linesUptoCurrentIndex.sumOf { it.length + 1 }
}
