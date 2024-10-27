package main

import (
	"fmt"
	"strings"

	"github.com/vighnesh153/structs"
	"github.com/vighnesh153/utils"
)

func CreateCompleteUserInfo(userInfo *structs.GoogleOAuthUserInfo, myClock clock, createRandomString func(length int, allowedCharacters string) string) *structs.CompleteUserInfo {
	if myClock == nil {
		myClock = NewClock()
	}
	if createRandomString == nil {
		createRandomString = utils.RandomString
	}

	nameSlug := slugify(userInfo.Name)
	idSuffix := createRandomString(10, utils.LowercaseAlphabet+utils.Digits)
	return &structs.CompleteUserInfo{
		Id:                    fmt.Sprintf("%s-%s", nameSlug, idSuffix),
		Name:                  userInfo.Name,
		Email:                 userInfo.Email,
		ProfilePictureUrl:     userInfo.ProfilePictureUrl,
		SignupTimeEpochMillis: myClock.UnixMilli(),
	}
}

func slugify(s string) string {
	replaceCh := '-'

	characters := []rune{}
	for _, ch := range strings.ToLower(s) {
		if strings.ContainsRune(utils.Alphabet+utils.Digits, ch) {
			characters = append(characters, ch)
		} else {
			if len(characters) == 0 || characters[len(characters)-1] != replaceCh {
				characters = append(characters, replaceCh)
			}
		}
	}
	if len(characters) > 0 {
		if characters[0] == replaceCh {
			characters = characters[1:]
		}
		if characters[len(characters)-1] == replaceCh {
			characters = characters[:len(characters)-1]
		}
	}
	return strings.Trim(string(characters), " ")
}
