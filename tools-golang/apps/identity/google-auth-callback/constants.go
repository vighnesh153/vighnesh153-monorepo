package main

import "net/url"

const (
	QueryParamCodeKey         = "code"
	QueryParamClientIdKey     = "client_id"
	QueryParamClientSecretKey = "client_secret"
	QueryParamGrantTypeKey    = "grant_type"
	QueryParamRedirectUriKey  = "redirect_uri"

	QueryParamAuthorizationCodeValue = "authorization_code"

	UiRedirectPath = "/auth/callback"

	EnvVarUiDomain              = "UI_DOMAIN"
	EnvVarGoogleAuthRedirectUri = "GOOGLE_AUTH_REDIRECT_URI"
	EnvVarGoogleClientId        = "GOOGLE_CLIENT_ID"
	EnvVarGoogleClientSecret    = "GOOGLE_CLIENT_SECRET"
	EnvVarCookieSecret          = "COOKIE_SECRET"
	EnvVarStage                 = "STAGE"

	CookieNameUserInfo  = "user-info"
	CookieNameUserToken = "user-token"

	CookieDomain = ".vighnesh153.dev"
	CookiePath   = "/"

	OneYearAsSeconds = 3600 * 24 * 365
)

var (
	GoogleOAuthTokenUrl = url.URL{
		Scheme: "https",
		Host:   "oauth2.googleapis.com",
		Path:   "/token",
	}
)
