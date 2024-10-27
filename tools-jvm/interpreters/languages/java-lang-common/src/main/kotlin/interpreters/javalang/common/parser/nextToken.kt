package interpreters.javalang.common.parser

import interpreters.javalang.common.lexer.nextToken

fun Parser.nextToken() {
    if (isPeekTokenInitialized()) {
        currentToken = peekToken
    }
    peekToken = lexer.nextToken()
}
