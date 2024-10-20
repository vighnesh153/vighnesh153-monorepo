import { type GoogleOAuthUserInfo, Logger } from "@vighnesh153/tools";

export interface UserInfoDecoder {
  decodeFromGoogleOAuthJwt(token: string): GoogleOAuthUserInfo | null;
}

export class UserInfoDecoderImpl implements UserInfoDecoder {
  constructor(private logger: Logger) {}

  decodeFromGoogleOAuthJwt(token: string): GoogleOAuthUserInfo | null {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      this.logger.log(`Some error occurred while parsing Google Oauth token`);
      this.logger.log(e);
      return null;
    }
  }
}

export class FakeUserInfoDecoder implements UserInfoDecoder {
  userInfo: GoogleOAuthUserInfo | null = null;

  decodeFromGoogleOAuthJwt(): GoogleOAuthUserInfo | null {
    return this.userInfo;
  }
}
