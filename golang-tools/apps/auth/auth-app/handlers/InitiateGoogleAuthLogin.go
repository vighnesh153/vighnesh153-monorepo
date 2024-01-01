package handlers

import (
	"net/http"
	"vighnesh153/auth-app/utils"

	"github.com/gin-gonic/gin"
)

type ConfigureInitiateGoogleAuthLoginOptions struct {
	GoogleClientId   string
	AuthRedirectUri  string
	GoogleAuthScopes []string

	RequestPath string
}

func ConfigureInitiateGoogleAuthLogin(e *gin.Engine, options ConfigureInitiateGoogleAuthLoginOptions) {
	url := utils.ConstructGoogleAuthUrl(utils.ConstructGoogleAuthUrlOptions{
		GoogleClientId:   options.GoogleClientId,
		AuthRedirectUri:  options.AuthRedirectUri,
		GoogleAuthScopes: options.GoogleAuthScopes,
	})

	e.GET(options.RequestPath, func(c *gin.Context) {
		c.Redirect(http.StatusTemporaryRedirect, url)
	})
}
