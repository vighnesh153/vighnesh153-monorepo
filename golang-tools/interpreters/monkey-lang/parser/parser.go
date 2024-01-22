package parser

import (
	"fmt"
	"strconv"
	"vighnesh153/interpreters/monkey-lang/ast"
	"vighnesh153/interpreters/monkey-lang/lexer"
	"vighnesh153/interpreters/monkey-lang/token"
)

const (
	_ int = iota
	LOWEST
	EQUALS        // ==
	LESS_GREATER  // > or <
	SUM           // +
	PRODUCT       // *
	PREFIX        // -X or !X
	FUNCTION_CALL // myFunction(X)
)

var precedences = map[token.TokenType]int{
	token.DOUBLE_EQUALS: EQUALS,
	token.NOT_EQUALS:    EQUALS,
	token.LESS_THAN:     LESS_GREATER,
	token.GREATER_THAN:  LESS_GREATER,
	token.PLUS:          SUM,
	token.MINUS:         SUM,
	token.FORWARD_SLASH: PRODUCT,
	token.ASTERISK:      PRODUCT,
}

type Parser struct {
	l *lexer.Lexer

	currentToken token.Token
	peekToken    token.Token

	errors []string

	prefixParseFunctions map[token.TokenType]prefixParseFunction
	infixParseFunctions  map[token.TokenType]infixParseFunction
}

func NewParser(l *lexer.Lexer) *Parser {
	p := &Parser{
		l:      l,
		errors: []string{},
	}

	p.prefixParseFunctions = make(map[token.TokenType]prefixParseFunction)
	p.registerPrefixParseFn(token.IDENTIFIER, p.parseIdentifier)
	p.registerPrefixParseFn(token.INTEGER, p.parseIntegerLiteral)
	p.registerPrefixParseFn(token.BANG, p.parsePrefixExpression)
	p.registerPrefixParseFn(token.MINUS, p.parsePrefixExpression)
	p.registerPrefixParseFn(token.TRUE, p.parseBoolean)
	p.registerPrefixParseFn(token.FALSE, p.parseBoolean)
	p.registerPrefixParseFn(token.LEFT_PARENTHESIS, p.parseGroupedExpression)

	p.infixParseFunctions = make(map[token.TokenType]infixParseFunction)
	p.registerInfixParseFn(token.PLUS, p.parseInfixExpression)
	p.registerInfixParseFn(token.MINUS, p.parseInfixExpression)
	p.registerInfixParseFn(token.FORWARD_SLASH, p.parseInfixExpression)
	p.registerInfixParseFn(token.ASTERISK, p.parseInfixExpression)
	p.registerInfixParseFn(token.DOUBLE_EQUALS, p.parseInfixExpression)
	p.registerInfixParseFn(token.NOT_EQUALS, p.parseInfixExpression)
	p.registerInfixParseFn(token.LESS_THAN, p.parseInfixExpression)
	p.registerInfixParseFn(token.GREATER_THAN, p.parseInfixExpression)

	// Read two tokens, so currentToken and peekToken are both set
	p.nextToken()
	p.nextToken()

	return p
}

func (p *Parser) nextToken() {
	p.currentToken = p.peekToken
	p.peekToken = p.l.NextToken()
}

func (parser *Parser) ParseProgram() *ast.Program {
	program := &ast.Program{}
	program.Statements = []ast.Statement{}

	for !parser.currentTokenIs(token.EOF) {
		statement := parser.parseStatement()
		if statement != nil {
			program.Statements = append(program.Statements, statement)
		}
		parser.nextToken()
	}

	return program
}

func (parser *Parser) parseStatement() ast.Statement {
	switch parser.currentToken.Type {
	case token.LET:
		return parser.parseLetStatement()
	case token.RETURN:
		return parser.parseReturnStatement()
	default:
		return parser.parseExpressionStatement()
	}
}

func (parser *Parser) parseLetStatement() *ast.LetStatement {
	statement := &ast.LetStatement{Token: parser.currentToken}

	if !parser.expectPeek(token.IDENTIFIER) {
		return nil
	}

	statement.Name = &ast.Identifier{
		Token: parser.currentToken,
		Value: parser.currentToken.Literal,
	}

	if !parser.expectPeek(token.ASSIGN) {
		return nil
	}

	// TODO: we are skipping parsing the expressions until we encounter a semicolon
	for !parser.currentTokenIs(token.SEMICOLON) {
		parser.nextToken()
	}

	return statement
}

func (parser *Parser) parseReturnStatement() *ast.ReturnStatement {
	statement := &ast.ReturnStatement{
		Token: parser.currentToken,
	}

	parser.nextToken()

	// TODO: we are skipping parsing the expressions until we encounter a semicolon
	for !parser.currentTokenIs(token.SEMICOLON) {
		parser.nextToken()
	}

	return statement
}

func (parser *Parser) parseExpressionStatement() *ast.ExpressionStatement {
	statement := &ast.ExpressionStatement{
		Token: parser.currentToken,
	}

	statement.Expression = parser.parseExpression(LOWEST)

	if parser.peekTokenIs(token.SEMICOLON) {
		parser.nextToken()
	}

	return statement
}

func (parser *Parser) currentTokenIs(t token.TokenType) bool {
	return parser.currentToken.Type == t
}

func (parser *Parser) peekTokenIs(t token.TokenType) bool {
	return parser.peekToken.Type == t
}

func (parser *Parser) expectPeek(t token.TokenType) bool {
	if parser.peekTokenIs(t) {
		parser.nextToken()
		return true
	} else {
		parser.peekError(t)
		return false
	}
}

func (p *Parser) Errors() []string {
	return p.errors
}

func (p *Parser) peekError(t token.TokenType) {
	msg := fmt.Sprintf("Expected next token to be '%s', got '%s'", t, p.peekToken.Type)
	p.errors = append(p.errors, msg)
}

type (
	prefixParseFunction func() ast.Expression
	infixParseFunction  func(ast.Expression) ast.Expression
)

func (p *Parser) registerPrefixParseFn(tokenType token.TokenType, fn prefixParseFunction) {
	p.prefixParseFunctions[tokenType] = fn
}

func (p *Parser) registerInfixParseFn(tokenType token.TokenType, fn infixParseFunction) {
	p.infixParseFunctions[tokenType] = fn
}

func (p *Parser) parseExpression(precedence int) ast.Expression {
	prefix := p.prefixParseFunctions[p.currentToken.Type]

	if prefix == nil {
		p.noPrefixParseFunctionError(p.currentToken.Type)
		return nil
	}

	leftExpression := prefix()

	for !p.peekTokenIs(token.SEMICOLON) && precedence < p.peekPrecedence() {
		infixParseFunction := p.infixParseFunctions[p.peekToken.Type]
		if infixParseFunction == nil {
			return leftExpression
		}

		p.nextToken()

		leftExpression = infixParseFunction(leftExpression)
	}

	return leftExpression
}

func (p *Parser) parseIdentifier() ast.Expression {
	return &ast.Identifier{
		Token: p.currentToken,
		Value: p.currentToken.Literal,
	}
}

func (p *Parser) parseIntegerLiteral() ast.Expression {
	literal := &ast.IntegerLiteral{
		Token: p.currentToken,
	}

	value, err := strconv.ParseInt(p.currentToken.Literal, 0, 64)
	if err != nil {
		msg := fmt.Sprintf("could not parse %q as integer", p.currentToken.Literal)
		p.errors = append(p.errors, msg)
		return nil
	}

	literal.Value = value

	return literal
}

func (p *Parser) noPrefixParseFunctionError(t token.TokenType) {
	msg := fmt.Sprintf("no prefix parse function found for %s", t)
	p.errors = append(p.errors, msg)
}

func (p *Parser) parsePrefixExpression() ast.Expression {
	expression := &ast.PrefixExpression{
		Token:    p.currentToken,
		Operator: p.currentToken.Literal,
	}

	p.nextToken()

	expression.Right = p.parseExpression(PREFIX)

	return expression
}

func (p *Parser) peekPrecedence() int {
	if p, ok := precedences[p.peekToken.Type]; ok {
		return p
	}
	return LOWEST
}

func (p *Parser) currentPrecedence() int {
	if p, ok := precedences[p.currentToken.Type]; ok {
		return p
	}
	return LOWEST
}

func (p *Parser) parseInfixExpression(left ast.Expression) ast.Expression {
	expression := &ast.InfixExpression{
		Token:    p.currentToken,
		Operator: p.currentToken.Literal,
		Left:     left,
	}
	precedence := p.currentPrecedence()
	p.nextToken()
	expression.Right = p.parseExpression(precedence)
	return expression
}

func (p *Parser) parseBoolean() ast.Expression {
	return &ast.Boolean{
		Token: p.currentToken,
		Value: p.currentTokenIs(token.TRUE),
	}
}

func (p *Parser) parseGroupedExpression() ast.Expression {
	p.nextToken()
	exp := p.parseExpression(LOWEST)
	if !p.expectPeek(token.RIGHT_PARENTHESIS) {
		return nil
	}
	return exp
}
