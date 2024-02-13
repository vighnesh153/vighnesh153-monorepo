package interpreters.javalang.common.lexer

import interpreters.javalang.common.errors.InterpreterError
import interpreters.javalang.common.errors.InterpreterErrorType
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType
import interpreters.javalang.common.tokens.lookupIdentifier
import kotlin.math.min

const val EOF_CHARACTER = Char.MIN_VALUE
const val SINGLE_QUOTE = '\''
const val DOUBLE_QUOTE = '"'

class Lexer constructor(internal val input: String) {
    // index pointing to the current position in input
    internal var currentIndex = 0

    // points to immediate next index to currentIndex
    internal var peekIndex = 0

    // current character under examination
    internal var currentCharacter = EOF_CHARACTER

    private val errors = mutableListOf<InterpreterError>()

    init {
        readNextCharacter()
    }

    fun getErrors(): List<InterpreterError> = errors

    fun addError(error: InterpreterError) {
        errors.add(error)
    }
}

fun Lexer.nextToken(): Token {
    lateinit var t: Token

    skipWhitespace()

    // todo: add row and column number in the token

    when (currentCharacter) {
        '=' -> {
            t = if (peekCharacter() == '=') {
                readNextCharacter()
                Token(tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = TokenType.DOUBLE_EQUALS.value)
            } else {
                Token(tokenType = TokenType.EQUALS, tokenLiteral = TokenType.EQUALS.value)
            }
        }

        ',' -> t = Token(tokenType = TokenType.COMMA, tokenLiteral = TokenType.COMMA.value)
        '+' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '+' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.INCREMENT, tokenLiteral = TokenType.INCREMENT.value)
                }

                '=' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.PLUS_EQUALS, tokenLiteral = TokenType.PLUS_EQUALS.value)
                }

                else -> Token(tokenType = TokenType.PLUS, tokenLiteral = TokenType.PLUS.value)
            }
        }

        ';' -> t = Token(tokenType = TokenType.SEMICOLON, tokenLiteral = TokenType.SEMICOLON.value)
        '@' -> t = Token(tokenType = TokenType.AT_SIGN, tokenLiteral = TokenType.AT_SIGN.value)

        '-' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '-' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.DECREMENT, tokenLiteral = TokenType.DECREMENT.value)
                }

                '=' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.MINUS_EQUALS, tokenLiteral = TokenType.MINUS_EQUALS.value)
                }

                else -> Token(tokenType = TokenType.MINUS, tokenLiteral = TokenType.MINUS.value)
            }
        }

        '*' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = TokenType.ASTERISK_EQUALS.value)
                }

                else -> Token(tokenType = TokenType.ASTERISK, tokenLiteral = TokenType.ASTERISK.value)
            }
        }

        '/' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    Token(
                        tokenType = TokenType.FORWARD_SLASH_EQUALS,
                        tokenLiteral = TokenType.FORWARD_SLASH_EQUALS.value
                    )
                }

                '/' -> Token(tokenType = TokenType.SINGLE_LINE_COMMENT, tokenLiteral = readSingleLineComment())
                '*' -> Token(tokenType = TokenType.MULTI_LINE_COMMENT, tokenLiteral = readMultilineComment())

                else -> Token(tokenType = TokenType.FORWARD_SLASH, tokenLiteral = TokenType.FORWARD_SLASH.value)
            }
        }

        '\\' -> t = Token(tokenType = TokenType.BACK_SLASH, tokenLiteral = TokenType.BACK_SLASH.value)
        '%' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.MODULUS_EQUALS, tokenLiteral = TokenType.MODULUS_EQUALS.value)
                }

                else -> Token(tokenType = TokenType.MODULUS, tokenLiteral = TokenType.MODULUS.value)
            }
        }

        '!' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.BANG_EQUALS, tokenLiteral = TokenType.BANG_EQUALS.value)
                }

                else -> Token(tokenType = TokenType.BANG, tokenLiteral = TokenType.BANG.value)
            }
        }

        '&' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '&' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = TokenType.DOUBLE_AMPERSAND.value)
                }

                else -> Token(tokenType = TokenType.AMPERSAND, tokenLiteral = TokenType.AMPERSAND.value)
            }
        }

        '|' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '|' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = TokenType.DOUBLE_VERTICAL_BAR.value)
                }

                else -> Token(tokenType = TokenType.VERTICAL_BAR, tokenLiteral = TokenType.VERTICAL_BAR.value)
            }
        }

        '^' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    Token(tokenType = TokenType.CARET_EQUALS, tokenLiteral = TokenType.CARET_EQUALS.value)
                }

                else -> Token(tokenType = TokenType.CARET, tokenLiteral = TokenType.CARET.value)
            }
        }

        '?' -> t = Token(tokenType = TokenType.QUESTION, tokenLiteral = TokenType.QUESTION.value)
        ':' -> t = Token(tokenType = TokenType.COLON, tokenLiteral = TokenType.COLON.value)
        '.' -> {
            t = if (peekCharacter().isDigit()) {
                readNumberLiteral()
            } else {
                Token(tokenType = TokenType.DOT, tokenLiteral = TokenType.DOT.value)
            }
        }

        '~' -> t = Token(tokenType = TokenType.TILDE, tokenLiteral = TokenType.TILDE.value)
        '\'' -> t = Token(tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = readCharacterLiteral())
        '"' -> t = Token(tokenType = TokenType.STRING_LITERAL, tokenLiteral = readStringLiteral())
        '(' -> t = Token(tokenType = TokenType.LEFT_PARENTHESIS, tokenLiteral = TokenType.LEFT_PARENTHESIS.value)
        ')' -> t = Token(tokenType = TokenType.RIGHT_PARENTHESIS, tokenLiteral = TokenType.RIGHT_PARENTHESIS.value)
        '{' -> t = Token(tokenType = TokenType.LEFT_CURLY_BRACE, tokenLiteral = TokenType.LEFT_CURLY_BRACE.value)
        '}' -> t = Token(tokenType = TokenType.RIGHT_CURLY_BRACE, tokenLiteral = TokenType.RIGHT_CURLY_BRACE.value)
        '[' -> t = Token(tokenType = TokenType.LEFT_SQUARE_BRACKET, tokenLiteral = TokenType.LEFT_SQUARE_BRACKET.value)
        ']' -> t =
            Token(tokenType = TokenType.RIGHT_SQUARE_BRACKET, tokenLiteral = TokenType.RIGHT_SQUARE_BRACKET.value)

        '<' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '<' -> {
                    readNextCharacter()
                    Token(
                        tokenType = TokenType.DOUBLE_LEFT_ANGLE_BRACKET,
                        tokenLiteral = TokenType.DOUBLE_LEFT_ANGLE_BRACKET.value
                    )
                }

                '=' -> {
                    readNextCharacter()
                    Token(
                        tokenType = TokenType.LEFT_ANGLE_BRACKET_EQUALS,
                        tokenLiteral = TokenType.LEFT_ANGLE_BRACKET_EQUALS.value
                    )
                }

                else -> Token(
                    tokenType = TokenType.LEFT_ANGLE_BRACKET,
                    tokenLiteral = TokenType.LEFT_ANGLE_BRACKET.value
                )
            }
        }

        '>' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '>' -> {
                    readNextCharacter()
                    if (peekCharacter() == '>') {
                        readNextCharacter()
                        Token(
                            tokenType = TokenType.TRIPLE_RIGHT_ANGLE_BRACKET,
                            tokenLiteral = TokenType.TRIPLE_RIGHT_ANGLE_BRACKET.value
                        )
                    } else {
                        Token(
                            tokenType = TokenType.DOUBLE_RIGHT_ANGLE_BRACKET,
                            tokenLiteral = TokenType.DOUBLE_RIGHT_ANGLE_BRACKET.value
                        )
                    }
                }

                '=' -> {
                    readNextCharacter()
                    Token(
                        tokenType = TokenType.RIGHT_ANGLE_BRACKET_EQUALS,
                        tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET_EQUALS.value
                    )
                }

                else -> Token(
                    tokenType = TokenType.RIGHT_ANGLE_BRACKET,
                    tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET.value
                )
            }
        }

        EOF_CHARACTER -> t = Token.EOF
        else -> {
            t = if (currentCharacter.isAcceptableIdentifierStart()) {
                val identifier = readIdentifier()
                // this return is necessary to avoid the unnecessary readNextCharacter
                // call after when block
                return Token(
                    tokenType = lookupIdentifier(identifier),
                    tokenLiteral = identifier,
                )
            } else if (currentCharacter.isDigit()) {
                readNumberLiteral()
            } else {
                Token(tokenType = TokenType.ILLEGAL, tokenLiteral = "")
            }
        }
    }

    readNextCharacter()

    return t
}

internal fun Char.isUnderscore(): Boolean = this == '_'
internal fun Char.isAcceptableIdentifierStart(): Boolean = isUnderscore() || isLetter()
internal fun Char.isAcceptableIdentifierNonStart(): Boolean = isAcceptableIdentifierStart() || isDigit()

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

internal fun Lexer.peekCharacter(): Char {
    if (peekIndex >= input.length) {
        return EOF_CHARACTER
    }
    return input[peekIndex]
}

internal fun Lexer.skipWhitespace() {
    val whiteSpaceCharacters = listOf(' ', '\t', '\n', '\r')
    while (whiteSpaceCharacters.contains(currentCharacter)) {
        readNextCharacter()
    }
}

internal fun Lexer.createLexerError(errorMessage: String): InterpreterError {
    val lines = input.slice(0..min(input.lastIndex, currentIndex)).split('\n')
    val lineNumber = lines.size
    val columnNumber = currentIndex - lines.subList(0, lines.lastIndex - 1).sumOf { it.length }
    return InterpreterError(
        errorMessage = errorMessage,
        errorType = InterpreterErrorType.LEXER_ERROR,
        lineNumber = lineNumber,
        columnNumber = columnNumber,
    )
}

internal fun Lexer.readCharacterLiteral(): String {
    if (currentCharacter != SINGLE_QUOTE) {
        throw Error("You should not attempt to read a character literal if it doesn't start with \"'\"")
    }
    readNextCharacter()
    val startIndex = currentIndex

    while (currentCharacter != SINGLE_QUOTE && currentCharacter != EOF_CHARACTER) {
        if (currentCharacter == '\\') {
            readEscapeSequence()
        }
        readNextCharacter()
    }
    if (currentCharacter == EOF_CHARACTER) {
        addError(
            createLexerError("Unclosed character token")
        )
        return "<ILLEGAL> EOF reached"
    }
    // current character is ending single quote
    val character = input.slice(startIndex..<currentIndex)
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
    val startIndex = currentIndex

    while (currentCharacter != DOUBLE_QUOTE && currentCharacter != EOF_CHARACTER) {
        if (currentCharacter == '\\') {
            readEscapeSequence()
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
    return input.slice(startIndex..<currentIndex)
}

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

internal fun Lexer.readNumberLiteral(): Token {
    if (currentCharacter.isDigit().not() && currentCharacter != '.') {
        throw Error("You should not attempt to read a number that doesn't start with a digit or a floating point, found=$currentCharacter")
    }

    val startIndex = currentIndex
    var containsDecimalPoint = false

    var peek = peekCharacter()
    while (true) {
        if (peek == '.') {
            if (containsDecimalPoint) {
                return when (currentCharacter.lowercase()) {
                    "f" -> Token(
                        tokenType = TokenType.FLOAT_LITERAL,
                        tokenLiteral = input.slice(startIndex..currentIndex),
                    )

                    "l" -> {
                        addError(
                            createLexerError("A number with decimal point can either be a 'float' or a 'double' and not 'long'")
                        )
                        Token(
                            tokenType = TokenType.ILLEGAL,
                            tokenLiteral = "l"
                        )
                    }

                    else -> Token(
                        tokenType = TokenType.DOUBLE_LITERAL,
                        tokenLiteral = input.slice(startIndex..currentIndex),
                    )
                }
            }
            // In Kotlin, check if this is decimal point or object access point
            containsDecimalPoint = true
        } else if (peek.lowercase() == "f") {
            readNextCharacter()
            return Token(
                tokenType = TokenType.FLOAT_LITERAL,
                tokenLiteral = input.slice(startIndex..currentIndex),
            )
        } else if (peek.lowercase() == "l") {
            readNextCharacter()
            if (containsDecimalPoint) {
                addError(
                    createLexerError("A floating point number cannot be long at the same time")
                )
                return Token(
                    tokenType = TokenType.ILLEGAL,
                    tokenLiteral = "$currentCharacter"
                )
            }
            return Token(
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
        return Token(
            tokenType = TokenType.DOUBLE_LITERAL,
            tokenLiteral = input.slice(startIndex..currentIndex)
        )
    }
    return Token(
        tokenType = TokenType.INTEGER_LITERAL,
        tokenLiteral = input.slice(startIndex..currentIndex)
    )
}
