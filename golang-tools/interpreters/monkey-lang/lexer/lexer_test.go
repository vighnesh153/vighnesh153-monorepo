package lexer

import (
	"testing"
	"vighnesh153/interpreters/monkey-lang/token"
)

func TestNextToken(t *testing.T) {
	input := `let five = 5;
	let ten = 10;

	let add = function(x, y) {
		x + y;
	};

	let result = add(five, ten);
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
		{Type: token.FUNCTION, Literal: "function"},
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

		{Type: token.EOF, Literal: ""},
	}

	lexer := NewLexer(input)

	for i, expectedToken := range tests {
		var actualToken token.Token = lexer.NextToken()

		if expectedToken.Type != actualToken.Type {
			t.Fatalf("tests[%v] - tokenType wrong. expected=%v, got %v", i, expectedToken.Type, actualToken.Type)
		}

		if expectedToken.Literal != actualToken.Literal {
			t.Fatalf("tests[%v] - literal wrong. expected=%v, got %v", i, expectedToken.Literal, actualToken.Literal)
		}
	}
}
