package ast

import (
	"testing"
	"vighnesh153/interpreters/monkey-lang/token"
)

func TestAstString(t *testing.T) {
	program := &Program{
		Statements: []Statement{
			&LetStatement{
				Token: token.Token{
					Type:    token.LET,
					Literal: "let",
				},
				Name: &Identifier{
					Token: token.Token{
						Type:    token.IDENTIFIER,
						Literal: "pikachu",
					},
					Value: "pikachu",
				},
				Value: &Identifier{
					Token: token.Token{
						Type:    token.IDENTIFIER,
						Literal: "best",
					},
					Value: "best",
				},
			},
		},
	}

	if program.String() != "let pikachu = best;" {
		t.Errorf("program.String() wrong. got=%q", program.String())
	}
}
