package main

import (
	"fmt"
	"testing"

	"github.com/vighnesh153/structs"
)

const signUpTimeMillis = 12345
const randomIdSuffix = "suffix"

type fakeClock struct{}

func (fakeClock) UnixMilli() int64 {
	return signUpTimeMillis
}

func fakeRandomStringBuilder(_ int, _ string) string {
	return randomIdSuffix
}

func TestCreateCompleteUserInfo(t *testing.T) {
	oauthUserInfo := structs.GoogleOAuthUserInfo{
		Name:              "Pikachu Is The Best",
		Email:             "pikachu@pokemon.com",
		ProfilePictureUrl: "https://pokemon.com/pikachu.png",
		EmailVerified:     true,
	}
	completeUserInfo := CreateCompleteUserInfo(&oauthUserInfo, fakeClock{}, fakeRandomStringBuilder)
	expectedId := fmt.Sprintf("pikachu-is-the-best-%s", randomIdSuffix)

	if completeUserInfo.Name != oauthUserInfo.Name {
		t.Fatalf("Expected Name to be '%v', but found '%v'", oauthUserInfo.Name, completeUserInfo.Name)
	}
	if completeUserInfo.Email != oauthUserInfo.Email {
		t.Fatalf("Expected Email to be '%v', but found '%v'", oauthUserInfo.Email, completeUserInfo.Email)
	}
	if completeUserInfo.ProfilePictureUrl != oauthUserInfo.ProfilePictureUrl {
		t.Fatalf("Expected ProfilePictureUrl to be '%v', but found '%v'", oauthUserInfo.ProfilePictureUrl, completeUserInfo.ProfilePictureUrl)
	}
	if completeUserInfo.SignupTimeEpochMillis != signUpTimeMillis {
		t.Fatalf("Expected SignupTimeEpochMillis to be '%v', but found '%v'", signUpTimeMillis, completeUserInfo.SignupTimeEpochMillis)
	}
	if completeUserInfo.Id != expectedId {
		t.Fatalf("Expected Id to be '%v', but found '%v'", expectedId, completeUserInfo.Id)
	}
}

func TestSlugifySuccess(t *testing.T) {
	s := "Pikachu!@#infernape$charizard**"
	expected := "pikachu-infernape-charizard"
	actual := slugify(s)

	if expected != actual {
		t.Fatalf("Expected slug to be '%v', found '%v'", expected, actual)
	}
}
