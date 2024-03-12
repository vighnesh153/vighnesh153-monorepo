package interpreters.javalang.common.parser

import interpreters.javalang.common.tokens.TokenType

enum class Precedence {
    Lowest,

    // =, +=, -=, %=, /=, *=, ^=
    Assignment,

    // ==, !=
    Equality,

    // |
    BitwiseOR,

    // ^
    BitwiseXOR,

    // &
    BitwiseAND,

    // ||
    LogicalOR,

    // &&
    LogicalAND,

    // >, >=, <, <=, instanceof
    Relational,

    // <<, >>, >>>
    Shift,

    // +, -
    Additive,

    // *, /, %
    Multiplicative,

    // -X or !X
    PrefixPostfixOperator,

    // myFunction(X)
    FunctionCall,

    // array[index] or string[index]
    Index,
}

// Source: https://introcs.cs.princeton.edu/java/11precedence/
val precedences = mapOf(
    // TODO: lambda expression arrow

    // assignment
    TokenType.EQUALS to Precedence.Assignment,
    TokenType.PLUS_EQUALS to Precedence.Assignment,
    TokenType.MINUS_EQUALS to Precedence.Assignment,
    TokenType.ASTERISK_EQUALS to Precedence.Assignment,
    TokenType.FORWARD_SLASH_EQUALS to Precedence.Assignment,
    TokenType.MODULUS_EQUALS to Precedence.Assignment,
    TokenType.AMPERSAND_EQUALS to Precedence.Assignment,
    TokenType.CARET_EQUALS to Precedence.Assignment,
    TokenType.VERTICAL_BAR_EQUALS to Precedence.Assignment,
    TokenType.DOUBLE_LEFT_ANGLE_BRACKET_EQUALS to Precedence.Assignment,
    TokenType.DOUBLE_RIGHT_ANGLE_BRACKET_EQUALS to Precedence.Assignment,
    TokenType.TRIPLE_RIGHT_ANGLE_BRACKET_EQUALS to Precedence.Assignment,

    // TODO: ternary

    // logical
    TokenType.DOUBLE_AMPERSAND to Precedence.LogicalAND,
    TokenType.DOUBLE_VERTICAL_BAR to Precedence.LogicalOR,

    // bitwise operators
    TokenType.AMPERSAND to Precedence.BitwiseAND,
    TokenType.CARET to Precedence.BitwiseXOR,
    TokenType.VERTICAL_BAR to Precedence.BitwiseOR,

    // equality
    TokenType.DOUBLE_EQUALS to Precedence.Equality,
    TokenType.BANG_EQUALS to Precedence.Equality,

    // comparison
    TokenType.LEFT_ANGLE_BRACKET to Precedence.Relational,
    TokenType.LEFT_ANGLE_BRACKET_EQUALS to Precedence.Relational,
    TokenType.RIGHT_ANGLE_BRACKET to Precedence.Relational,
    TokenType.RIGHT_ANGLE_BRACKET_EQUALS to Precedence.Relational,
    TokenType.INSTANCEOF_OPERATOR to Precedence.Relational,

    // shift
    TokenType.DOUBLE_LEFT_ANGLE_BRACKET to Precedence.Shift,
    TokenType.DOUBLE_RIGHT_ANGLE_BRACKET to Precedence.Shift,
    TokenType.TRIPLE_RIGHT_ANGLE_BRACKET to Precedence.Shift,

    // additive
    TokenType.PLUS to Precedence.Additive,
    TokenType.MINUS to Precedence.Additive,

    // multiplicative
    TokenType.ASTERISK to Precedence.Multiplicative,
    TokenType.FORWARD_SLASH to Precedence.Multiplicative,
    TokenType.MODULUS to Precedence.Multiplicative,

    // TODO: type cast operator: (int) 10.0
    // TODO: object creation using "new"

    // prefix/postfix
    TokenType.PLUS to Precedence.PrefixPostfixOperator,
    TokenType.MINUS to Precedence.PrefixPostfixOperator,
    TokenType.BANG to Precedence.PrefixPostfixOperator,
    TokenType.TILDE to Precedence.PrefixPostfixOperator,
    TokenType.INCREMENT to Precedence.PrefixPostfixOperator,
    TokenType.DECREMENT to Precedence.PrefixPostfixOperator,

    // TODO: parentheses: (), array access: [], member access: .
)
