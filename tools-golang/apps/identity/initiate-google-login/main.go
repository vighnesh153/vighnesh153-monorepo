package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Request events.APIGatewayProxyRequest
type Response events.APIGatewayProxyResponse

var authUrl string = ""

func handleInitiateGoogleLoginRequest(_ context.Context, _ Request) (Response, error) {
	if authUrl == "" {
		return Response{
			StatusCode: http.StatusInternalServerError,
			Body:       "Auth url empty",
		}, nil
	}

	return Response{
		StatusCode: http.StatusTemporaryRedirect,
		Headers: map[string]string{
			"Location": authUrl,
		},
	}, nil
}

func initialize() {
	serverRootUri := os.Getenv(EnvVarAuthServerRootUri)
	googleClientId := os.Getenv(EnvVarGoogleClientId)

	if serverRootUri != "" && googleClientId != "" {
		authRedirectUri := fmt.Sprintf("%s%s", serverRootUri, GoogleAuthCallback)
		authUrl = ConstructGoogleAuthUrl(ConstructGoogleAuthUrlOptions{
			GoogleClientId:   googleClientId,
			AuthRedirectUri:  authRedirectUri,
			GoogleAuthScopes: GoogleAuthScopes,
		})
	}
}

func main() {
	initialize()
	lambda.Start(handleInitiateGoogleLoginRequest)
}
