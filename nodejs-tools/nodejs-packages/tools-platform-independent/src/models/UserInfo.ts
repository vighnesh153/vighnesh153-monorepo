export type GoogleOAuthUserInfo = {
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
};

export interface PublicUserInfo {
  userId: string;
  name: string;
  profilePictureUrl: string;
  createdAtMillis: number;
}

export interface CompleteUserInfo extends PublicUserInfo {
  email: string;
}
