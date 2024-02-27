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

internal fun Parser.createNoPrefixParseFunctionFoundError(actualToken: Token) {
    val error = InterpreterError(
        errorMessage = "No prefix parse function found for token=$actualToken",
        errorType = InterpreterErrorType.PARSER_ERROR,
        lineNumber = actualToken.lineNumber,
        columnNumber = actualToken.columnNumber,
    )
    addError(error)
}

internal fun Parser.createUnexpectedNumberFormatError(errorMessage: String, actualToken: Token) {
    val error = InterpreterError(
        errorMessage = "Could not parse token=$actualToken. Error = $errorMessage",
        errorType = InterpreterErrorType.PARSER_ERROR,
        lineNumber = actualToken.lineNumber,
        columnNumber = actualToken.columnNumber,
    )
    addError(error)
}
