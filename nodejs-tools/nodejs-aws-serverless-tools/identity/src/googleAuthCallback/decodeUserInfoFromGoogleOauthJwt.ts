interface UserInfo {}

export interface UserInfoDecoder {
  decodeFromGoogleOauthJwt(token: string): UserInfo;
}

export class UserInfoDecoderImpl implements UserInfoDecoder {
  decodeFromGoogleOauthJwt(token: string): UserInfo {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return {}
    }
  }
}
