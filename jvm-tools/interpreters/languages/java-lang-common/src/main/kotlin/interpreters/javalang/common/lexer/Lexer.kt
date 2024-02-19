package interpreters.javalang.common.lexer

import interpreters.javalang.common.errors.InterpreterError
import interpreters.javalang.common.errors.InterpreterErrorType
import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType
import interpreters.javalang.common.tokens.lookupIdentifier
import kotlin.math.min

const val EOF_CHARACTER = Char.MIN_VALUE
const val SINGLE_QUOTE = '\''
const val DOUBLE_QUOTE = '"'

class Lexer constructor(internal val input: String) {
    // index pointing to the current position in input
    internal var currentIndex = 0

    // points to immediate next index to currentIndex
    internal var peekIndex = 0

    // current character under examination
    internal var currentCharacter = EOF_CHARACTER

    // These fields will be used while creating token
    internal var tokenStartLineNumber: Int? = null
    internal var tokenStartColumnNumber: Int? = null

    private val errors = mutableListOf<InterpreterError>()

    init {
        readNextCharacter()
    }

    fun getErrors(): List<InterpreterError> = errors

    fun addError(error: InterpreterError) {
        errors.add(error)
    }
}

internal fun Lexer.peekCharacter(): Char {
    if (peekIndex >= input.length) {
        return EOF_CHARACTER
    }
    return input[peekIndex]
}

internal fun Lexer.skipWhitespace() {
    val whiteSpaceCharacters = listOf(' ', '\t', '\n', '\r')
    while (whiteSpaceCharacters.contains(currentCharacter)) {
        readNextCharacter()
    }
}

