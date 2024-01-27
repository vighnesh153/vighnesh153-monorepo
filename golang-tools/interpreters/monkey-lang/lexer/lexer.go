package lexer

import "vighnesh153/interpreters/monkey-lang/token"

type Lexer struct {
	input            string
	position         int  // current position in input
	readPosition     int  // current reading position in input (after current char)
	currentCharacter byte // character character under examination
}

func NewLexer(input string) *Lexer {
	lexer := Lexer{
		input: input,
	}
	lexer.readCharacter()
	return &lexer
}

func (l *Lexer) NextToken() token.Token {
	var t token.Token
	l.skipWhitespace()

	switch l.currentCharacter {
	case '=':
		if l.peekCharacter() == '=' {
			l.readCharacter()
			t = token.Token{Type: token.DOUBLE_EQUALS, Literal: "=="}
		} else {
			t = token.NewToken(token.ASSIGN, l.currentCharacter)
		}
	case '+':
		t = token.NewToken(token.PLUS, l.currentCharacter)
	case '-':
		t = token.NewToken(token.MINUS, l.currentCharacter)
	case '!':
		if l.peekCharacter() == '=' {
			l.readCharacter()
			t = token.Token{Type: token.NOT_EQUALS, Literal: "!="}
		} else {
			t = token.NewToken(token.BANG, l.currentCharacter)
		}
	case '/':
		t = token.NewToken(token.FORWARD_SLASH, l.currentCharacter)
	case '*':
		t = token.NewToken(token.ASTERISK, l.currentCharacter)
	case '<':
		t = token.NewToken(token.LESS_THAN, l.currentCharacter)
	case '>':
		t = token.NewToken(token.GREATER_THAN, l.currentCharacter)
	case ';':
		t = token.NewToken(token.SEMICOLON, l.currentCharacter)
	case ',':
		t = token.NewToken(token.COMMA, l.currentCharacter)
	case ':':
		t = token.NewToken(token.COLON, l.currentCharacter)
	case '(':
		t = token.NewToken(token.LEFT_PARENTHESIS, l.currentCharacter)
	case ')':
		t = token.NewToken(token.RIGHT_PARENTHESIS, l.currentCharacter)
	case '{':
		t = token.NewToken(token.LEFT_CURLY_BRACE, l.currentCharacter)
	case '}':
		t = token.NewToken(token.RIGHT_CURLY_BRACE, l.currentCharacter)
	case '[':
		t = token.NewToken(token.LEFT_BRACKET, l.currentCharacter)
	case ']':
		t = token.NewToken(token.RIGHT_BRACKET, l.currentCharacter)
	case '"':
		t.Literal = l.readString()
		t.Type = token.STRING
	case 0:
		t.Literal = ""
		t.Type = token.EOF
	default:
		if isAcceptableIdentifierCharacter(l.currentCharacter) {
			t.Literal = l.readIdentifier()
			t.Type = token.LookupIdentifier(t.Literal)
			return t
		} else if isDigit(l.currentCharacter) {
			t.Type = token.INTEGER
			t.Literal = l.readNumber()
			return t
		} else {
			t = token.NewToken(token.ILLEGAL, l.currentCharacter)
		}
	}

	l.readCharacter()
	return t
}

func (l *Lexer) readCharacter() {
	if l.readPosition >= len(l.input) {
		l.currentCharacter = 0 // ascii code for NULL character
	} else {
		l.currentCharacter = l.input[l.readPosition]
	}
	l.position = l.readPosition
	l.readPosition += 1
}

func (l *Lexer) readIdentifier() string {
	position := l.position
	for isAcceptableIdentifierCharacter(l.currentCharacter) {
		l.readCharacter()
	}
	return l.input[position:l.position]
}

func (l *Lexer) readNumber() string {
	position := l.position
	for isDigit(l.currentCharacter) {
		l.readCharacter()
	}
	return l.input[position:l.position]
}

func isDigit(ch byte) bool {
	return '0' <= ch && ch <= '9'
}

func isAcceptableIdentifierCharacter(ch byte) bool {
	return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_'
}

func (l *Lexer) skipWhitespace() {
	for l.currentCharacter == ' ' || l.currentCharacter == '\t' || l.currentCharacter == '\n' || l.currentCharacter == '\r' {
		l.readCharacter()
	}
}

func (l *Lexer) peekCharacter() byte {
	if l.readPosition >= len(l.input) {
		return 0
	} else {
		return l.input[l.readPosition]
	}
}

func (l *Lexer) readString() string {
	position := l.position + 1
	for {
		l.readCharacter()
		if l.currentCharacter == '"' || l.currentCharacter == 0 {
			break
		}
	}
	return l.input[position:l.position]
}
