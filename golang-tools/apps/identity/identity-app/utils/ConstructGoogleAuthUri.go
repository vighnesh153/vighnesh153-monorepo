package utils

import (
	"net/url"
	"strings"
)

type ConstructGoogleAuthUrlOptions struct {
	AuthRedirectUri  string
	GoogleClientId   string
	GoogleAuthScopes []string
}

func ConstructGoogleAuthUrl(options ConstructGoogleAuthUrlOptions) string {
	url := url.URL{
		Scheme: SchemeHttps,
		Host:   GoogleOAuthHost,
		Path:   GoogleOAuthPath,
	}
	query := url.Query()
	query.Set(QueryParamRedirectUriKey, options.AuthRedirectUri)
	query.Set(QueryParamClientIdKey, options.GoogleClientId)
	query.Set(QueryParamAccessTypeKey, QueryParamOfflineValue)
	query.Set(QueryParamResponseTypeKey, QueryParamCodeValue)
	query.Set(QueryParamPromptKey, QueryParamConsentValue)
	query.Set(QueryParamScopeKey, strings.Join(options.GoogleAuthScopes, " "))
	url.RawQuery = query.Encode()
	return url.String()
}
