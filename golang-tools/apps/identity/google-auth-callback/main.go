package main

import (
	"context"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
)

var (
	uiDomain              string
	googleAuthRedirectUri string
	googleClientId        string
	googleClientSecret    string
	cookieSecret          string
	stage                 string

	httpClient *http.Client
)

func handleGoogleAuthCallback(_ context.Context, request Request) (Response, error) {
	authCallbackCode := request.QueryStringParameters[QueryParamCodeKey]
	if authCallbackCode == "" {
		return Response{
			StatusCode: http.StatusBadRequest,
			Body:       "QueryParams.code is empty",
		}, nil
	}

	if uiDomain == "" ||
		googleAuthRedirectUri == "" ||
		googleClientId == "" ||
		googleClientSecret == "" ||
		cookieSecret == "" ||
		stage == "" {
		return Response{
			StatusCode: http.StatusInternalServerError,
			Body:       "Some of the environment variables are missing and hence we are unable to process your request",
		}, nil
	}

	tokenUrl := ConstructTokenUrl(authCallbackCode, googleClientId, googleClientSecret, googleAuthRedirectUri)

	// fetch token
	tokenResponse, err := httpClient.PostForm(tokenUrl.String(), url.Values{})
	if err != nil {
		log.Println("Error occurred while fetching google token:", err)
		return Response{
			StatusCode: http.StatusInternalServerError,
			Body:       "Failed to get token",
		}, nil
	}
	defer tokenResponse.Body.Close()

	// parse token data
	var tokenData GoogleAuthTokenData
	err = json.NewDecoder(tokenResponse.Body).Decode(&tokenData)
	if err != nil {
		log.Println("Error occurred while parsing google token response:", err)
		return Response{
			StatusCode: http.StatusInternalServerError,
			Body:       "Failed to parse token response",
		}, nil
	}

	// decode user info from token
	googleAuthUserInfo, _, err := DecodeUserInfoFromJWTToken(tokenData.IdToken)
	if err != nil {
		log.Println("Error occurred while decoding user info from token:", err)
		return Response{
			StatusCode: http.StatusInternalServerError,
			Body:       "Failed to extract user info from token",
		}, nil
	}

	// user's email is not verified. deny signing in
	if googleAuthUserInfo.EmailVerified == false {
		log.Println("Email address is not verified:", googleAuthUserInfo)
		return Response{
			StatusCode: http.StatusNotAcceptable,
			Body:       "Email address is not verified",
		}, nil
	}

	// TODO: check if user exists in dynammo db
	// if yes, fetch the data as complete user info.
	// If no, create new complete user info and add it in dynammoTable as well

	completeUserInfo := CreateCompleteUserInfo(googleAuthUserInfo, nil, nil)
	completeUserInfoAsJson, err := json.Marshal(completeUserInfo)
	if err != nil {
		log.Println("Failed to json.Marshal complete user info:", err)
		return Response{
			StatusCode: http.StatusInternalServerError,
			Body:       "Failed to json.Marshal complete user info",
		}, nil
	}

	// encodes the completeUserInfo to base64 string
	urlEncodedCompleteUserInfo := base64.RawURLEncoding.EncodeToString([]byte(completeUserInfoAsJson))

	// encodes the userToken to base64 string
	rawUserToken := sha256.Sum256([]byte(completeUserInfo.Id + cookieSecret))
	urlEncodedUserAuthToken := base64.RawURLEncoding.EncodeToString([]byte(rawUserToken[:]))

	userInfoCookie := http.Cookie{
		Name:  fmt.Sprintf("%s-%s", stage, CookieNameUserInfo),
		Value: urlEncodedCompleteUserInfo,

		Path:   CookiePath,
		Domain: CookieDomain,
		MaxAge: OneYearAsSeconds,

		Secure:   true,
		HttpOnly: false,
	}

	userTokenCookie := http.Cookie{
		Name:  fmt.Sprintf("%s-%s", stage, CookieNameUserToken),
		Value: urlEncodedUserAuthToken,

		Path:   CookiePath,
		Domain: CookieDomain,
		MaxAge: OneYearAsSeconds,

		Secure:   true,
		HttpOnly: true,
	}

	return Response{
		StatusCode: http.StatusTemporaryRedirect,
		Headers: map[string]string{
			"Location": uiDomain + UiRedirectPath,
		},
		Cookies: []string{
			userInfoCookie.String(),
			userTokenCookie.String(),
		},
	}, nil
}

func init() {
	uiDomain = os.Getenv(EnvVarUiDomain)
	googleAuthRedirectUri = os.Getenv(EnvVarGoogleAuthRedirectUri)
	googleClientId = os.Getenv(EnvVarGoogleClientId)
	googleClientSecret = os.Getenv(EnvVarGoogleClientSecret)
	cookieSecret = os.Getenv(EnvVarCookieSecret)
	stage = os.Getenv(EnvVarStage)

	httpClient = &http.Client{
		Timeout: time.Duration(time.Second * 10),
	}
}

func main() {
	lambda.Start(handleGoogleAuthCallback)
}
