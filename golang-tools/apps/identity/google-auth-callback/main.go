package main

import (
	"context"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Request events.APIGatewayProxyRequest
type Response events.APIGatewayProxyResponse

func handleGoogleAuthCallback(_ context.Context, _ Request) (Response, error) {

	return Response{
		StatusCode: http.StatusTemporaryRedirect,
		Headers:    map[string]string{
			// "Location": authUrl,
		},
	}, nil
}

func initialize() {

}

func main() {
	initialize()
	lambda.Start(handleGoogleAuthCallback)
}
