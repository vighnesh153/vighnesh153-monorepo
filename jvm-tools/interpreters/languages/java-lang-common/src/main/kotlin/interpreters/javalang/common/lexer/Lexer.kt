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

fun Lexer.nextToken(): Token {
    var t = Token(tokenType = TokenType.ILLEGAL, tokenLiteral = "")

    skipWhitespace()

    // todo: add row and column number in the token

    when (currentCharacter) {
        '=' -> t = Token(tokenType = TokenType.EQUALS, tokenLiteral = TokenType.EQUALS.value)
        ',' -> t = Token(tokenType = TokenType.COMMA, tokenLiteral = TokenType.COMMA.value)
        '+' -> t = Token(tokenType = TokenType.PLUS, tokenLiteral = TokenType.PLUS.value)
        ';' -> t = Token(tokenType = TokenType.SEMICOLON, tokenLiteral = TokenType.SEMICOLON.value)
        '@' -> t = Token(tokenType = TokenType.AT_SIGN, tokenLiteral = TokenType.AT_SIGN.value)

        '-' -> t = Token(tokenType = TokenType.MINUS, tokenLiteral = TokenType.MINUS.value)
        '*' -> t = Token(tokenType = TokenType.ASTERISK, tokenLiteral = TokenType.ASTERISK.value)
        '/' -> t = Token(tokenType = TokenType.FORWARD_SLASH, tokenLiteral = TokenType.FORWARD_SLASH.value)
        '\\' -> t = Token(tokenType = TokenType.BACK_SLASH, tokenLiteral = TokenType.BACK_SLASH.value)
        '%' -> t = Token(tokenType = TokenType.MODULUS, tokenLiteral = TokenType.MODULUS.value)
        '!' -> t = Token(tokenType = TokenType.BANG, tokenLiteral = TokenType.BANG.value)
        '&' -> t = Token(tokenType = TokenType.AMPERSAND, tokenLiteral = TokenType.AMPERSAND.value)
        '|' -> t = Token(tokenType = TokenType.VERTICAL_BAR, tokenLiteral = TokenType.VERTICAL_BAR.value)
        '^' -> t = Token(tokenType = TokenType.CARET, tokenLiteral = TokenType.CARET.value)
        '?' -> t = Token(tokenType = TokenType.QUESTION, tokenLiteral = TokenType.QUESTION.value)
        ':' -> t = Token(tokenType = TokenType.COLON, tokenLiteral = TokenType.COLON.value)
        '.' -> t = Token(tokenType = TokenType.DOT, tokenLiteral = TokenType.DOT.value)
        '~' -> t = Token(tokenType = TokenType.TILDE, tokenLiteral = TokenType.TILDE.value)
        '\'' -> t = Token(tokenType = TokenType.SINGLE_QUOTE, tokenLiteral = TokenType.SINGLE_QUOTE.value)
        '"' -> t = Token(tokenType = TokenType.DOUBLE_QUOTE, tokenLiteral = TokenType.DOUBLE_QUOTE.value)
        '`' -> t = Token(tokenType = TokenType.BACKTICK, tokenLiteral = TokenType.BACKTICK.value)
        '(' -> t = Token(tokenType = TokenType.LEFT_PARENTHESIS, tokenLiteral = TokenType.LEFT_PARENTHESIS.value)
        ')' -> t = Token(tokenType = TokenType.RIGHT_PARENTHESIS, tokenLiteral = TokenType.RIGHT_PARENTHESIS.value)
        '{' -> t = Token(tokenType = TokenType.LEFT_CURLY_BRACE, tokenLiteral = TokenType.LEFT_CURLY_BRACE.value)
        '}' -> t = Token(tokenType = TokenType.RIGHT_CURLY_BRACE, tokenLiteral = TokenType.RIGHT_CURLY_BRACE.value)
        '[' -> t = Token(tokenType = TokenType.LEFT_SQUARE_BRACKET, tokenLiteral = TokenType.LEFT_SQUARE_BRACKET.value)
        ']' -> t =
            Token(tokenType = TokenType.RIGHT_SQUARE_BRACKET, tokenLiteral = TokenType.RIGHT_SQUARE_BRACKET.value)

        '<' -> t = Token(tokenType = TokenType.LEFT_ANGLE_BRACKET, tokenLiteral = TokenType.LEFT_ANGLE_BRACKET.value)
        '>' -> t = Token(tokenType = TokenType.RIGHT_ANGLE_BRACKET, tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET.value)
        Char.MIN_VALUE -> t = Token.EOF
        else -> {
            if (currentCharacter.isAcceptableIdentifierStart()) {
                t = Token(
                    tokenType = TokenType.IDENTIFIER,
                    tokenLiteral = readIdentifier()
                )
            } else if (currentCharacter.isDigit()) {
                // read integer
                // read float
                // read double
            }
        }
    }

    readNextCharacter()

    return t
}

fun Char.isUnderscore(): Boolean = this == '_'
fun Char.isAcceptableIdentifierStart(): Boolean = isUnderscore() || isLetter()
fun Char.isAcceptableIdentifierNonStart(): Boolean = isAcceptableIdentifierStart() || isDigit()

fun Lexer.readIdentifier(): String {
    val startIndex = currentIndex
    if (!currentCharacter.isAcceptableIdentifierStart()) {
        throw Error("You should not attempt to read an identifier which doesn't start with '_' or a letter")
    }
    while (currentCharacter.isAcceptableIdentifierNonStart()) {
        readNextCharacter()
    }
    return input.slice(startIndex..<currentIndex)
}

fun Lexer.peekCharacter(): Char {
    if (peekIndex >= input.length) {
        return Char.MIN_VALUE
    }
    return input[peekIndex]
}

fun Lexer.skipWhitespace() {
    val whiteSpaceCharacters = listOf(' ', '\t', '\n', '\r')
    while (whiteSpaceCharacters.contains(currentCharacter)) {
        readNextCharacter()
    }
}
