package interpreters.javalang.common.errors

fun createInterpreterError(
    errorMessage: String,
    errorType: InterpreterErrorType,
    lineNumber: Int,
    columnNumber: Int,
): InterpreterError {
    return InterpreterError(
        errorMessage = errorMessage,
        errorType = errorType,
        lineNumber = lineNumber,
        columnNumber = columnNumber,
    )
}