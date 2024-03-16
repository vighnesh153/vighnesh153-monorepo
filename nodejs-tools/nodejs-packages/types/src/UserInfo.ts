export type GoogleOAuthUserInfo = {
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
};

export interface PublicUserInfo {
  clientId: string;
  name: string;
  profilePictureUrl: string;
  createdAtMillis: number;
}

export interface CompleteUserInfo {
  clientId: string;
  serverId: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  createdAtMillis: number;
}
