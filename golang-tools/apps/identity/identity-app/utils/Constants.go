package utils

const (
	SchemeHttps         = "https"
	GoogleOAuthHost     = "accounts.google.com"
	GoogleOAuthPath     = "/o/oauth2/v2/auth"
	GoogleOAuthTokenUrl = "https://oauth2.googleapis.com/token"

	GoogleAuthCallback = "/auth/google/callback"

	QueryParamRedirectUriKey  = "redirect_uri"
	QueryParamClientIdKey     = "client_id"
	QueryParamClientSecretKey = "client_secret"
	QueryParamAccessTypeKey   = "access_type"
	QueryParamResponseTypeKey = "response_type"
	QueryParamPromptKey       = "prompt"
	QueryParamScopeKey        = "scope"
	QueryParamCodeKey         = "code"
	QueryParamGrantTypeKey    = "grant_type"

	QueryParamOfflineValue           = "offline"
	QueryParamCodeValue              = "code"
	QueryParamConsentValue           = "consent"
	QueryParamAuthorizationCodeValue = "authorization_code"

	RequestPathGetGoogleAuthUri      = "/auth/google/login"
	RequestPathAuthGoogleCallbackUri = "/auth/google/callback"
)

var (
	GoogleAuthScopes = []string{
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/userinfo.email",
	}
)
