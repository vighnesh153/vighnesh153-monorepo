package interpreters.javalang.common.tokens

enum class TokenType(val value: String) {
    ILLEGAL("ILLEGAL"),
    EOF("EOF"),

    IDENTIFIER("IDENTIFIER"),
    SINGLE_LINE_COMMENT("SINGLE_LINE_COMMENT"),
    MULTI_LINE_COMMENT("MULTI_LINE_COMMENT"),
    INTEGER_LITERAL("INTEGER_LITERAL"),
    FLOAT_LITERAL("FLOAT_LITERAL"),
    LONG_LITERAL("LONG_LITERAL"),
    DOUBLE_LITERAL("DOUBLE_LITERAL"),
    STRING_LITERAL("STRING_LITERAL"),
    CHARACTER_LITERAL("CHARACTER_LITERAL"),

    AT_SIGN("@"),
    EQUALS("="),
    DOUBLE_EQUALS("=="),
    PLUS("+"),
    INCREMENT("++"),
    PLUS_EQUALS("+="),
    MINUS("-"),
    DECREMENT("--"),
    MINUS_EQUALS("-="),
    ASTERISK("*"),
    ASTERISK_EQUALS("*="),
    FORWARD_SLASH("/"),
    FORWARD_SLASH_EQUALS("/="),
    BACK_SLASH("\\"),
    MODULUS("%"),
    MODULUS_EQUALS("%="),
    BANG("!"),
    BANG_EQUALS("!="),

    AMPERSAND("&"),
    AMPERSAND_EQUALS("&="),
    DOUBLE_AMPERSAND("&&"),
    VERTICAL_BAR("|"),
    VERTICAL_BAR_EQUALS("|="),
    DOUBLE_VERTICAL_BAR("||"),
    CARET("^"),
    CARET_EQUALS("^="),
    QUESTION("?"),
    COLON(":"),
    SEMICOLON(";"),
    COMMA(","),
    DOT("."),
    TILDE("~"),

    LEFT_PARENTHESIS("("),
    RIGHT_PARENTHESIS(")"),
    LEFT_CURLY_BRACE("{"),
    RIGHT_CURLY_BRACE("}"),
    LEFT_SQUARE_BRACKET("["),
    RIGHT_SQUARE_BRACKET("]"),
    LEFT_ANGLE_BRACKET("<"),
    DOUBLE_LEFT_ANGLE_BRACKET("<<"),
    DOUBLE_LEFT_ANGLE_BRACKET_EQUALS("<<="),
    LEFT_ANGLE_BRACKET_EQUALS("<="),
    RIGHT_ANGLE_BRACKET(">"),
    DOUBLE_RIGHT_ANGLE_BRACKET(">>"),
    DOUBLE_RIGHT_ANGLE_BRACKET_EQUALS(">>="),
    RIGHT_ANGLE_BRACKET_EQUALS(">="),
    TRIPLE_RIGHT_ANGLE_BRACKET(">>>"),
    TRIPLE_RIGHT_ANGLE_BRACKET_EQUALS(">>>="),

    // keywords
    ABSTRACT_KEYWORD("ABSTRACT"),
    CONTINUE_KEYWORD("CONTINUE"),
    FOR_KEYWORD("FOR"),
    NEW_KEYWORD("NEW"),
    SWITCH_KEYWORD("SWITCH"),
    DEFAULT_KEYWORD("DEFAULT"),
    PACKAGE_KEYWORD("PACKAGE"),
    BOOLEAN_KEYWORD("BOOLEAN"),
    DO_KEYWORD("DO"),
    IF_KEYWORD("IF"),
    PRIVATE_KEYWORD("PRIVATE"),
    THIS_KEYWORD("THIS"),
    BREAK_KEYWORD("BREAK"),
    DOUBLE_KEYWORD("DOUBLE"),
    IMPLEMENTS_KEYWORD("IMPLEMENTS"),
    PROTECTED_KEYWORD("PROTECTED"),
    THROW_KEYWORD("THROW"),
    THROWS_KEYWORD("THROWS"),
    BYTE_KEYWORD("BYTE"),
    ELSE_KEYWORD("ELSE"),
    IMPORT_KEYWORD("IMPORT"),
    PUBLIC_KEYWORD("PUBLIC"),
    CASE_KEYWORD("CASE"),
    ENUM_KEYWORD("ENUM"),
    INSTANCEOF_OPERATOR("INSTANCEOF"),
    RETURN_KEYWORD("RETURN"),
    CATCH_KEYWORD("CATCH"),
    EXTENDS_KEYWORD("EXTENDS"),
    INTEGER_KEYWORD("INTEGER_KEYWORD"),
    SHORT_KEYWORD("SHORT_KEYWORD"),
    TRY_KEYWORD("TRY"),
    CHARACTER_KEYWORD("CHAR_KEYWORD"),
    FINAL_KEYWORD("FINAL"),
    INTERFACE_KEYWORD("INTERFACE"),
    STATIC_KEYWORD("STATIC"),
    VOID_KEYWORD("VOID"),
    CLASS_KEYWORD("CLASS"),
    FINALLY_KEYWORD("FINALLY"),
    LONG_KEYWORD("LONG_KEYWORD"),
    FLOAT_KEYWORD("FLOAT_KEYWORD"),
    SUPER_KEYWORD("SUPER"),
    WHILE_KEYWORD("WHILE"),
    TRUE_KEYWORD("TRUE"),
    FALSE_KEYWORD("FALSE");

    override fun toString(): String {
        return value
    }
}
