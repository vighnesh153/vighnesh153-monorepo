package main

import (
	"net/http"
	"testing"
)

func TestBuildJsonResponseSuccess(t *testing.T) {
	headerKey := "Content-Type"
	headerValue := "application/json"
	statusCode := http.StatusAccepted
	response, err := BuildJsonResponse(statusCode, map[string]string{
		"pokemon": "Pikachu",
	})

	if err != nil {
		t.Fatalf("Expected err to be 'nil', found '%s'", err)
	}
	if response.StatusCode != statusCode {
		t.Fatalf("Expected StatusCode to be '%v', found '%v'", statusCode, response.StatusCode)
	}
	if response.Headers[headerKey] != headerValue {
		t.Fatalf("Expected Headers.Content-Type to be '%s', found '%s'", headerValue, response.Headers[headerKey])
	}
	expectedResponseBody := `{"pokemon":"Pikachu"}`
	if response.Body != expectedResponseBody {
		t.Fatalf("Expected Body to be '%v', found '%v'", expectedResponseBody, response.Body)
	}
}
