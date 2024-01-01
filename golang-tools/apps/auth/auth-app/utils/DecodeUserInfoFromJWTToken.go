package utils

import (
	"encoding/base64"
	"encoding/json"
	"strings"
	"vighnesh153/auth-app/models"
)

const emptyJsonString = "{}"

/*
 * @returns UserInfo, UserInfoAsJson, Error
 */
func DecodeUserInfoFromJWTToken(token string) (*models.UserInfo, string, error) {
	userInfoSegment := strings.Split(token, ".")[1]

	jsonStringBytes, err := base64.StdEncoding.DecodeString(userInfoSegment)
	if err != nil {
		return nil, emptyJsonString, err
	}

	var userInfo models.UserInfo
	err = json.Unmarshal(jsonStringBytes, &userInfo)
	if err != nil {
		return nil, emptyJsonString, err
	}

	return &userInfo, string(jsonStringBytes), nil
}
