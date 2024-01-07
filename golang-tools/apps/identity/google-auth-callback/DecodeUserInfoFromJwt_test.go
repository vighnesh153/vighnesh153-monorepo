package main

import (
	"encoding/base64"
	"fmt"
	"testing"
)

func TestDecodeUserInfoFromJwtSuccess(t *testing.T) {
	// arrage
	name, email, picture, emailVerified := "Pikachu", "pikachu@pokemon.com", "https://pokemon.com/pikachu.png", true
	randomString := fmt.Sprintf(`{ 
		"name": "%s",
		"email": "%s",
		"picture": "%s",
		"email_verified": %t
	}`, name, email, picture, emailVerified)
	b64String := base64.StdEncoding.EncodeToString([]byte(randomString))
	token := fmt.Sprintf("bla.%s.bla", b64String)

	// act
	userInfo, userInfoAsJson, err := DecodeUserInfoFromJWTToken(token)

	// assert
	if userInfo == nil {
		t.Fatalf("Expected userInfo to not be 'nil', but it 'nil'")
	}
	if userInfo.Name != name {
		t.Fatalf("Expected userInfo.Name to be '%s', found '%s'", name, userInfo.Name)
	}
	if userInfo.Email != email {
		t.Fatalf("Expected userInfo.Name to be '%s', found '%s'", email, userInfo.Email)
	}
	if userInfo.ProfilePictureUrl != picture {
		t.Fatalf("Expected userInfo.Name to be '%s', found '%s'", picture, userInfo.ProfilePictureUrl)
	}
	if userInfo.EmailVerified != emailVerified {
		t.Fatalf("Expected userInfo.Name to be '%t', found '%t'", emailVerified, userInfo.EmailVerified)
	}
	if userInfoAsJson != randomString {
		t.Fatalf("Expected userInfoAsJson to be '%s', found '%s'", randomString, userInfoAsJson)
	}
	if err != nil {
		t.Fatalf("Expected err to be 'nil', found %s", err)
	}
}

func TestDecodeUserInfoFromJwtInvalidBase64String(t *testing.T) {
	// arrange
	randomString := `{ 
		"message": "Pikachu is the best"
	}`
	b64String := base64.StdEncoding.EncodeToString([]byte(randomString))
	token := fmt.Sprintf("bla.%s.bla", b64String[1:10])

	// act
	userInfo, userInfoAsJson, err := DecodeUserInfoFromJWTToken(token)

	// assert
	if userInfo != nil {
		t.Fatalf("Expected userInfo to be 'nil', found '%v'", *userInfo)
	}
	if userInfoAsJson != emptyJsonString {
		t.Fatalf("Expected userInfoAsJson to be '%s', found '%s'", emptyJsonString, userInfoAsJson)
	}
	expectedErr := "illegal base64 data at input byte 8"
	if err.Error() != expectedErr {
		t.Fatalf("Expected err to be '%s', found %s", expectedErr, err)
	}
}

func TestDecodeUserInfoFromJwtInvalidJsonString(t *testing.T) {
	// arrage
	randomString := `{ 
		"message": "Pikachu is the best
	}`
	b64String := base64.StdEncoding.EncodeToString([]byte(randomString))
	token := fmt.Sprintf("bla.%s.bla", b64String)

	// act
	userInfo, userInfoAsJson, err := DecodeUserInfoFromJWTToken(token)

	// assert
	if userInfo != nil {
		t.Fatalf("Expected userInfo to be 'nil', found '%v'", *userInfo)
	}
	if userInfoAsJson != emptyJsonString {
		t.Fatalf("Expected userInfoAsJson to be '%s', found '%s'", emptyJsonString, userInfoAsJson)
	}
	expectedErr := "invalid character '\\n' in string literal"
	if err.Error() != expectedErr {
		t.Fatalf("Expected err to be '%s', found %s", expectedErr, err)
	}
}
