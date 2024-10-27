package main

import (
	"net/url"
)

const ()

func ConstructTokenUrl(authCallbackCode, googleClientId, googleClientSecret, redirectUri string) *url.URL {
	tokenUrl := url.URL{
		Scheme: GoogleOAuthTokenUrl.Scheme,
		Host:   GoogleOAuthTokenUrl.Host,
		Path:   GoogleOAuthTokenUrl.Path,
	}

	query := tokenUrl.Query()
	query.Set(QueryParamCodeKey, authCallbackCode)
	query.Set(QueryParamClientIdKey, googleClientId)
	query.Set(QueryParamClientSecretKey, googleClientSecret)
	query.Set(QueryParamGrantTypeKey, QueryParamAuthorizationCodeValue)
	query.Set(QueryParamRedirectUriKey, redirectUri)
	tokenUrl.RawQuery = query.Encode()

	return &tokenUrl
}
