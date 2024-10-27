package utils

import "math/rand"

func RandomString(length int, allowedCharacters string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = allowedCharacters[rand.Intn(len(allowedCharacters))]
	}
	return string(b)
}
