package main

import (
	"net/url"
	"testing"
)

const (
	test_authCallbackCode   = "12345"
	test_googleClientId     = "google-client-id"
	test_googleClientSecret = "google-client-secret"
	test_redirectUri        = "redirectUri"
)

func TestConstructTokenUrlSuccess(t *testing.T) {
	actualTokenUrl := ConstructTokenUrl(test_authCallbackCode, test_googleClientId, test_googleClientSecret, test_redirectUri)

	expectedTokenUrl := url.URL{
		Scheme: GoogleOAuthTokenUrl.Scheme,
		Host:   GoogleOAuthTokenUrl.Host,
		Path:   GoogleOAuthTokenUrl.Path,
	}
	expectedQuery := expectedTokenUrl.Query()
	expectedQuery.Set(QueryParamCodeKey, test_authCallbackCode)
	expectedQuery.Set(QueryParamClientIdKey, test_googleClientId)
	expectedQuery.Set(QueryParamClientSecretKey, test_googleClientSecret)
	expectedQuery.Set(QueryParamGrantTypeKey, QueryParamAuthorizationCodeValue)
	expectedQuery.Set(QueryParamRedirectUriKey, test_redirectUri)
	expectedTokenUrl.RawQuery = expectedQuery.Encode()

	urlComparator := func(identifier string, selector func(url *url.URL) string) {
		expectedValue := selector(&expectedTokenUrl)
		actualValue := selector(actualTokenUrl)

		if expectedValue != actualValue {
			t.Fatalf("Expected '%s' to be '%s', found '%s'", identifier, expectedValue, actualValue)
		}
	}
	urlComparator("Scheme", func(url *url.URL) string { return url.Scheme })
	urlComparator("Host", func(url *url.URL) string { return url.Host })
	urlComparator("Path", func(url *url.URL) string { return url.Path })
	urlComparator("Query.code", func(url *url.URL) string { return url.Query().Get(QueryParamCodeKey) })
	urlComparator("Query.client_id", func(url *url.URL) string { return url.Query().Get(QueryParamClientIdKey) })
	urlComparator("Query.client_secret", func(url *url.URL) string { return url.Query().Get(QueryParamClientSecretKey) })
	urlComparator("Query.grant_type", func(url *url.URL) string { return url.Query().Get(QueryParamGrantTypeKey) })
	urlComparator("Query.redirect_uri", func(url *url.URL) string { return url.Query().Get(QueryParamRedirectUriKey) })
}
