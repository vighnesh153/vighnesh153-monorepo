package interpreters.javalang.common.parser

import interpreters.javalang.common.errors.InterpreterError
import interpreters.javalang.common.lexer.Lexer

fun createParser(input: String): Parser {
    val errors = mutableListOf<InterpreterError>()
    val lexer = Lexer(input = input, errors = errors)
    return Parser(lexer = lexer, errors = errors)
}
