package interpreters.javalang.common.errors

data class InterpreterError(
    val errorMessage: String,
    val errorType: InterpreterErrorType,
    val lineNumber: Int,
    val columnNumber: Int,
)
