package structs

type GoogleOAuthUserInfo struct {
	Name              string `json:"name"`
	Email             string `json:"email"`
	ProfilePictureUrl string `json:"picture"`
	EmailVerified     bool   `json:"email_verified"`
}

type PublicUserInfo struct {
	Name                  string `json:"name"`
	Email                 string `json:"email"`
	ProfilePictureUrl     string `json:"profile_picture_url"`
	SignupTimeEpochMillis int64  `json:"signup_time_millis"`
	ClientId              string `json:"client_id"`
}

type ServerUserInfo struct {
	PublicUserInfo  `json:"public_user_info"`
	PrivateServerId string `json:"private_server_id"`
}
