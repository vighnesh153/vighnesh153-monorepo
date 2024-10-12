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

export function convertToPublicUserInfo(completeUserInfo: CompleteUserInfo): PublicUserInfo {
  const publicUserInfo = { ...completeUserInfo };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete publicUserInfo['email'];
  return publicUserInfo;
}
