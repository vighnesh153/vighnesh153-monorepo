package main

const (
	SchemeHttps     = "https"
	GoogleOAuthHost = "accounts.google.com"
	GoogleOAuthPath = "/o/oauth2/v2/auth"

	QueryParamRedirectUriKey  = "redirect_uri"
	QueryParamClientIdKey     = "client_id"
	QueryParamAccessTypeKey   = "access_type"
	QueryParamResponseTypeKey = "response_type"
	QueryParamPromptKey       = "prompt"
	QueryParamScopeKey        = "scope"

	QueryParamOfflineValue = "offline"
	QueryParamCodeValue    = "code"
	QueryParamConsentValue = "consent"

	GoogleAuthCallback = "/auth/google/callback"
)

var (
	GoogleAuthScopes = []string{
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/userinfo.email",
	}
)
