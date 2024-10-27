package main

import (
	"encoding/base64"
	"encoding/json"
	"strings"

	"github.com/vighnesh153/structs"
)

const emptyJsonString = "{}"

/*
 * @returns UserInfo, UserInfoAsJson, Error
 */
func DecodeUserInfoFromJWTToken(token string) (*structs.GoogleOAuthUserInfo, string, error) {
	userInfoSegment := strings.Split(token, ".")[1]

	jsonStringBytes, err := base64.RawURLEncoding.DecodeString(userInfoSegment)
	if err != nil {
		return nil, emptyJsonString, err
	}

	var userInfo structs.GoogleOAuthUserInfo
	err = json.Unmarshal(jsonStringBytes, &userInfo)
	if err != nil {
		return nil, emptyJsonString, err
	}

	return &userInfo, string(jsonStringBytes), nil
}
