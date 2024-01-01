package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	"vighnesh153/auth-app/handlers"
	"vighnesh153/auth-app/utils"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		os.Exit(1)
	}

	serverRootUri := os.Getenv("AUTH_SERVER_ROOT_URI")
	googleClientId := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	uiDomain := os.Getenv("UI_ROOT_HOST")
	authUICallbackUri := os.Getenv("AUTH_UI_CALLBACK_URI")

	if serverRootUri == "" ||
		googleClientId == "" ||
		googleClientSecret == "" ||
		uiDomain == "" ||
		authUICallbackUri == "" {
		log.Fatal("Some environment variables not found")
		os.Exit(1)
	}

	authRedirectUri := fmt.Sprintf("%s%s", serverRootUri, utils.GoogleAuthCallback)

	r := gin.Default()

	httpClient := http.Client{
		Timeout: time.Duration(10 * time.Second),
	}

	handlers.ConfigureInitiateGoogleAuthLogin(r, handlers.ConfigureInitiateGoogleAuthLoginOptions{
		RequestPath:      utils.RequestPathGetGoogleAuthUri,
		GoogleClientId:   googleClientId,
		AuthRedirectUri:  authRedirectUri,
		GoogleAuthScopes: utils.GoogleAuthScopes,
	})

	handlers.ConfigureGoogleAuthCallback(r, &httpClient, handlers.ConfigureGoogleAuthCallbackOptions{
		RequestPath:        utils.RequestPathAuthGoogleCallbackUri,
		GoogleClientId:     googleClientId,
		GoogleClientSecret: googleClientSecret,
		AuthRedirectUri:    authRedirectUri,
		UiDomain:           uiDomain,
		AuthUICallbackUri:  authUICallbackUri,
	})

	r.Run("localhost:4321")
}
