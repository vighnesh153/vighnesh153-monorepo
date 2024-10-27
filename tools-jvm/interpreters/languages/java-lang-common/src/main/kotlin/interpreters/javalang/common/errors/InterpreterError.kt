package interpreters.javalang.common.errors

data class InterpreterError(
    val errorMessage: String,
    val errorType: InterpreterErrorType,
    val lineNumber: Int,
    val columnNumber: Int,
)

fun InterpreterError.toStringForTesting(): String {
    return "Error (${errorType.name}): $errorMessage, at line='$lineNumber' and column='$columnNumber'"
}
