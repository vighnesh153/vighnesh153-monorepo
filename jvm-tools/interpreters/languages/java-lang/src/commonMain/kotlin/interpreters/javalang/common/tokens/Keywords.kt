package interpreters.javalang.common.tokens

fun lookupIdentifier(identifier: String): TokenType {
    return keywords[identifier] ?: TokenType.IDENTIFIER
}

private val keywords = mapOf(
    "instanceof" to TokenType.INSTANCEOF_OPERATOR,

    "abstract" to TokenType.ABSTRACT_KEYWORD,
    "continue" to TokenType.CONTINUE_KEYWORD,
    "for" to TokenType.FOR_KEYWORD,
    "new" to TokenType.NEW_KEYWORD,
    "switch" to TokenType.SWITCH_KEYWORD,
    "default" to TokenType.DEFAULT_KEYWORD,
    "package" to TokenType.PACKAGE_KEYWORD,
    "boolean" to TokenType.BOOLEAN_KEYWORD,
    "do" to TokenType.DO_KEYWORD,
    "if" to TokenType.IF_KEYWORD,
    "private" to TokenType.PRIVATE_KEYWORD,
    "this" to TokenType.THIS_KEYWORD,
    "break" to TokenType.BREAK_KEYWORD,
    "double" to TokenType.DOUBLE_KEYWORD,
    "implements" to TokenType.IMPLEMENTS_KEYWORD,
    "protected" to TokenType.PROTECTED_KEYWORD,
    "throw" to TokenType.THROW_KEYWORD,
    "throws" to TokenType.THROWS_KEYWORD,
    "byte" to TokenType.BYTE_KEYWORD,
    "else" to TokenType.ELSE_KEYWORD,
    "import" to TokenType.IMPORT_KEYWORD,
    "public" to TokenType.PUBLIC_KEYWORD,
    "case" to TokenType.CASE_KEYWORD,
    "enum" to TokenType.ENUM_KEYWORD,
    "return" to TokenType.RETURN_KEYWORD,
    "catch" to TokenType.CATCH_KEYWORD,
    "extends" to TokenType.EXTENDS_KEYWORD,
    "int" to TokenType.INTEGER_KEYWORD,
    "short" to TokenType.SHORT_KEYWORD,
    "try" to TokenType.TRY_KEYWORD,
    "char" to TokenType.CHARACTER_KEYWORD,
    "final" to TokenType.FINAL_KEYWORD,
    "interface" to TokenType.INTERFACE_KEYWORD,
    "static" to TokenType.STATIC_KEYWORD,
    "void" to TokenType.VOID_KEYWORD,
    "class" to TokenType.CLASS_KEYWORD,
    "finally" to TokenType.FINALLY_KEYWORD,
    "long" to TokenType.LONG_KEYWORD,
    "float" to TokenType.FLOAT_KEYWORD,
    "super" to TokenType.SUPER_KEYWORD,
    "while" to TokenType.WHILE_KEYWORD,
)