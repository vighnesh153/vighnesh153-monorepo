export const authScopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

export const LambdaAuthCallbackPath = '/googleAuthCallback';

export function inProduction<T>(callback: () => T): T {
  if (process.env.NODE_ENV === 'test') {
    return undefined as T;
  }
  return callback();
}
