package lexer

import (
	"testing"
	"vighnesh153/interpreters/monkey-lang/token"
)

func TestNextToken(t *testing.T) {
	input := `let five = 5;
	let ten = 10;

	let add = fn(x, y) {
		x + y;
	};

	let result = add(five, ten);
	
	!-/*5;
	5 < 10 > 5;

	if (5 < 10) {
		return true;
	} else {
		return false;
	}

	10 == 10;
	10 != 9;

	"foobar"
    "foo bar"

	[1, 2];
	`

	tests := []token.Token{
		{Type: token.LET, Literal: "let"},
		{Type: token.IDENTIFIER, Literal: "five"},
		{Type: token.ASSIGN, Literal: "="},
		{Type: token.INTEGER, Literal: "5"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.LET, Literal: "let"},
		{Type: token.IDENTIFIER, Literal: "ten"},
		{Type: token.ASSIGN, Literal: "="},
		{Type: token.INTEGER, Literal: "10"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.LET, Literal: "let"},
		{Type: token.IDENTIFIER, Literal: "add"},
		{Type: token.ASSIGN, Literal: "="},
		{Type: token.FUNCTION, Literal: "fn"},
		{Type: token.LEFT_PARENTHESIS, Literal: "("},
		{Type: token.IDENTIFIER, Literal: "x"},
		{Type: token.COMMA, Literal: ","},
		{Type: token.IDENTIFIER, Literal: "y"},
		{Type: token.RIGHT_PARENTHESIS, Literal: ")"},
		{Type: token.LEFT_CURLY_BRACE, Literal: "{"},
		{Type: token.IDENTIFIER, Literal: "x"},
		{Type: token.PLUS, Literal: "+"},
		{Type: token.IDENTIFIER, Literal: "y"},
		{Type: token.SEMICOLON, Literal: ";"},
		{Type: token.RIGHT_CURLY_BRACE, Literal: "}"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.LET, Literal: "let"},
		{Type: token.IDENTIFIER, Literal: "result"},
		{Type: token.ASSIGN, Literal: "="},
		{Type: token.IDENTIFIER, Literal: "add"},
		{Type: token.LEFT_PARENTHESIS, Literal: "("},
		{Type: token.IDENTIFIER, Literal: "five"},
		{Type: token.COMMA, Literal: ","},
		{Type: token.IDENTIFIER, Literal: "ten"},
		{Type: token.RIGHT_PARENTHESIS, Literal: ")"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.BANG, Literal: "!"},
		{Type: token.MINUS, Literal: "-"},
		{Type: token.FORWARD_SLASH, Literal: "/"},
		{Type: token.ASTERISK, Literal: "*"},
		{Type: token.INTEGER, Literal: "5"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.INTEGER, Literal: "5"},
		{Type: token.LESS_THAN, Literal: "<"},
		{Type: token.INTEGER, Literal: "10"},
		{Type: token.GREATER_THAN, Literal: ">"},
		{Type: token.INTEGER, Literal: "5"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.IF, Literal: "if"},
		{Type: token.LEFT_PARENTHESIS, Literal: "("},
		{Type: token.INTEGER, Literal: "5"},
		{Type: token.LESS_THAN, Literal: "<"},
		{Type: token.INTEGER, Literal: "10"},
		{Type: token.RIGHT_PARENTHESIS, Literal: ")"},
		{Type: token.LEFT_CURLY_BRACE, Literal: "{"},
		{Type: token.RETURN, Literal: "return"},
		{Type: token.TRUE, Literal: "true"},
		{Type: token.SEMICOLON, Literal: ";"},
		{Type: token.RIGHT_CURLY_BRACE, Literal: "}"},
		{Type: token.ELSE, Literal: "else"},
		{Type: token.LEFT_CURLY_BRACE, Literal: "{"},
		{Type: token.RETURN, Literal: "return"},
		{Type: token.FALSE, Literal: "false"},
		{Type: token.SEMICOLON, Literal: ";"},
		{Type: token.RIGHT_CURLY_BRACE, Literal: "}"},

		{Type: token.INTEGER, Literal: "10"},
		{Type: token.DOUBLE_EQUALS, Literal: "=="},
		{Type: token.INTEGER, Literal: "10"},
		{Type: token.SEMICOLON, Literal: ";"},
		{Type: token.INTEGER, Literal: "10"},
		{Type: token.NOT_EQUALS, Literal: "!="},
		{Type: token.INTEGER, Literal: "9"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.STRING, Literal: "foobar"},
		{Type: token.STRING, Literal: "foo bar"},

		{Type: token.LEFT_BRACKET, Literal: "["},
		{Type: token.INTEGER, Literal: "1"},
		{Type: token.COMMA, Literal: ","},
		{Type: token.INTEGER, Literal: "2"},
		{Type: token.RIGHT_BRACKET, Literal: "]"},
		{Type: token.SEMICOLON, Literal: ";"},

		{Type: token.EOF, Literal: ""},
	}

	lexer := NewLexer(input)

	for i, expectedToken := range tests {
		var actualToken token.Token = lexer.NextToken()

		if expectedToken.Type != actualToken.Type {
			t.Fatalf("tests[%v] - tokenType wrong. expected=\"%v\", got=\"%v\"", i, expectedToken.Type, actualToken.Type)
		}

		if expectedToken.Literal != actualToken.Literal {
			t.Fatalf("tests[%v] - literal wrong. expected=%v, got %v", i, expectedToken.Literal, actualToken.Literal)
		}
	}
}
