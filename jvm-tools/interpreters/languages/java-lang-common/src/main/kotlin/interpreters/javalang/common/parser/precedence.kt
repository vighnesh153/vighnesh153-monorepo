package interpreters.javalang.common.parser

enum class Precedence {
    Lowest,
    Equality,           // ==, !=
    Comparison,         // >, >=, <, <=
    Summation,          // +, -
    Product,            // *, /
    PrefixOperator,     // -X or !X
    FunctionCall,       // myFunction(X)
    Index,              // array[index] or string[index]
}