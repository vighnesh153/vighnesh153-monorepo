import { Logger } from '@vighnesh153/logger';
import { type GoogleOAuthUserInfo } from '@vighnesh153/types';

export interface UserInfoDecoder {
  decodeFromGoogleOAuthJwt(token: string): GoogleOAuthUserInfo | null;
}

export class UserInfoDecoderImpl implements UserInfoDecoder {
  constructor(private logger: Logger) {}

  decodeFromGoogleOAuthJwt(token: string): GoogleOAuthUserInfo | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      this.logger.log(`Some error occurred while parsing Google Oauth token`)
      this.logger.log(e)
      return null;
    }
  }
}
