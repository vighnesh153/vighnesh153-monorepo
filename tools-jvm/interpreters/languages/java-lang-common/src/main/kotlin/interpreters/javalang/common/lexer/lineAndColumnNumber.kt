package interpreters.javalang.common.lexer

fun Lexer.lineNumber(): Int {
    val slice = if (currentIndex < input.lastIndex) input.slice(0..currentIndex) else input
    return slice.count { it == '\n' } + 1
}

fun Lexer.columnNumber(): Int {
    val slice = if (currentIndex < input.lastIndex) input.slice(0..currentIndex) else input
    return slice.length - slice.indexOfLast { it == '\n' } - 1
}
