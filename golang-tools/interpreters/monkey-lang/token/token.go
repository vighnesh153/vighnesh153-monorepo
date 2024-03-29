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
	STRING     = "STRING"

	// Operators
	ASSIGN        = "="
	PLUS          = "+"
	MINUS         = "-"
	BANG          = "!"
	ASTERISK      = "*"
	FORWARD_SLASH = "/"
	LESS_THAN     = "<"
	GREATER_THAN  = ">"
	DOUBLE_EQUALS = "=="
	NOT_EQUALS    = "!="

	// Delimiters
	COMMA     = ","
	SEMICOLON = ";"
	COLON     = ":"

	LEFT_PARENTHESIS  = "("
	RIGHT_PARENTHESIS = ")"
	LEFT_CURLY_BRACE  = "{"
	RIGHT_CURLY_BRACE = "}"
	LEFT_BRACKET      = "["
	RIGHT_BRACKET     = "]"

	// Keywords
	FUNCTION = "function"
	LET      = "let"
	IF       = "if"
	ELSE     = "else"
	RETURN   = "return"
	TRUE     = "true"
	FALSE    = "false"
)

func NewToken(tokenType TokenType, character byte) Token {
	return Token{
		Type:    tokenType,
		Literal: string(character),
	}
}

var keywords = map[string]TokenType{
	"fn":     FUNCTION,
	"let":    LET,
	"if":     IF,
	"else":   ELSE,
	"return": RETURN,
	"true":   TRUE,
	"false":  FALSE,
}

func LookupIdentifier(identifier string) TokenType {
	if tokenType, ok := keywords[identifier]; ok {
		return tokenType
	}
	return IDENTIFIER
}
