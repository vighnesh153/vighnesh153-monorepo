package interpreters.javalang.common.lexer

import interpreters.javalang.common.errors.InterpreterError
import interpreters.javalang.common.errors.InterpreterErrorType

internal fun Lexer.createLexerError(errorMessage: String): InterpreterError {
    return InterpreterError(
        errorMessage = errorMessage,
        errorType = InterpreterErrorType.LEXER_ERROR,
        lineNumber = lineNumber(),
        columnNumber = columnNumber(),
    )
}
