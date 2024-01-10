package token

type TokenType string

type Token struct {
	Type    TokenType
	Literal string
}

const (
	ILLEGAL = "ILLEGAL"
	EOF     = "EOF"

	// Identifiers + Literals
	IDENTIFIER = "IDENTIFIER" // x, y, add
	INTEGER    = "INTEGER"    // 1, 42

	// Operators
	ASSIGN = "="
	PLUS   = "+"

	// Delimiters
	COMMA     = ","
	SEMICOLON = ";"

	LEFT_PARENTHESIS  = "("
	RIGHT_PARENTHESIS = ")"
	LEFT_CURLY_BRACE  = "{"
	RIGHT_CURLY_BRACE = "}"

	// Keywords
	FUNCTION = "function"
	LET      = "let"
)

func NewToken(tokenType TokenType, character byte) Token {
	return Token{
		Type:    tokenType,
		Literal: string(character),
	}
}

var keywords = map[string]TokenType{
	"function": FUNCTION,
	"let":      LET,
}

func LookupIdentifier(identifier string) TokenType {
	if tokenType, ok := keywords[identifier]; ok {
		return tokenType
	}
	return IDENTIFIER
}
