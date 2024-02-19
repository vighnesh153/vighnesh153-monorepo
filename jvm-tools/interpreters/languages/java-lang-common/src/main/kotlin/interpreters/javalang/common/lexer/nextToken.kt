package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType
import interpreters.javalang.common.tokens.lookupIdentifier

fun Lexer.nextToken(): Token {
    lateinit var t: Token

    skipWhitespace()

    tokenStartLineNumber = lineNumber()
    tokenStartColumnNumber = columnNumber()

    when (currentCharacter) {
        '=' -> {
            t = if (peekCharacter() == '=') {
                readNextCharacter()
                createNewToken(tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = TokenType.DOUBLE_EQUALS.value)
            } else {
                createNewToken(tokenType = TokenType.EQUALS, tokenLiteral = TokenType.EQUALS.value)
            }
        }

        ',' -> t = createNewToken(tokenType = TokenType.COMMA, tokenLiteral = TokenType.COMMA.value)
        '+' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '+' -> {
                    readNextCharacter()
                    createNewToken(tokenType = TokenType.INCREMENT, tokenLiteral = TokenType.INCREMENT.value)
                }

                '=' -> {
                    readNextCharacter()
                    createNewToken(tokenType = TokenType.PLUS_EQUALS, tokenLiteral = TokenType.PLUS_EQUALS.value)
                }

                else -> createNewToken(tokenType = TokenType.PLUS, tokenLiteral = TokenType.PLUS.value)
            }
        }

        ';' -> t = createNewToken(tokenType = TokenType.SEMICOLON, tokenLiteral = TokenType.SEMICOLON.value)
        '@' -> t = createNewToken(tokenType = TokenType.AT_SIGN, tokenLiteral = TokenType.AT_SIGN.value)

        '-' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '-' -> {
                    readNextCharacter()
                    createNewToken(tokenType = TokenType.DECREMENT, tokenLiteral = TokenType.DECREMENT.value)
                }

                '=' -> {
                    readNextCharacter()
                    createNewToken(tokenType = TokenType.MINUS_EQUALS, tokenLiteral = TokenType.MINUS_EQUALS.value)
                }

                else -> createNewToken(tokenType = TokenType.MINUS, tokenLiteral = TokenType.MINUS.value)
            }
        }

        '*' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    createNewToken(
                        tokenType = TokenType.ASTERISK_EQUALS,
                        tokenLiteral = TokenType.ASTERISK_EQUALS.value
                    )
                }

                else -> createNewToken(tokenType = TokenType.ASTERISK, tokenLiteral = TokenType.ASTERISK.value)
            }
        }

        '/' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    createNewToken(
                        tokenType = TokenType.FORWARD_SLASH_EQUALS,
                        tokenLiteral = TokenType.FORWARD_SLASH_EQUALS.value
                    )
                }

                '/' -> createNewToken(tokenType = TokenType.SINGLE_LINE_COMMENT, tokenLiteral = readSingleLineComment())
                '*' -> createNewToken(tokenType = TokenType.MULTI_LINE_COMMENT, tokenLiteral = readMultilineComment())

                else -> createNewToken(
                    tokenType = TokenType.FORWARD_SLASH,
                    tokenLiteral = TokenType.FORWARD_SLASH.value
                )
            }
        }

        '\\' -> t = createNewToken(tokenType = TokenType.BACK_SLASH, tokenLiteral = TokenType.BACK_SLASH.value)
        '%' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    createNewToken(tokenType = TokenType.MODULUS_EQUALS, tokenLiteral = TokenType.MODULUS_EQUALS.value)
                }

                else -> createNewToken(tokenType = TokenType.MODULUS, tokenLiteral = TokenType.MODULUS.value)
            }
        }

        '!' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    createNewToken(tokenType = TokenType.BANG_EQUALS, tokenLiteral = TokenType.BANG_EQUALS.value)
                }

                else -> createNewToken(tokenType = TokenType.BANG, tokenLiteral = TokenType.BANG.value)
            }
        }

        '&' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '&' -> {
                    readNextCharacter()
                    createNewToken(
                        tokenType = TokenType.DOUBLE_AMPERSAND,
                        tokenLiteral = TokenType.DOUBLE_AMPERSAND.value
                    )
                }

                else -> createNewToken(tokenType = TokenType.AMPERSAND, tokenLiteral = TokenType.AMPERSAND.value)
            }
        }

        '|' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '|' -> {
                    readNextCharacter()
                    createNewToken(
                        tokenType = TokenType.DOUBLE_VERTICAL_BAR,
                        tokenLiteral = TokenType.DOUBLE_VERTICAL_BAR.value
                    )
                }

                else -> createNewToken(tokenType = TokenType.VERTICAL_BAR, tokenLiteral = TokenType.VERTICAL_BAR.value)
            }
        }

        '^' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '=' -> {
                    readNextCharacter()
                    createNewToken(tokenType = TokenType.CARET_EQUALS, tokenLiteral = TokenType.CARET_EQUALS.value)
                }

                else -> createNewToken(tokenType = TokenType.CARET, tokenLiteral = TokenType.CARET.value)
            }
        }

        '?' -> t = createNewToken(tokenType = TokenType.QUESTION, tokenLiteral = TokenType.QUESTION.value)
        ':' -> t = createNewToken(tokenType = TokenType.COLON, tokenLiteral = TokenType.COLON.value)
        '.' -> {
            t = if (peekCharacter().isDigit()) {
                readNumberLiteral()
            } else {
                createNewToken(tokenType = TokenType.DOT, tokenLiteral = TokenType.DOT.value)
            }
        }

        '~' -> t = createNewToken(tokenType = TokenType.TILDE, tokenLiteral = TokenType.TILDE.value)
        '\'' -> t = createNewToken(tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = readCharacterLiteral())
        '"' -> t = createNewToken(tokenType = TokenType.STRING_LITERAL, tokenLiteral = readStringLiteral())
        '(' -> t =
            createNewToken(tokenType = TokenType.LEFT_PARENTHESIS, tokenLiteral = TokenType.LEFT_PARENTHESIS.value)

        ')' -> t =
            createNewToken(tokenType = TokenType.RIGHT_PARENTHESIS, tokenLiteral = TokenType.RIGHT_PARENTHESIS.value)

        '{' -> t =
            createNewToken(tokenType = TokenType.LEFT_CURLY_BRACE, tokenLiteral = TokenType.LEFT_CURLY_BRACE.value)

        '}' -> t =
            createNewToken(tokenType = TokenType.RIGHT_CURLY_BRACE, tokenLiteral = TokenType.RIGHT_CURLY_BRACE.value)

        '[' -> t = createNewToken(
            tokenType = TokenType.LEFT_SQUARE_BRACKET,
            tokenLiteral = TokenType.LEFT_SQUARE_BRACKET.value
        )

        ']' -> t =
            createNewToken(
                tokenType = TokenType.RIGHT_SQUARE_BRACKET,
                tokenLiteral = TokenType.RIGHT_SQUARE_BRACKET.value
            )

        '<' -> {
            val peek = peekCharacter()
            t = when (peek) {
                '<' -> {
                    readNextCharacter()
                    createNewToken(
                        tokenType = TokenType.DOUBLE_LEFT_ANGLE_BRACKET,
                        tokenLiteral = TokenType.DOUBLE_LEFT_ANGLE_BRACKET.value
                    )
                }

                '=' -> {
                    readNextCharacter()
                    createNewToken(
                        tokenType = TokenType.LEFT_ANGLE_BRACKET_EQUALS,
                        tokenLiteral = TokenType.LEFT_ANGLE_BRACKET_EQUALS.value
                    )
                }

                else -> createNewToken(
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
                        createNewToken(
                            tokenType = TokenType.TRIPLE_RIGHT_ANGLE_BRACKET,
                            tokenLiteral = TokenType.TRIPLE_RIGHT_ANGLE_BRACKET.value
                        )
                    } else {
                        createNewToken(
                            tokenType = TokenType.DOUBLE_RIGHT_ANGLE_BRACKET,
                            tokenLiteral = TokenType.DOUBLE_RIGHT_ANGLE_BRACKET.value
                        )
                    }
                }

                '=' -> {
                    readNextCharacter()
                    createNewToken(
                        tokenType = TokenType.RIGHT_ANGLE_BRACKET_EQUALS,
                        tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET_EQUALS.value
                    )
                }

                else -> createNewToken(
                    tokenType = TokenType.RIGHT_ANGLE_BRACKET,
                    tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET.value
                )
            }
        }

        EOF_CHARACTER -> t = Token.buildEOF(
            lineNumber = tokenStartLineNumber!!,
            columnNumber = tokenStartColumnNumber!!,
        )

        else -> {
            t = if (currentCharacter.isAcceptableIdentifierStart()) {
                val identifier = readIdentifier()
                // this return is necessary to avoid the unnecessary readNextCharacter
                // call after when block
                return createNewToken(
                    tokenType = lookupIdentifier(identifier),
                    tokenLiteral = identifier,
                )
            } else if (currentCharacter.isDigit()) {
                readNumberLiteral()
            } else {
                createNewToken(tokenType = TokenType.ILLEGAL, tokenLiteral = "$currentCharacter")
            }
        }
    }

    readNextCharacter()

    tokenStartLineNumber = null
    tokenStartColumnNumber = null

    return t
}
