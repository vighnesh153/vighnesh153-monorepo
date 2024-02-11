package interpreters.javalang.common.lexer

import interpreters.javalang.common.errors.InterpreterError
import interpreters.javalang.common.errors.InterpreterErrorType
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType
import interpreters.javalang.common.tokens.lookupIdentifier


class Lexer constructor(internal val input: String) {
    // index pointing to the current position in input
    internal var currentIndex = 0

    // points to immediate next index to currentIndex
    internal var peekIndex = 0

    // current character under examination
    internal var currentCharacter = Char.MIN_VALUE

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

        Char.MIN_VALUE -> t = Token.EOF
        else -> {
            if (currentCharacter.isAcceptableIdentifierStart()) {
                val identifier = readIdentifier()
                // this return is necessary to avoid the unnecessary readNextCharacter
                // call after when block
                return Token(
                    tokenType = lookupIdentifier(identifier),
                    tokenLiteral = identifier,
                )
            } else if (currentCharacter.isDigit()) {
                // read integer
                // read float
                // read double
                // todo: return token
            } else {
                t = Token(tokenType = TokenType.ILLEGAL, tokenLiteral = "")
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

fun Lexer.createLexerError(errorMessage: String): InterpreterError {
    val lines = input.slice(0..currentIndex).split('\n')
    val lineNumber = lines.size
    val columnNumber = currentIndex - lines.subList(0, lines.lastIndex - 1).sumOf { it.length }
    return InterpreterError(
        errorMessage = errorMessage,
        errorType = InterpreterErrorType.LEXER_ERROR,
        lineNumber = lineNumber,
        columnNumber = columnNumber,
    )
}
