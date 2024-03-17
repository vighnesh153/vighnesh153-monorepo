export type GoogleOAuthUserInfo = {
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
};

export interface PublicUserInfo {
  publicId: string;
  name: string;
  profilePictureUrl: string;
  createdAtMillis: number;
}

export interface CompleteUserInfo extends PublicUserInfo {
  internalId: string;
  email: string;
}
