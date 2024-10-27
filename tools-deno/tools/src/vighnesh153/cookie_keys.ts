export const cookieKeys = {
  userInfo: (stage: string): string => `${stage}-user-info`,
  authToken: (stage: string): string => `${stage}-auth-token`,
};
