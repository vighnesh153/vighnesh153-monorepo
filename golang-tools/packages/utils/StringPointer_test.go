package utils

import "testing"

func TestNilStringPointerNil(t *testing.T) {
	var s string

	if *StringPointer(s) != s {
		t.Fatalf("Pointer doesn't point to the passed string")
	}
}

func TestStringPointerNonNil(t *testing.T) {
	s := "Pikachu"

	if *StringPointer(s) != s {
		t.Fatalf("Pointer doesn't point to the passed string")
	}
}
