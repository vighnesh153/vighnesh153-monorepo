package utils

import (
	"strings"
	"testing"
)

func TestRandomString(t *testing.T) {
	allowedCharacters := LowercaseAlphabet
	length := 10
	s := RandomString(length, allowedCharacters)

	if len(s) != length {
		t.Fatalf("Expected string-length to be '%v', found '%v'", length, len(s))
	}

	for _, char := range s {
		if !strings.ContainsRune(allowedCharacters, char) {
			t.Fatalf("Expected string to have characters from '%v', but it is '%v'", allowedCharacters, s)
		}
	}
}
