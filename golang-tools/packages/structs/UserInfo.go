package structs

type GoogleOAuthUserInfo struct {
	Name              string `json:"name"`
	Email             string `json:"email"`
	ProfilePictureUrl string `json:"picture"`
	EmailVerified     bool   `json:"email_verified"`
}

type PublicUserInfo struct {
	Username              string
	Name                  string
	Email                 string
	ProfilePictureUrl     string
	SignupTimeEpochMillis int64
	ClientId              string
}

type ServerUserInfo struct {
	PublicUserInfo
	ServerId string
}
