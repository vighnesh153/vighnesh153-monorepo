package interpreters.javalang.common.lexer

import interpreters.javalang.common.tokens.Token
import interpreters.javalang.common.tokens.TokenType
import kotlin.test.Test
import kotlin.test.assertEquals

class LexerTest {
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
            ExpectedToken(id = 0, tokenType = TokenType.COMMA, tokenLiteral = TokenType.COMMA.value),
            ExpectedToken(id = 1, tokenType = TokenType.SEMICOLON, tokenLiteral = TokenType.SEMICOLON.value),
            ExpectedToken(id = 2, tokenType = TokenType.AT_SIGN, tokenLiteral = TokenType.AT_SIGN.value),
            ExpectedToken(id = 3, tokenType = TokenType.PLUS, tokenLiteral = TokenType.PLUS.value),
            ExpectedToken(id = 4, tokenType = TokenType.MINUS, tokenLiteral = TokenType.MINUS.value),
            ExpectedToken(id = 5, tokenType = TokenType.ASTERISK, tokenLiteral = TokenType.ASTERISK.value),
            ExpectedToken(id = 6, tokenType = TokenType.FORWARD_SLASH, tokenLiteral = TokenType.FORWARD_SLASH.value),
            ExpectedToken(id = 7, tokenType = TokenType.BACK_SLASH, tokenLiteral = TokenType.BACK_SLASH.value),
            ExpectedToken(id = 8, tokenType = TokenType.MODULUS, tokenLiteral = TokenType.MODULUS.value),
            ExpectedToken(id = 9, tokenType = TokenType.BANG, tokenLiteral = TokenType.BANG.value),
            ExpectedToken(id = 10, tokenType = TokenType.AMPERSAND, tokenLiteral = TokenType.AMPERSAND.value),
            ExpectedToken(id = 11, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = TokenType.VERTICAL_BAR.value),
            ExpectedToken(id = 12, tokenType = TokenType.CARET, tokenLiteral = TokenType.CARET.value),
            ExpectedToken(id = 13, tokenType = TokenType.QUESTION, tokenLiteral = TokenType.QUESTION.value),
            ExpectedToken(id = 14, tokenType = TokenType.COLON, tokenLiteral = TokenType.COLON.value),
            ExpectedToken(id = 15, tokenType = TokenType.DOT, tokenLiteral = TokenType.DOT.value),
            ExpectedToken(id = 16, tokenType = TokenType.TILDE, tokenLiteral = TokenType.TILDE.value),

            // (){}[]<>
            ExpectedToken(
                id = 20,
                tokenType = TokenType.LEFT_PARENTHESIS,
                tokenLiteral = TokenType.LEFT_PARENTHESIS.value
            ),
            ExpectedToken(
                id = 21,
                tokenType = TokenType.RIGHT_PARENTHESIS,
                tokenLiteral = TokenType.RIGHT_PARENTHESIS.value
            ),
            ExpectedToken(
                id = 22,
                tokenType = TokenType.LEFT_CURLY_BRACE,
                tokenLiteral = TokenType.LEFT_CURLY_BRACE.value
            ),
            ExpectedToken(
                id = 23,
                tokenType = TokenType.RIGHT_CURLY_BRACE,
                tokenLiteral = TokenType.RIGHT_CURLY_BRACE.value
            ),
            ExpectedToken(
                id = 24,
                tokenType = TokenType.LEFT_SQUARE_BRACKET,
                tokenLiteral = TokenType.LEFT_SQUARE_BRACKET.value
            ),
            ExpectedToken(
                id = 25,
                tokenType = TokenType.RIGHT_SQUARE_BRACKET,
                tokenLiteral = TokenType.RIGHT_SQUARE_BRACKET.value
            ),
            ExpectedToken(
                id = 26,
                tokenType = TokenType.LEFT_ANGLE_BRACKET,
                tokenLiteral = TokenType.LEFT_ANGLE_BRACKET.value
            ),
            ExpectedToken(
                id = 27,
                tokenType = TokenType.RIGHT_ANGLE_BRACKET,
                tokenLiteral = TokenType.RIGHT_ANGLE_BRACKET.value
            ),

            // abc _aa a123 __11 _
            ExpectedToken(id = 28, tokenType = TokenType.IDENTIFIER, tokenLiteral = "abc"),
            ExpectedToken(id = 29, tokenType = TokenType.IDENTIFIER, tokenLiteral = "_aa"),
            ExpectedToken(id = 30, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a123"),
            ExpectedToken(id = 31, tokenType = TokenType.IDENTIFIER, tokenLiteral = "__11"),
            ExpectedToken(id = 32, tokenType = TokenType.IDENTIFIER, tokenLiteral = "_"),

            // a == b== c
            ExpectedToken(id = 33, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 34, tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = "=="),
            ExpectedToken(id = 35, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 36, tokenType = TokenType.DOUBLE_EQUALS, tokenLiteral = "=="),
            ExpectedToken(id = 37, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),

            // a ++
            // b +=    c + ++d
            ExpectedToken(id = 38, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 39, tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
            ExpectedToken(id = 40, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 41, tokenType = TokenType.PLUS_EQUALS, tokenLiteral = "+="),
            ExpectedToken(id = 42, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 43, tokenType = TokenType.PLUS, tokenLiteral = "+"),
            ExpectedToken(id = 44, tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
            ExpectedToken(id = 45, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            // x --
            // y-= z++ - --a
            ExpectedToken(id = 46, tokenType = TokenType.IDENTIFIER, tokenLiteral = "x"),
            ExpectedToken(id = 47, tokenType = TokenType.DECREMENT, tokenLiteral = "--"),
            ExpectedToken(id = 48, tokenType = TokenType.IDENTIFIER, tokenLiteral = "y"),
            ExpectedToken(id = 49, tokenType = TokenType.MINUS_EQUALS, tokenLiteral = "-="),
            ExpectedToken(id = 50, tokenType = TokenType.IDENTIFIER, tokenLiteral = "z"),
            ExpectedToken(id = 51, tokenType = TokenType.INCREMENT, tokenLiteral = "++"),
            ExpectedToken(id = 52, tokenType = TokenType.MINUS, tokenLiteral = "-"),
            ExpectedToken(id = 53, tokenType = TokenType.DECREMENT, tokenLiteral = "--"),
            ExpectedToken(id = 54, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),

            // a *=b*= c = d
            ExpectedToken(id = 55, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 56, tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = "*="),
            ExpectedToken(id = 57, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 58, tokenType = TokenType.ASTERISK_EQUALS, tokenLiteral = "*="),
            ExpectedToken(id = 59, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 60, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 61, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            // a /= b/c = d
            ExpectedToken(id = 62, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 63, tokenType = TokenType.FORWARD_SLASH_EQUALS, tokenLiteral = "/="),
            ExpectedToken(id = 64, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 65, tokenType = TokenType.FORWARD_SLASH, tokenLiteral = "/"),
            ExpectedToken(id = 66, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 67, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 68, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            //a %=  b  %c = d
            ExpectedToken(id = 69, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 70, tokenType = TokenType.MODULUS_EQUALS, tokenLiteral = "%="),
            ExpectedToken(id = 71, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 72, tokenType = TokenType.MODULUS, tokenLiteral = "%"),
            ExpectedToken(id = 73, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 74, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 75, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            // a!=b !c =d
            ExpectedToken(id = 76, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 77, tokenType = TokenType.BANG_EQUALS, tokenLiteral = "!="),
            ExpectedToken(id = 78, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 79, tokenType = TokenType.BANG, tokenLiteral = "!"),
            ExpectedToken(id = 80, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 81, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 82, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            //a &&b &c&&d &e
            ExpectedToken(id = 83, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 84, tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = "&&"),
            ExpectedToken(id = 85, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 86, tokenType = TokenType.AMPERSAND, tokenLiteral = "&"),
            ExpectedToken(id = 87, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 88, tokenType = TokenType.DOUBLE_AMPERSAND, tokenLiteral = "&&"),
            ExpectedToken(id = 89, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),
            ExpectedToken(id = 90, tokenType = TokenType.AMPERSAND, tokenLiteral = "&"),
            ExpectedToken(id = 91, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e"),

            // a|b||c||d|e
            ExpectedToken(id = 92, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 93, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = "|"),
            ExpectedToken(id = 94, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 95, tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = "||"),
            ExpectedToken(id = 96, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 97, tokenType = TokenType.DOUBLE_VERTICAL_BAR, tokenLiteral = "||"),
            ExpectedToken(id = 98, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),
            ExpectedToken(id = 99, tokenType = TokenType.VERTICAL_BAR, tokenLiteral = "|"),
            ExpectedToken(id = 100, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e"),

            // a^b^c^=d^e
            ExpectedToken(id = 101, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 102, tokenType = TokenType.CARET, tokenLiteral = "^"),
            ExpectedToken(id = 103, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 104, tokenType = TokenType.CARET, tokenLiteral = "^"),
            ExpectedToken(id = 105, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 106, tokenType = TokenType.CARET_EQUALS, tokenLiteral = "^="),
            ExpectedToken(id = 107, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),
            ExpectedToken(id = 108, tokenType = TokenType.CARET, tokenLiteral = "^"),
            ExpectedToken(id = 109, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e"),

            // instanceof abstract continue for new switch default package
            // boolean do if private this break double implements protected
            // throw throws byte else
            // import public case enum return catch extends int short try char
            // final interface static void class finally long float super while
            ExpectedToken(id = 110, tokenType = TokenType.INSTANCEOF_OPERATOR, tokenLiteral = "instanceof"),
            ExpectedToken(id = 111, tokenType = TokenType.ABSTRACT_KEYWORD, tokenLiteral = "abstract"),
            ExpectedToken(id = 112, tokenType = TokenType.CONTINUE_KEYWORD, tokenLiteral = "continue"),
            ExpectedToken(id = 113, tokenType = TokenType.FOR_KEYWORD, tokenLiteral = "for"),
            ExpectedToken(id = 114, tokenType = TokenType.NEW_KEYWORD, tokenLiteral = "new"),
            ExpectedToken(id = 115, tokenType = TokenType.SWITCH_KEYWORD, tokenLiteral = "switch"),
            ExpectedToken(id = 116, tokenType = TokenType.DEFAULT_KEYWORD, tokenLiteral = "default"),
            ExpectedToken(id = 117, tokenType = TokenType.PACKAGE_KEYWORD, tokenLiteral = "package"),
            ExpectedToken(id = 118, tokenType = TokenType.BOOLEAN_KEYWORD, tokenLiteral = "boolean"),
            ExpectedToken(id = 119, tokenType = TokenType.DO_KEYWORD, tokenLiteral = "do"),
            ExpectedToken(id = 120, tokenType = TokenType.IF_KEYWORD, tokenLiteral = "if"),
            ExpectedToken(id = 121, tokenType = TokenType.PRIVATE_KEYWORD, tokenLiteral = "private"),
            ExpectedToken(id = 122, tokenType = TokenType.THIS_KEYWORD, tokenLiteral = "this"),
            ExpectedToken(id = 123, tokenType = TokenType.BREAK_KEYWORD, tokenLiteral = "break"),
            ExpectedToken(id = 124, tokenType = TokenType.DOUBLE_KEYWORD, tokenLiteral = "double"),
            ExpectedToken(id = 125, tokenType = TokenType.IMPLEMENTS_KEYWORD, tokenLiteral = "implements"),
            ExpectedToken(id = 126, tokenType = TokenType.PROTECTED_KEYWORD, tokenLiteral = "protected"),
            ExpectedToken(id = 127, tokenType = TokenType.THROW_KEYWORD, tokenLiteral = "throw"),
            ExpectedToken(id = 128, tokenType = TokenType.THROWS_KEYWORD, tokenLiteral = "throws"),
            ExpectedToken(id = 129, tokenType = TokenType.BYTE_KEYWORD, tokenLiteral = "byte"),
            ExpectedToken(id = 130, tokenType = TokenType.ELSE_KEYWORD, tokenLiteral = "else"),
            ExpectedToken(id = 131, tokenType = TokenType.IMPORT_KEYWORD, tokenLiteral = "import"),
            ExpectedToken(id = 132, tokenType = TokenType.PUBLIC_KEYWORD, tokenLiteral = "public"),
            ExpectedToken(id = 133, tokenType = TokenType.CASE_KEYWORD, tokenLiteral = "case"),
            ExpectedToken(id = 134, tokenType = TokenType.ENUM_KEYWORD, tokenLiteral = "enum"),
            ExpectedToken(id = 135, tokenType = TokenType.RETURN_KEYWORD, tokenLiteral = "return"),
            ExpectedToken(id = 136, tokenType = TokenType.CATCH_KEYWORD, tokenLiteral = "catch"),
            ExpectedToken(id = 137, tokenType = TokenType.EXTENDS_KEYWORD, tokenLiteral = "extends"),
            ExpectedToken(id = 138, tokenType = TokenType.INTEGER_KEYWORD, tokenLiteral = "int"),
            ExpectedToken(id = 139, tokenType = TokenType.SHORT_KEYWORD, tokenLiteral = "short"),
            ExpectedToken(id = 140, tokenType = TokenType.TRY_KEYWORD, tokenLiteral = "try"),
            ExpectedToken(id = 141, tokenType = TokenType.CHARACTER_KEYWORD, tokenLiteral = "char"),
            ExpectedToken(id = 142, tokenType = TokenType.FINAL_KEYWORD, tokenLiteral = "final"),
            ExpectedToken(id = 143, tokenType = TokenType.INTERFACE_KEYWORD, tokenLiteral = "interface"),
            ExpectedToken(id = 144, tokenType = TokenType.STATIC_KEYWORD, tokenLiteral = "static"),
            ExpectedToken(id = 145, tokenType = TokenType.VOID_KEYWORD, tokenLiteral = "void"),
            ExpectedToken(id = 146, tokenType = TokenType.CLASS_KEYWORD, tokenLiteral = "class"),
            ExpectedToken(id = 147, tokenType = TokenType.FINALLY_KEYWORD, tokenLiteral = "finally"),
            ExpectedToken(id = 148, tokenType = TokenType.LONG_KEYWORD, tokenLiteral = "long"),
            ExpectedToken(id = 149, tokenType = TokenType.FLOAT_KEYWORD, tokenLiteral = "float"),
            ExpectedToken(id = 150, tokenType = TokenType.SUPER_KEYWORD, tokenLiteral = "super"),
            ExpectedToken(id = 151, tokenType = TokenType.WHILE_KEYWORD, tokenLiteral = "while"),

            // a < b <<c <= d
            ExpectedToken(id = 152, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 153, tokenType = TokenType.LEFT_ANGLE_BRACKET, tokenLiteral = "<"),
            ExpectedToken(id = 154, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 155, tokenType = TokenType.DOUBLE_LEFT_ANGLE_BRACKET, tokenLiteral = "<<"),
            ExpectedToken(id = 156, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 157, tokenType = TokenType.LEFT_ANGLE_BRACKET_EQUALS, tokenLiteral = "<="),
            ExpectedToken(id = 158, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),

            // a >> b > c >>> d >> e
            ExpectedToken(id = 159, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 160, tokenType = TokenType.DOUBLE_RIGHT_ANGLE_BRACKET, tokenLiteral = ">>"),
            ExpectedToken(id = 161, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 162, tokenType = TokenType.RIGHT_ANGLE_BRACKET, tokenLiteral = ">"),
            ExpectedToken(id = 163, tokenType = TokenType.IDENTIFIER, tokenLiteral = "c"),
            ExpectedToken(id = 164, tokenType = TokenType.TRIPLE_RIGHT_ANGLE_BRACKET, tokenLiteral = ">>>"),
            ExpectedToken(id = 165, tokenType = TokenType.IDENTIFIER, tokenLiteral = "d"),
            ExpectedToken(id = 166, tokenType = TokenType.RIGHT_ANGLE_BRACKET_EQUALS, tokenLiteral = ">="),
            ExpectedToken(id = 167, tokenType = TokenType.IDENTIFIER, tokenLiteral = "e"),

            // a + b
            ExpectedToken(id = 168, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 169, tokenType = TokenType.PLUS, tokenLiteral = "+"),
            ExpectedToken(id = 170, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),

            // 'a' '\n' '\t' '\'' '"' '\\' '\u1323'
            ExpectedToken(id = 171, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "a"),
            ExpectedToken(id = 172, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\n"),
            ExpectedToken(id = 173, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\t"),
            ExpectedToken(id = 174, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\'"),
            ExpectedToken(id = 175, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\""),
            ExpectedToken(id = 176, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\\\"),
            ExpectedToken(id = 177, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "\\u1323"),

            // "pikachu"  "pika \n chu" "pika \t\u1244 chu\n"
            ExpectedToken(id = 178, tokenType = TokenType.STRING_LITERAL, tokenLiteral = "pikachu"),
            ExpectedToken(id = 179, tokenType = TokenType.STRING_LITERAL, tokenLiteral = "pika \\n chu"),
            ExpectedToken(id = 180, tokenType = TokenType.STRING_LITERAL, tokenLiteral = "pika \\t\\u1244 chu\\n"),

            // a + b // hi there
            ExpectedToken(id = 181, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 182, tokenType = TokenType.PLUS, tokenLiteral = "+"),
            ExpectedToken(id = 183, tokenType = TokenType.IDENTIFIER, tokenLiteral = "b"),
            ExpectedToken(id = 184, tokenType = TokenType.SINGLE_LINE_COMMENT, tokenLiteral = " hi there\n"),

            // x-y/**pikachu
            // greninja*/z
            ExpectedToken(id = 185, tokenType = TokenType.IDENTIFIER, tokenLiteral = "x"),
            ExpectedToken(id = 186, tokenType = TokenType.MINUS, tokenLiteral = "-"),
            ExpectedToken(id = 187, tokenType = TokenType.IDENTIFIER, tokenLiteral = "y"),
            ExpectedToken(id = 188, tokenType = TokenType.MULTI_LINE_COMMENT, tokenLiteral = "*pikachu\ngreninja"),
            ExpectedToken(id = 189, tokenType = TokenType.IDENTIFIER, tokenLiteral = "z"),

            // // hello
            // a
            ExpectedToken(id = 190, tokenType = TokenType.SINGLE_LINE_COMMENT, tokenLiteral = " hello\n"),
            ExpectedToken(id = 191, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),

            // 1 23l 34.4 41.42 100.42f 1.f .0f
            ExpectedToken(id = 192, tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "1"),
            ExpectedToken(id = 193, tokenType = TokenType.LONG_LITERAL, tokenLiteral = "23l"),
            ExpectedToken(id = 194, tokenType = TokenType.DOUBLE_LITERAL, tokenLiteral = "34.4"),
            ExpectedToken(id = 195, tokenType = TokenType.DOUBLE_LITERAL, tokenLiteral = "41.42"),
            ExpectedToken(id = 196, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "100.42f"),
            ExpectedToken(id = 197, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "1.f"),
            ExpectedToken(id = 198, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = ".0f"),

            // a=1.312f+231l+121.f+2121
            ExpectedToken(id = 199, tokenType = TokenType.IDENTIFIER, tokenLiteral = "a"),
            ExpectedToken(id = 200, tokenType = TokenType.EQUALS, tokenLiteral = "="),
            ExpectedToken(id = 201, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "1.312f"),
            ExpectedToken(id = 202, tokenType = TokenType.PLUS, tokenLiteral = "+"),
            ExpectedToken(id = 203, tokenType = TokenType.LONG_LITERAL, tokenLiteral = "231l"),
            ExpectedToken(id = 204, tokenType = TokenType.PLUS, tokenLiteral = "+"),
            ExpectedToken(id = 205, tokenType = TokenType.FLOAT_LITERAL, tokenLiteral = "121.f"),
            ExpectedToken(id = 206, tokenType = TokenType.PLUS, tokenLiteral = "+"),
            ExpectedToken(id = 207, tokenType = TokenType.INTEGER_LITERAL, tokenLiteral = "2121"),

            // eof
            ExpectedToken(id = -1, tokenType = Token.EOF.tokenType, tokenLiteral = Token.EOF.tokenLiteral),
        )

        // In the expectedTokens, if ids are not unique, throw error
        if (expectedTokens.map { it.id }.toSet().size != expectedTokens.size) {
            throw Error("Some of the id's are not unique")
        }

        val lexer = Lexer(input)

        for (expectedToken in expectedTokens) {
            val actualToken = lexer.nextToken()

            val errors = lexer.getErrors()
            assertEquals(0, errors.size, "id: ${expectedToken.id}, error: ${errors.firstOrNull()}")

            assertEquals(expectedToken.tokenType.name, actualToken.tokenType.name, "id: ${expectedToken.id}")
            assertEquals(expectedToken.tokenLiteral, actualToken.tokenLiteral, "id: ${expectedToken.id}")
        }
    }

    //    @Test
    fun lexerNextToken_errors() {
        val input = """
'a
        """.trimIndent()

        val expectedTokens = listOf(

            // ,;@+-*/\%!&|^?:.~
            ExpectedToken(id = 0, tokenType = TokenType.CHARACTER_LITERAL, tokenLiteral = "<ILLEGAL>"),

            // eof
            ExpectedToken(id = -1, tokenType = Token.EOF.tokenType, tokenLiteral = Token.EOF.tokenLiteral),
        )

        // In the expectedTokens, if ids are not unique, throw error
        if (expectedTokens.map { it.id }.toSet().size != expectedTokens.size) {
            throw Error("Some of the id's are not unique")
        }

        val lexer = Lexer(input)

        // no errors
        assertEquals(lexer.getErrors().size, 0, "Lexer has errors")

        for (expectedToken in expectedTokens) {
            val actualToken = lexer.nextToken()

            assertEquals(expectedToken.tokenType.name, actualToken.tokenType.name, "id: ${expectedToken.id}")
            assertEquals(expectedToken.tokenLiteral, actualToken.tokenLiteral, "id: ${expectedToken.id}")
        }
    }
}

private data class ExpectedToken(
    val id: Int,
    val tokenType: TokenType,
    val tokenLiteral: String,
)
