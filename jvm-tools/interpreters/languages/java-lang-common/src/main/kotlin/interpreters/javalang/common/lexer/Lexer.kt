package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType

class Lexer private constructor(
    internal val input: String,
    internal var currentIndex: Int,      // index pointing to the current position in input
    internal var peekIndex: Int,         // points to immediate next index to currentIndex
    internal var currentCharacter: Char, // current character under examination
) {
    constructor(input: String) : this(
        input = input,
        currentIndex = 0,
        peekIndex = 0,
        currentCharacter = Char.MIN_VALUE
    ) {
        readNextCharacter()
    }
}

fun Lexer.readNextCharacter() {
    currentCharacter = if (peekIndex >= input.length)
        Char.MIN_VALUE
    else
        input[peekIndex]
    currentIndex = peekIndex
    peekIndex += 1
}

fun Lexer.nextToken(): Token {
    return Token(tokenType = TokenType.EOF, tokenLiteral = "")
}