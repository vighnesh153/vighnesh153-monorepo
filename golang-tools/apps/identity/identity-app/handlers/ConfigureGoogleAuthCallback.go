package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"

	"github.com/vighnesh153/identity-app/utils"

	"github.com/gin-gonic/gin"
)

type ConfigureGoogleAuthCallbackOptions struct {
	GoogleClientId     string
	GoogleClientSecret string
	AuthRedirectUri    string
	RequestPath        string
	UiDomain           string
	AuthUICallbackUri  string
	SecureCookies      bool
}

type googleAuthTokenData struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	IdToken      string `json:"id_token"`
	ExpiresIn    int    `json:"expires_in"`
	Score        string `json:"scope"`
}

func ConfigureGoogleAuthCallback(e *gin.Engine, httpClient *http.Client, options ConfigureGoogleAuthCallbackOptions) {
	e.GET(options.RequestPath, func(c *gin.Context) {
		tokenUrl, err := constructTokenUrl(c.Query(utils.QueryParamCodeKey), options.GoogleClientId, options.GoogleClientSecret, options.AuthRedirectUri)
		if err != nil {
			log.Println("Error occurred while constructing google token url:", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to construct token url",
			})
			return
		}

		// fetch token
		tokenResponse, err := httpClient.PostForm(tokenUrl.String(), url.Values{})
		if err != nil {
			log.Println("Error occurred while fetching google token:", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to get token",
			})
			return
		}
		defer tokenResponse.Body.Close()

		var tokenData googleAuthTokenData
		err = json.NewDecoder(tokenResponse.Body).Decode(&tokenData)
		if err != nil {
			log.Println("Error occurred while parsing google token response:", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to parse token response",
			})
			return
		}

		userInfo, userInfoAsJson, err := utils.DecodeUserInfoFromJWTToken(tokenData.AccessToken)
		if err != nil {
			log.Println("Error occurred while decoding user info from token:", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to extract user info from token",
			})
			return
		}

		if userInfo.EmailVerified == false {
			log.Println("Email address is not verified:", userInfo)
			c.JSON(http.StatusNotAcceptable, gin.H{
				"message": "Email address is not verified",
			})
			return
		}

		// todo: create user info cookie and a hash of user info cookie
		// todo: create a user table in dynammo db

		c.SetCookie(
			"user_info",
			userInfoAsJson,
			86400*365, // one day as seconds
			"/",
			options.UiDomain,
			options.SecureCookies,
			false,
		)

		c.JSON(http.StatusOK, tokenData)
	})
}

func constructTokenUrl(authCallbackCode, googleClientId, googleClientSecret, redirectUri string) (*url.URL, error) {
	tokenUrl, err := url.Parse(utils.GoogleOAuthTokenUrl)
	if err != nil {
		return nil, err
	}
	query := tokenUrl.Query()
	query.Set(utils.QueryParamCodeKey, authCallbackCode)
	query.Set(utils.QueryParamClientIdKey, googleClientId)
	query.Set(utils.QueryParamClientSecretKey, googleClientSecret)
	query.Set(utils.QueryParamGrantTypeKey, utils.QueryParamAuthorizationCodeValue)
	query.Set(utils.QueryParamRedirectUriKey, redirectUri)
	tokenUrl.RawQuery = query.Encode()

	return tokenUrl, nil
}
