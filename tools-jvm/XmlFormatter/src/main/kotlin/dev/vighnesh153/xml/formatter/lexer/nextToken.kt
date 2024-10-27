package dev.vighnesh153.xml.formatter.lexer

fun XmlLexer.nextToken(): Token {
    lateinit var t: Token

    skipWhitespace()

    when (inputReader.currChar) {
        ':' -> {
            t = createToken(TokenType.Colon)
        }

        '=' -> {
            t = createToken(TokenType.Equals)
        }

        '<' -> {
            if (inputReader.peekChar() == '!') {
                val lineNumber = inputReader.lineNumber
                val columnNumber = inputReader.columnNumber
                val commentLiteral = readComment();
                t = if (commentLiteral != null) {
                    createToken(
                        TokenType.CommentLiteral,
                        tokenLiteral = commentLiteral,
                        lineNumber = lineNumber,
                        columnNumber = columnNumber
                    );
                } else {
                    createToken(TokenType.Illegal, tokenLiteral = inputReader.currChar.toString());
                }
            } else {
                t = createToken(TokenType.LeftAngleBracket);
            }
        }

        '>',
        -> {
            t = createToken(TokenType.RightAngleBracket);
        }

        '/' -> {
            t = createToken(TokenType.ForwardSlash);
        }

        '?',
        -> {
            t = createToken(TokenType.QuestionMark);
        }

        '"',
        -> {
            val lineNumber = inputReader.lineNumber
            val columnNumber = inputReader.columnNumber
            val s = readStringLiteral()
            t = createToken(
                TokenType.StringLiteral,
                tokenLiteral = s,
                lineNumber = lineNumber,
                columnNumber = columnNumber
            );
        }

        EOF_CHARACTER -> {
            t = createToken(TokenType.Eof);
        }

        else -> {
            if (currentToken == null || currentToken?.tokenType == TokenType.RightAngleBracket) {
                val lineNumber = inputReader.lineNumber
                val columnNumber = inputReader.columnNumber
                val textNode = readTextNode()
                t = createToken(
                    TokenType.TextNode,
                    tokenLiteral = textNode,
                    lineNumber = lineNumber,
                    columnNumber = columnNumber
                );
            } else if (inputReader.currChar?.isAcceptableIdentifierStart() == true) {
                val lineNumber = inputReader.lineNumber
                val columnNumber = inputReader.columnNumber
                val identifier = readIdentifier()
                t = createToken(
                    TokenType.Identifier,
                    tokenLiteral = identifier,
                    lineNumber = lineNumber,
                    columnNumber = columnNumber
                );
            } else {
                addError(
                    IllegalCharacterLexerError(
                        ch = inputReader.currChar,
                        lineNumber = inputReader.lineNumber,
                        columnNumber = inputReader.columnNumber,
                    )
                );
                t = createToken(TokenType.Illegal, tokenLiteral = inputReader.currChar.toString());
            }
        }
    }

    inputReader.readNextChar()

    currentToken = t
    return t
}

private fun XmlLexer.createToken(
    tokenType: TokenType,
    tokenLiteral: String = tokenType.value,
    lineNumber: Int = inputReader.lineNumber,
    columnNumber: Int = inputReader.columnNumber,
): Token = Token(
    tokenType = tokenType,
    tokenLiteral = tokenLiteral,
    lineNumber = lineNumber,
    columnNumber = columnNumber,
)
