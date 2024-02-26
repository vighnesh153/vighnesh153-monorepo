package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals

class LexerNextTokenSuccessTest {
    @Test
    fun lexerNextToken() {
        val input = """

,;@+-*/\%!&|^?:.~

(){}[]<>

abc _aa a123 __11 _

a == b== c

a ++
b += c + ++d

x --
y-= z++ - --a

a *=b*= c = d

a /= b/c = d

a %=  b  %c = d

a!=b !c =d

a &&b &c&&d &e

a|b||c||d|e

a^b^c^=d^e

instanceof abstract continue for new switch default package 
boolean do if private this break double implements protected 
throw throws byte else 
import public case enum return catch extends int short try char
final interface static void class finally long float super while

a < b <<c <= d

a >> b > c >>> d >= e

a + b

'a' '\n' '\t' '\'' '"' '\\' '\u1323' 

 "pikachu"  "pika \n chu" "pika \t\u1244 chu\n" 
 
a + b // hi there

x-y/**pikachu
greninja*/z

// hello
a

1 23l 34.4 41.42 100.42f 1.f .0f

a=1.312f+231l+121.f+2121

"""

        val expectedTokens = listOf(

            // ,;@+-*/\%!&|^?:.~
            ExpectedToken(
                id = 0,
                tokenType = TokenType.COMMA,
                tokenLiteral = TokenType.COMMA.value,
                lineNumber = 3,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 1,
                tokenType = TokenType.SEMICOLON,
                tokenLiteral = TokenType.SEMICOLON.value,
                lineNumber = 3,
                columnNumber = 2
            ),
            ExpectedToken(
                id = 2,
                tokenType = TokenType.AT_SIGN,
                tokenLiteral = TokenType.AT_SIGN.value,
                lineNumber = 3,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 3,
                tokenType = TokenType.PLUS,
                tokenLiteral = TokenType.PLUS.value,
                lineNumber = 3,
                columnNumber = 4
            ),
            ExpectedToken(
                id = 4,
                tokenType = TokenType.MINUS,
                tokenLiteral = TokenType.MINUS.value,
                lineNumber = 3,
                columnNumber = 5
            ),
            ExpectedToken(
                id = 5,
                tokenType = TokenType.ASTERISK,
                tokenLiteral = TokenType.ASTERISK.value,
                lineNumber = 3,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 6,
                tokenType = TokenType.FORWARD_SLASH,
                tokenLiteral = TokenType.FORWARD_SLASH.value,
                lineNumber = 3,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 7,
                tokenType = TokenType.BACK_SLASH,
                tokenLiteral = TokenType.BACK_SLASH.value,
                lineNumber = 3,
                columnNumber = 8
            ),
            ExpectedToken(
                id = 8,
                tokenType = TokenType.MODULUS,
                tokenLiteral = TokenType.MODULUS.value,
                lineNumber = 3,
                columnNumber = 9
            ),
            ExpectedToken(
                id = 9,
                tokenType = TokenType.BANG,
                tokenLiteral = TokenType.BANG.value,
                lineNumber = 3,
                columnNumber = 10
            ),
            ExpectedToken(
                id = 10,
                tokenType = TokenType.AMPERSAND,
                tokenLiteral = TokenType.AMPERSAND.value,
                lineNumber = 3,
                columnNumber = 11
            ),
            ExpectedToken(
                id = 11,
                tokenType = TokenType.VERTICAL_BAR,
                tokenLiteral = TokenType.VERTICAL_BAR.value,
                lineNumber = 3,
                columnNumber = 12
            ),
            ExpectedToken(
                id = 12,
                tokenType = TokenType.CARET,
                tokenLiteral = TokenType.CARET.value,
                lineNumber = 3,
                columnNumber = 13
            ),
            ExpectedToken(
                id = 13,
                tokenType = TokenType.QUESTION,
                tokenLiteral = TokenType.QUESTION.value,
                lineNumber = 3,
                columnNumber = 14
            ),
            ExpectedToken(
                id = 14,
                tokenType = TokenType.COLON,
                tokenLiteral = TokenType.COLON.value,
                lineNumber = 3,
                columnNumber = 15
            ),
            ExpectedToken(
                id = 15,
                tokenType = TokenType.DOT,
                tokenLiteral = TokenType.DOT.value,
                lineNumber = 3,
                columnNumber = 16
            ),
            ExpectedToken(
                id = 16,
                tokenType = TokenType.TILDE,
                tokenLiteral = TokenType.TILDE.value,
                lineNumber = 3,
                columnNumber = 17
            ),

            // (){}[]<>
            ExpectedToken(
                id = 20,
                tokenType = TokenType.LEFT_PARENTHESIS,
                tokenLiteral = TokenType.LEFT_PARENTHESIS.value,
                lineNumber = 5,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 21,
                tokenType = TokenType.RIGHT_PARENTHESIS,
                tokenLiteral = TokenType.RIGHT_PARENTHESIS.value,
                lineNumber = 5,
                columnNumber = 2
            ),
            ExpectedToken(
                id = 22,
                tokenType = TokenType.LEFT_CURLY_BRACE,
                tokenLiteral = TokenType.LEFT_CURLY_BRACE.value,
                lineNumber = 5,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 23,
                tokenType = TokenType.RIGHT_CURLY_BRACE,
                tokenLiteral = TokenType.RIGHT_CURLY_BRACE.value,
                lineNumber = 5,
                columnNumber = 4
            ),
            ExpectedToken(
                id = 24,
                tokenType = TokenType.LEFT_SQUARE_BRACKET,
                tokenLiteral = TokenType.LEFT_SQUARE_BRACKET.value,
                lineNumber = 5,
                columnNumber = 5
            ),
            ExpectedToken(
                id = 25,
                tokenType = TokenType.RIGHT_SQUARE_BRACKET,
                tokenLiteral = TokenType.RIGHT_SQUARE_BRACKET.value,
                lineNumber = 5,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 26,
                tokenType = TokenType.LEFT_ANGLE_BRACKET,
                tokenLiteral = TokenType.LEFT_ANGLE_BRACKET.value,
                lineNumber = 5,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 27,
                tokenType = TokenType.RIGHT_ANGLE_BRACKET,
                tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET.value,
                lineNumber = 5,
                columnNumber = 8
            ),

            // abc _aa a123 __11 _
            ExpectedToken(
                id = 28,
                tokenType = TokenType.IDENTIFIER,
                tokenLiteral = "abc",
                lineNumber = 7,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 29,
                tokenType = TokenType.IDENTIFIER,
                tokenLiteral = "_aa",
                lineNumber = 7,
                columnNumber = 5
            ),
            ExpectedToken(
                id = 30,
                tokenType = TokenType.IDENTIFIER,
                tokenLiteral = "a123",
                lineNumber = 7,
                columnNumber = 9
            ),
            ExpectedToken(
                id = 31,
                tokenType = TokenType.IDENTIFIER,
                tokenLiteral = "__11",
                lineNumber = 7,
                columnNumber = 14
            ),
            ExpectedToken(
                id = 32,
                tokenType = TokenType.IDENTIFIER,
                tokenLiteral = "_",
                lineNumber = 7,
                columnNumber = 19
            ),

            // a == b== c
            ExpectedToken(
                id = 33, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 9,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 34, tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = "==",
                lineNumber = 9,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 35, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 9,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 36, tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = "==",
                lineNumber = 9,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 37, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 9,
                columnNumber = 10
            ),

            // a ++
            // b += c + ++d
            ExpectedToken(
                id = 38, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 11,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 39, tokenType = TokenType.INCREMENT, tokenLiteral = "++",
                lineNumber = 11,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 40, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 12,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 41, tokenType = TokenType.PLUS_EQUALS, tokenLiteral = "+=",
                lineNumber = 12,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 42, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 12,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 43, tokenType = TokenType.PLUS, tokenLiteral = "+",
                lineNumber = 12,
                columnNumber = 8
            ),
            ExpectedToken(
                id = 44, tokenType = TokenType.INCREMENT, tokenLiteral = "++",
                lineNumber = 12,
                columnNumber = 10
            ),
            ExpectedToken(
                id = 45, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 12,
                columnNumber = 12
            ),

            // x --
            // y-= z++ - --a
            ExpectedToken(
                id = 46, tokenType = TokenType.IDENTIFIER, tokenLiteral = "x",
                lineNumber = 14,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 47, tokenType = TokenType.DECREMENT, tokenLiteral = "--",
                lineNumber = 14,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 48, tokenType = TokenType.IDENTIFIER, tokenLiteral = "y",
                lineNumber = 15,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 49, tokenType = TokenType.MINUS_EQUALS, tokenLiteral = "-=",
                lineNumber = 15,
                columnNumber = 2
            ),
            ExpectedToken(
                id = 50, tokenType = TokenType.IDENTIFIER, tokenLiteral = "z",
                lineNumber = 15,
                columnNumber = 5
            ),
            ExpectedToken(
                id = 51, tokenType = TokenType.INCREMENT, tokenLiteral = "++",
                lineNumber = 15,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 52, tokenType = TokenType.MINUS, tokenLiteral = "-",
                lineNumber = 15,
                columnNumber = 9
            ),
            ExpectedToken(
                id = 53, tokenType = TokenType.DECREMENT, tokenLiteral = "--",
                lineNumber = 15,
                columnNumber = 11
            ),
            ExpectedToken(
                id = 54, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 15,
                columnNumber = 13
            ),

            // a *=b*= c = d
            ExpectedToken(
                id = 55, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 17,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 56, tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = "*=",
                lineNumber = 17,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 57, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 17,
                columnNumber = 5
            ),
            ExpectedToken(
                id = 58, tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = "*=",
                lineNumber = 17,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 59, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 17,
                columnNumber = 9
            ),
            ExpectedToken(
                id = 60, tokenType = TokenType.EQUALS, tokenLiteral = "=",
                lineNumber = 17,
                columnNumber = 11
            ),
            ExpectedToken(
                id = 61, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 17,
                columnNumber = 13
            ),

            // a /= b/c = d
            ExpectedToken(
                id = 62, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 19,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 63, tokenType = TokenType.FORWARD_SLASH_EQUALS, tokenLiteral = "/=",
                lineNumber = 19,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 64, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 19,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 65, tokenType = TokenType.FORWARD_SLASH, tokenLiteral = "/",
                lineNumber = 19,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 66, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 19,
                columnNumber = 8
            ),
            ExpectedToken(
                id = 67, tokenType = TokenType.EQUALS, tokenLiteral = "=",
                lineNumber = 19,
                columnNumber = 10
            ),
            ExpectedToken(
                id = 68, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 19,
                columnNumber = 12
            ),

            //a %=  b  %c = d
            ExpectedToken(
                id = 69, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 21,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 70, tokenType = TokenType.MODULUS_EQUALS, tokenLiteral = "%=",
                lineNumber = 21,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 71, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 21,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 72, tokenType = TokenType.MODULUS, tokenLiteral = "%",
                lineNumber = 21,
                columnNumber = 10
            ),
            ExpectedToken(
                id = 73, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 21,
                columnNumber = 11
            ),
            ExpectedToken(
                id = 74, tokenType = TokenType.EQUALS, tokenLiteral = "=",
                lineNumber = 21,
                columnNumber = 13
            ),
            ExpectedToken(
                id = 75, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 21,
                columnNumber = 15
            ),

            // a!=b !c =d
            ExpectedToken(
                id = 76, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 23,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 77, tokenType = TokenType.BANG_EQUALS, tokenLiteral = "!=",
                lineNumber = 23,
                columnNumber = 2
            ),
            ExpectedToken(
                id = 78, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 23,
                columnNumber = 4
            ),
            ExpectedToken(
                id = 79, tokenType = TokenType.BANG, tokenLiteral = "!",
                lineNumber = 23,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 80, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 23,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 81, tokenType = TokenType.EQUALS, tokenLiteral = "=",
                lineNumber = 23,
                columnNumber = 9
            ),
            ExpectedToken(
                id = 82, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 23,
                columnNumber = 10
            ),

            //a &&b &c&&d &e
            ExpectedToken(
                id = 83, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 25,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 84, tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = "&&",
                lineNumber = 25,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 85, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 25,
                columnNumber = 5
            ),
            ExpectedToken(
                id = 86, tokenType = TokenType.AMPERSAND, tokenLiteral = "&",
                lineNumber = 25,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 87, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 25,
                columnNumber = 8
            ),
            ExpectedToken(
                id = 88, tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = "&&",
                lineNumber = 25,
                columnNumber = 9
            ),
            ExpectedToken(
                id = 89, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 25,
                columnNumber = 11
            ),
            ExpectedToken(
                id = 90, tokenType = TokenType.AMPERSAND, tokenLiteral = "&",
                lineNumber = 25,
                columnNumber = 13
            ),
            ExpectedToken(
                id = 91, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e",
                lineNumber = 25,
                columnNumber = 14
            ),

            // a|b||c||d|e
            ExpectedToken(
                id = 92, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 27,
                columnNumber = 1
            ),
            ExpectedToken(
                id = 93, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = "|",
                lineNumber = 27,
                columnNumber = 2
            ),
            ExpectedToken(
                id = 94, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 27,
                columnNumber = 3
            ),
            ExpectedToken(
                id = 95, tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = "||",
                lineNumber = 27,
                columnNumber = 4
            ),
            ExpectedToken(
                id = 96, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 27,
                columnNumber = 6
            ),
            ExpectedToken(
                id = 97, tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = "||",
                lineNumber = 27,
                columnNumber = 7
            ),
            ExpectedToken(
                id = 98, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 27,
                columnNumber = 9
            ),
            ExpectedToken(
                id = 99, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = "|",
                lineNumber = 27,
                columnNumber = 10
            ),
            ExpectedToken(
                id = 100, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e",
                lineNumber = 27, columnNumber = 11
            ),

            // a^b^c^=d^e
            ExpectedToken(
                id = 101, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 29, columnNumber = 1
            ),
            ExpectedToken(
                id = 102, tokenType = TokenType.CARET, tokenLiteral = "^",
                lineNumber = 29, columnNumber = 2
            ),
            ExpectedToken(
                id = 103, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 29, columnNumber = 3
            ),
            ExpectedToken(
                id = 104, tokenType = TokenType.CARET, tokenLiteral = "^",
                lineNumber = 29, columnNumber = 4
            ),
            ExpectedToken(
                id = 105, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 29, columnNumber = 5
            ),
            ExpectedToken(
                id = 106, tokenType = TokenType.CARET_EQUALS, tokenLiteral = "^=",
                lineNumber = 29, columnNumber = 6
            ),
            ExpectedToken(
                id = 107, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 29, columnNumber = 8
            ),
            ExpectedToken(
                id = 108, tokenType = TokenType.CARET, tokenLiteral = "^",
                lineNumber = 29, columnNumber = 9
            ),
            ExpectedToken(
                id = 109, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e",
                lineNumber = 29, columnNumber = 10
            ),

            // instanceof abstract continue for new switch default package
            ExpectedToken(
                id = 110, tokenType = TokenType.INSTANCEOF_OPERATOR, tokenLiteral = "instanceof",
                lineNumber = 31, columnNumber = 1
            ),
            ExpectedToken(
                id = 111, tokenType = TokenType.ABSTRACT_KEYWORD, tokenLiteral = "abstract",
                lineNumber = 31, columnNumber = 12
            ),
            ExpectedToken(
                id = 112, tokenType = TokenType.CONTINUE_KEYWORD, tokenLiteral = "continue",
                lineNumber = 31, columnNumber = 21
            ),
            ExpectedToken(
                id = 113, tokenType = TokenType.FOR_KEYWORD, tokenLiteral = "for",
                lineNumber = 31, columnNumber = 30
            ),
            ExpectedToken(
                id = 114, tokenType = TokenType.NEW_KEYWORD, tokenLiteral = "new",
                lineNumber = 31, columnNumber = 34
            ),
            ExpectedToken(
                id = 115, tokenType = TokenType.SWITCH_KEYWORD, tokenLiteral = "switch",
                lineNumber = 31, columnNumber = 38
            ),
            ExpectedToken(
                id = 116, tokenType = TokenType.DEFAULT_KEYWORD, tokenLiteral = "default",
                lineNumber = 31, columnNumber = 45
            ),
            ExpectedToken(
                id = 117, tokenType = TokenType.PACKAGE_KEYWORD, tokenLiteral = "package",
                lineNumber = 31, columnNumber = 53
            ),

            // boolean do if private this break double implements protected
            ExpectedToken(
                id = 118, tokenType = TokenType.BOOLEAN_KEYWORD, tokenLiteral = "boolean",
                lineNumber = 32, columnNumber = 1
            ),
            ExpectedToken(
                id = 119, tokenType = TokenType.DO_KEYWORD, tokenLiteral = "do",
                lineNumber = 32, columnNumber = 9
            ),
            ExpectedToken(
                id = 120, tokenType = TokenType.IF_KEYWORD, tokenLiteral = "if",
                lineNumber = 32, columnNumber = 12
            ),
            ExpectedToken(
                id = 121, tokenType = TokenType.PRIVATE_KEYWORD, tokenLiteral = "private",
                lineNumber = 32, columnNumber = 15
            ),
            ExpectedToken(
                id = 122, tokenType = TokenType.THIS_KEYWORD, tokenLiteral = "this",
                lineNumber = 32, columnNumber = 23
            ),
            ExpectedToken(
                id = 123, tokenType = TokenType.BREAK_KEYWORD, tokenLiteral = "break",
                lineNumber = 32, columnNumber = 28
            ),
            ExpectedToken(
                id = 124, tokenType = TokenType.DOUBLE_KEYWORD, tokenLiteral = "double",
                lineNumber = 32, columnNumber = 34
            ),
            ExpectedToken(
                id = 125, tokenType = TokenType.IMPLEMENTS_KEYWORD, tokenLiteral = "implements",
                lineNumber = 32, columnNumber = 41
            ),
            ExpectedToken(
                id = 126, tokenType = TokenType.PROTECTED_KEYWORD, tokenLiteral = "protected",
                lineNumber = 32, columnNumber = 52
            ),

            // throw throws byte else
            ExpectedToken(
                id = 127, tokenType = TokenType.THROW_KEYWORD, tokenLiteral = "throw",
                lineNumber = 33, columnNumber = 1
            ),
            ExpectedToken(
                id = 128, tokenType = TokenType.THROWS_KEYWORD, tokenLiteral = "throws",
                lineNumber = 33, columnNumber = 7
            ),
            ExpectedToken(
                id = 129, tokenType = TokenType.BYTE_KEYWORD, tokenLiteral = "byte",
                lineNumber = 33, columnNumber = 14
            ),
            ExpectedToken(
                id = 130, tokenType = TokenType.ELSE_KEYWORD, tokenLiteral = "else",
                lineNumber = 33, columnNumber = 19
            ),

            // import public case enum return catch extends int short try char
            ExpectedToken(
                id = 131, tokenType = TokenType.IMPORT_KEYWORD, tokenLiteral = "import",
                lineNumber = 34, columnNumber = 1
            ),
            ExpectedToken(
                id = 132, tokenType = TokenType.PUBLIC_KEYWORD, tokenLiteral = "public",
                lineNumber = 34, columnNumber = 8
            ),
            ExpectedToken(
                id = 133, tokenType = TokenType.CASE_KEYWORD, tokenLiteral = "case",
                lineNumber = 34, columnNumber = 15
            ),
            ExpectedToken(
                id = 134, tokenType = TokenType.ENUM_KEYWORD, tokenLiteral = "enum",
                lineNumber = 34, columnNumber = 20
            ),
            ExpectedToken(
                id = 135, tokenType = TokenType.RETURN_KEYWORD, tokenLiteral = "return",
                lineNumber = 34, columnNumber = 25
            ),
            ExpectedToken(
                id = 136, tokenType = TokenType.CATCH_KEYWORD, tokenLiteral = "catch",
                lineNumber = 34, columnNumber = 32
            ),
            ExpectedToken(
                id = 137, tokenType = TokenType.EXTENDS_KEYWORD, tokenLiteral = "extends",
                lineNumber = 34, columnNumber = 38
            ),
            ExpectedToken(
                id = 138, tokenType = TokenType.INTEGER_KEYWORD, tokenLiteral = "int",
                lineNumber = 34, columnNumber = 46
            ),
            ExpectedToken(
                id = 139, tokenType = TokenType.SHORT_KEYWORD, tokenLiteral = "short",
                lineNumber = 34, columnNumber = 50
            ),
            ExpectedToken(
                id = 140, tokenType = TokenType.TRY_KEYWORD, tokenLiteral = "try",
                lineNumber = 34, columnNumber = 56
            ),
            ExpectedToken(
                id = 141, tokenType = TokenType.CHARACTER_KEYWORD, tokenLiteral = "char",
                lineNumber = 34, columnNumber = 60
            ),

            // final interface static void class finally long float super while
            ExpectedToken(
                id = 142, tokenType = TokenType.FINAL_KEYWORD, tokenLiteral = "final",
                lineNumber = 35, columnNumber = 1
            ),
            ExpectedToken(
                id = 143, tokenType = TokenType.INTERFACE_KEYWORD, tokenLiteral = "interface",
                lineNumber = 35, columnNumber = 7
            ),
            ExpectedToken(
                id = 144, tokenType = TokenType.STATIC_KEYWORD, tokenLiteral = "static",
                lineNumber = 35, columnNumber = 17
            ),
            ExpectedToken(
                id = 145, tokenType = TokenType.VOID_KEYWORD, tokenLiteral = "void",
                lineNumber = 35, columnNumber = 24
            ),
            ExpectedToken(
                id = 146, tokenType = TokenType.CLASS_KEYWORD, tokenLiteral = "class",
                lineNumber = 35, columnNumber = 29
            ),
            ExpectedToken(
                id = 147, tokenType = TokenType.FINALLY_KEYWORD, tokenLiteral = "finally",
                lineNumber = 35, columnNumber = 35
            ),
            ExpectedToken(
                id = 148, tokenType = TokenType.LONG_KEYWORD, tokenLiteral = "long",
                lineNumber = 35, columnNumber = 43
            ),
            ExpectedToken(
                id = 149, tokenType = TokenType.FLOAT_KEYWORD, tokenLiteral = "float",
                lineNumber = 35, columnNumber = 48
            ),
            ExpectedToken(
                id = 150, tokenType = TokenType.SUPER_KEYWORD, tokenLiteral = "super",
                lineNumber = 35, columnNumber = 54
            ),
            ExpectedToken(
                id = 151, tokenType = TokenType.WHILE_KEYWORD, tokenLiteral = "while",
                lineNumber = 35, columnNumber = 60
            ),

            // a < b <<c <= d
            ExpectedToken(
                id = 152, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 37, columnNumber = 1
            ),
            ExpectedToken(
                id = 153, tokenType = TokenType.LEFT_ANGLE_BRACKET, tokenLiteral = "<",
                lineNumber = 37, columnNumber = 3
            ),
            ExpectedToken(
                id = 154, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 37, columnNumber = 5
            ),
            ExpectedToken(
                id = 155, tokenType = TokenType.DOUBLE_LEFT_ANGLE_BRACKET, tokenLiteral = "<<",
                lineNumber = 37, columnNumber = 7
            ),
            ExpectedToken(
                id = 156, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 37, columnNumber = 9
            ),
            ExpectedToken(
                id = 157, tokenType = TokenType.LEFT_ANGLE_BRACKET_EQUALS, tokenLiteral = "<=",
                lineNumber = 37, columnNumber = 11
            ),
            ExpectedToken(
                id = 158, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 37, columnNumber = 14
            ),

            // a >> b > c >>> d >> e
            ExpectedToken(
                id = 159, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 39, columnNumber = 1
            ),
            ExpectedToken(
                id = 160, tokenType = TokenType.DOUBLE_RIGHT_ANGLE_BRACKET, tokenLiteral = ">>",
                lineNumber = 39, columnNumber = 3
            ),
            ExpectedToken(
                id = 161, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 39, columnNumber = 6
            ),
            ExpectedToken(
                id = 162, tokenType = TokenType.RIGHT_ANGLE_BRACKET, tokenLiteral = ">",
                lineNumber = 39, columnNumber = 8
            ),
            ExpectedToken(
                id = 163, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c",
                lineNumber = 39, columnNumber = 10
            ),
            ExpectedToken(
                id = 164, tokenType = TokenType.TRIPLE_RIGHT_ANGLE_BRACKET, tokenLiteral = ">>>",
                lineNumber = 39, columnNumber = 12
            ),
            ExpectedToken(
                id = 165, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d",
                lineNumber = 39, columnNumber = 16
            ),
            ExpectedToken(
                id = 166, tokenType = TokenType.RIGHT_ANGLE_BRACKET_EQUALS, tokenLiteral = ">=",
                lineNumber = 39, columnNumber = 18
            ),
            ExpectedToken(
                id = 167, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e",
                lineNumber = 39, columnNumber = 21
            ),

            // a + b
            ExpectedToken(
                id = 168, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 41, columnNumber = 1
            ),
            ExpectedToken(
                id = 169, tokenType = TokenType.PLUS, tokenLiteral = "+",
                lineNumber = 41, columnNumber = 3
            ),
            ExpectedToken(
                id = 170, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 41, columnNumber = 5
            ),

            // 'a' '\n' '\t' '\'' '"' '\\' '\u1323'
            ExpectedToken(
                id = 171, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "a",
                lineNumber = 43, columnNumber = 1
            ),
            ExpectedToken(
                id = 172, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\n",
                lineNumber = 43, columnNumber = 5
            ),
            ExpectedToken(
                id = 173, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\t",
                lineNumber = 43, columnNumber = 10
            ),
            ExpectedToken(
                id = 174, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\'",
                lineNumber = 43, columnNumber = 15
            ),
            ExpectedToken(
                id = 175, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\"",
                lineNumber = 43, columnNumber = 20
            ),
            ExpectedToken(
                id = 176, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\\\",
                lineNumber = 43, columnNumber = 24
            ),
            ExpectedToken(
                id = 177, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\u1323",
                lineNumber = 43, columnNumber = 29
            ),

            // "pikachu"  "pika \n chu" "pika \t\u1244 chu\n"
            ExpectedToken(
                id = 178, tokenType = TokenType.STRING_LITERAL, tokenLiteral = "pikachu",
                lineNumber = 45, columnNumber = 2
            ),
            ExpectedToken(
                id = 179, tokenType = TokenType.STRING_LITERAL, tokenLiteral = "pika \\n chu",
                lineNumber = 45, columnNumber = 13
            ),
            ExpectedToken(
                id = 180, tokenType = TokenType.STRING_LITERAL, tokenLiteral = "pika \\t\\u1244 chu\\n",
                lineNumber = 45, columnNumber = 27
            ),

            // a + b // hi there
            ExpectedToken(
                id = 181, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 47, columnNumber = 1
            ),
            ExpectedToken(
                id = 182, tokenType = TokenType.PLUS, tokenLiteral = "+",
                lineNumber = 47, columnNumber = 3
            ),
            ExpectedToken(
                id = 183, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b",
                lineNumber = 47, columnNumber = 5
            ),
            ExpectedToken(
                id = 184, tokenType = TokenType.SINGLE_LINE_COMMENT, tokenLiteral = " hi there\n",
                lineNumber = 47, columnNumber = 7
            ),

            // x-y/**pikachu
            // greninja*/z
            ExpectedToken(
                id = 185, tokenType = TokenType.IDENTIFIER, tokenLiteral = "x",
                lineNumber = 49, columnNumber = 1
            ),
            ExpectedToken(
                id = 186, tokenType = TokenType.MINUS, tokenLiteral = "-",
                lineNumber = 49, columnNumber = 2
            ),
            ExpectedToken(
                id = 187, tokenType = TokenType.IDENTIFIER, tokenLiteral = "y",
                lineNumber = 49, columnNumber = 3
            ),
            ExpectedToken(
                id = 188, tokenType = TokenType.MULTI_LINE_COMMENT, tokenLiteral = "*pikachu\ngreninja",
                lineNumber = 49, columnNumber = 4
            ),
            ExpectedToken(
                id = 189, tokenType = TokenType.IDENTIFIER, tokenLiteral = "z",
                lineNumber = 50, columnNumber = 11
            ),

            // // hello
            // a
            ExpectedToken(
                id = 190, tokenType = TokenType.SINGLE_LINE_COMMENT, tokenLiteral = " hello\n",
                lineNumber = 52, columnNumber = 1
            ),
            ExpectedToken(
                id = 191, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 53, columnNumber = 1
            ),

            // 1 23l 34.4 41.42 100.42f 1.f .0f
            ExpectedToken(
                id = 192, tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1",
                lineNumber = 55, columnNumber = 1
            ),
            ExpectedToken(
                id = 193, tokenType = TokenType.LONG_LITERAL, tokenLiteral = "23l",
                lineNumber = 55, columnNumber = 3
            ),
            ExpectedToken(
                id = 194, tokenType = TokenType.DOUBLE_LITERAL, tokenLiteral = "34.4",
                lineNumber = 55, columnNumber = 7
            ),
            ExpectedToken(
                id = 195, tokenType = TokenType.DOUBLE_LITERAL, tokenLiteral = "41.42",
                lineNumber = 55, columnNumber = 12
            ),
            ExpectedToken(
                id = 196, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "100.42f",
                lineNumber = 55, columnNumber = 18
            ),
            ExpectedToken(
                id = 197, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "1.f",
                lineNumber = 55, columnNumber = 26
            ),
            ExpectedToken(
                id = 198, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = ".0f",
                lineNumber = 55, columnNumber = 30
            ),

            // a=1.312f+231l+121.f+2121
            ExpectedToken(
                id = 199, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a",
                lineNumber = 57, columnNumber = 1
            ),
            ExpectedToken(
                id = 200, tokenType = TokenType.EQUALS, tokenLiteral = "=",
                lineNumber = 57, columnNumber = 2
            ),
            ExpectedToken(
                id = 201, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "1.312f",
                lineNumber = 57, columnNumber = 3
            ),
            ExpectedToken(
                id = 202, tokenType = TokenType.PLUS, tokenLiteral = "+",
                lineNumber = 57, columnNumber = 9
            ),
            ExpectedToken(
                id = 203, tokenType = TokenType.LONG_LITERAL, tokenLiteral = "231l",
                lineNumber = 57, columnNumber = 10
            ),
            ExpectedToken(
                id = 204, tokenType = TokenType.PLUS, tokenLiteral = "+",
                lineNumber = 57, columnNumber = 14
            ),
            ExpectedToken(
                id = 205, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "121.f",
                lineNumber = 57, columnNumber = 15
            ),
            ExpectedToken(
                id = 206, tokenType = TokenType.PLUS, tokenLiteral = "+",
                lineNumber = 57, columnNumber = 20
            ),
            ExpectedToken(
                id = 207, tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2121",
                lineNumber = 57, columnNumber = 21
            ),

            // eof
            ExpectedToken(
                id = -1, tokenType = TokenType.EOF, tokenLiteral = Token.EOF_TOKEN_LITERAL,
                lineNumber = 59, columnNumber = 0
            ),
        )

        // In the expectedTokens, if ids are not unique, throw error
        if (expectedTokens.map { it.id }.toSet().size != expectedTokens.size) {
            throw Error("Some of the id's are not unique")
        }

        val lexer = Lexer(input, mutableListOf())

        for (expectedToken in expectedTokens) {
            val actualToken = lexer.nextToken()

            val errors = lexer.getErrors()
            assertEquals(0, errors.size, "id: ${expectedToken.id}, error: ${errors.firstOrNull()}")

            assertEquals(expectedToken.tokenType.name, actualToken.tokenType.name, "id: ${expectedToken.id}")
            assertEquals(expectedToken.tokenLiteral, actualToken.tokenLiteral, "id: ${expectedToken.id}")
            assertEquals(expectedToken.lineNumber, actualToken.lineNumber, "id: ${expectedToken.id}, lineNumber")
            assertEquals(expectedToken.columnNumber, actualToken.columnNumber, "id: ${expectedToken.id}, columnNumber")
        }

        assertEquals(lexer.getErrors().size, 0, "Lexer has errors")
    }
}

private data class ExpectedToken(
    val id: Int,
    val tokenType: TokenType,
    val tokenLiteral: String,
    val lineNumber: Int,
    val columnNumber: Int,
)
