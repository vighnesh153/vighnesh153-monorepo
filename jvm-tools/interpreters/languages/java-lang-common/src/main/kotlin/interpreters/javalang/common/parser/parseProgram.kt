package interpreters.javalang.common.parser

import interpreters.javalang.common.ast.ProgramNode
import interpreters.javalang.common.tokens.TokenType

internal fun Parser.parseProgram(): ProgramNode {
    val programNode = ProgramNode()

    while (isCurrentToken(TokenType.EOF).not()) {
        val statement = parseStatement()
        if (statement != null) {
            programNode.addStatement(statement)
        }
        nextToken()
    }

    return programNode
}
