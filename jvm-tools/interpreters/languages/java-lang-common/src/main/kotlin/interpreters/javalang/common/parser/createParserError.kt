package interpreters.javalang.common.parser

import interpreters.javalang.common.errors.InterpreterError
import interpreters.javalang.common.errors.InterpreterErrorType
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType

internal fun Parser.createUnexpectedPeekError(expectedTokenType: TokenType, actualToken: Token) {
    val error = InterpreterError(
        errorMessage = "Expected peek to be '${expectedTokenType}', found '${actualToken.tokenType}'",
        errorType = InterpreterErrorType.PARSER_ERROR,
        lineNumber = actualToken.lineNumber,
        columnNumber = actualToken.columnNumber,
    )
    addError(error)
}