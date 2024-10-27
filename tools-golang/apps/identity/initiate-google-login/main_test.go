package main

import (
	"context"
	"net/http"
	"net/url"
	"os"
	"strings"
	"testing"
)

var authServerRootUri string = "https://auth-server-root-uri.com"
var googleClientId string = "google-client-id"

func TestHandleInitiateGoogleLoginRequestWithoutAuthServerRootUri(t *testing.T) {
	// arrange
	os.Setenv(EnvVarAuthServerRootUri, "")
	os.Setenv(EnvVarGoogleClientId, googleClientId)
	initialize()

	verifyResponseForMissingEnvVars(t)
}

func TestHandleInitiateGoogleLoginRequestWithoutGoogleClientId(t *testing.T) {
	// arrange
	os.Setenv(EnvVarAuthServerRootUri, authServerRootUri)
	os.Setenv(EnvVarGoogleClientId, "")
	initialize()

	verifyResponseForMissingEnvVars(t)
}

func TestHandleInitiateGoogleLoginRequestSuccess(t *testing.T) {
	// arrange
	os.Setenv(EnvVarAuthServerRootUri, authServerRootUri)
	os.Setenv(EnvVarGoogleClientId, googleClientId)
	initialize()

	// act
	response, err := handleInitiateGoogleLoginRequest(context.TODO(), Request{})
	if err != nil {
		t.Fatal("Expected no error, found:", err)
	}
	if response.StatusCode != http.StatusTemporaryRedirect {
		t.Fatal("Expected status code to be", http.StatusTemporaryRedirect, ", found:", response.StatusCode)
	}

	actualHeadersLocationValue, err := url.Parse(response.Headers["Location"])
	if err != nil {
		t.Fatal("Failed to parse the Headers.Location url value")
	}

	expectedHeadersLocationValue := url.URL{
		Scheme: SchemeHttps,
		Host:   GoogleOAuthHost,
		Path:   GoogleOAuthPath,
	}
	query := expectedHeadersLocationValue.Query()
	query.Set(QueryParamRedirectUriKey, authServerRootUri+GoogleAuthCallback)
	query.Set(QueryParamClientIdKey, googleClientId)
	query.Set(QueryParamAccessTypeKey, QueryParamOfflineValue)
	query.Set(QueryParamResponseTypeKey, QueryParamCodeValue)
	query.Set(QueryParamPromptKey, QueryParamConsentValue)
	query.Set(QueryParamScopeKey, strings.Join(GoogleAuthScopes, " "))
	expectedHeadersLocationValue.RawQuery = query.Encode()

	urlComparator := func(identifier string, selector func(url *url.URL) string) {
		expectedValue := selector(&expectedHeadersLocationValue)
		actualValue := selector(actualHeadersLocationValue)

		if expectedValue != actualValue {
			t.Fatalf("Expected '%s' to be '%s', found '%s'", identifier, expectedValue, actualValue)
		}
	}
	urlComparator("Scheme", func(url *url.URL) string { return url.Scheme })
	urlComparator("Host", func(url *url.URL) string { return url.Host })
	urlComparator("Path", func(url *url.URL) string { return url.Path })
	urlComparator("Query.redirect_uri", func(url *url.URL) string { return url.Query().Get(QueryParamRedirectUriKey) })
	urlComparator("Query.client_id", func(url *url.URL) string { return url.Query().Get(QueryParamClientIdKey) })
	urlComparator("Query.access_type", func(url *url.URL) string { return url.Query().Get(QueryParamAccessTypeKey) })
	urlComparator("Query.response_type", func(url *url.URL) string { return url.Query().Get(QueryParamResponseTypeKey) })
	urlComparator("Query.prompt", func(url *url.URL) string { return url.Query().Get(QueryParamPromptKey) })
	urlComparator("Query.scope", func(url *url.URL) string { return url.Query().Get(QueryParamScopeKey) })
}

func verifyResponseForMissingEnvVars(t *testing.T) {
	// act
	response, err := handleInitiateGoogleLoginRequest(context.TODO(), Request{})

	// assert
	if err != nil {
		t.Fatal("Expected no error, found:", err)
	}
	if response.StatusCode != http.StatusInternalServerError {
		t.Fatal("Expected status code to be", http.StatusInternalServerError, ", found:", response.StatusCode)
	}
	if response.Body != "Auth url empty" {
		t.Fatal("Expected Body to be 'Auth url empty', found:", response.Body)
	}
}
