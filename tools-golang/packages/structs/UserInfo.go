package structs

type GoogleOAuthUserInfo struct {
	Name              string `json:"name"`
	Email             string `json:"email"`
	ProfilePictureUrl string `json:"picture"`
	EmailVerified     bool   `json:"email_verified"`
}

type PublicUserInfo struct {
	Id                    string `json:"id"`
	Name                  string `json:"name"`
	ProfilePictureUrl     string `json:"profile_picture_url"`
	SignupTimeEpochMillis int64  `json:"signup_time_millis"`
}

type CompleteUserInfo struct {
	Id                    string `json:"id"`
	Name                  string `json:"name"`
	Email                 string `json:"email"`
	ProfilePictureUrl     string `json:"profile_picture_url"`
	SignupTimeEpochMillis int64  `json:"signup_time_millis"`
}
