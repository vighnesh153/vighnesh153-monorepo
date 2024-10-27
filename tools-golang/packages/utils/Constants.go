package utils

const (
	Digits = "0123456789"

	LowercaseHexDigits = Digits + "abcdef"
	UppercaseHexDigits = Digits + "ABCDEF"
	HexDigits          = Digits + "ABCDEFabcdef"

	OctalDigits = "01234567"

	LowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz"
	UppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	Alphabet          = LowercaseAlphabet + UppercaseAlphabet

	WhiteSpaceCharacters  = "\t\n\r"
	PunctuationCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
	PrintableCharacters   = Digits + Alphabet + PunctuationCharacters + WhiteSpaceCharacters
)
