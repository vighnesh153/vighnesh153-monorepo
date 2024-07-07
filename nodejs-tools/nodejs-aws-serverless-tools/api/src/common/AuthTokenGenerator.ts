import crypto from 'node:crypto';

export interface AuthTokenGeneratorParams {
  userId: string;
  cookieSecret: string;
}

export interface AuthTokenGenerator {
  generate(params: AuthTokenGeneratorParams): string;
}

export class AuthTokenGeneratorImpl implements AuthTokenGenerator {
  generate({ userId, cookieSecret }: AuthTokenGeneratorParams): string {
    const data = `${userId}-${cookieSecret}`;
    return crypto.createHash('sha256').update(data, 'binary').digest('hex');
  }
}

export class FakeAuthTokenGenerator implements AuthTokenGenerator {
  authToken: string | null = null;

  generate({ userId, cookieSecret }: AuthTokenGeneratorParams): string {
    return this.authToken ?? `hashed(${userId}-${cookieSecret})`;
  }
}
