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

var authUrl string

func handleInitiateGoogleLoginRequest(ctx context.Context, request Request) (Response, error) {
	return Response{
		StatusCode: http.StatusTemporaryRedirect,
		Headers: map[string]string{
			"Location": authUrl,
		},
	}, nil
}

func main() {
	serverRootUri := os.Getenv("AUTH_SERVER_ROOT_URI")
	googleClientId := os.Getenv("GOOGLE_CLIENT_ID")

	authRedirectUri := fmt.Sprintf("%s%s", serverRootUri, GoogleAuthCallback)

	authUrl = ConstructGoogleAuthUrl(ConstructGoogleAuthUrlOptions{
		GoogleClientId:   googleClientId,
		AuthRedirectUri:  authRedirectUri,
		GoogleAuthScopes: GoogleAuthScopes,
	})

	lambda.Start(handleInitiateGoogleLoginRequest)
}
