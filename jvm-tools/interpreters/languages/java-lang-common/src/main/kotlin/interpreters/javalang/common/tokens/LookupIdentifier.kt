package interpreters.javalang.common.tokens

fun lookupIdentifier(identifier: String): TokenType {
    return keywords[identifier] ?: TokenType.IDENTIFIER
}
