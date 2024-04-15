import crypto from 'node:crypto';

import { CompleteUserInfo } from '@vighnesh153/types';

export interface AuthTokenGeneratorParams {
  userInfo: CompleteUserInfo;
  cookieSecret: string;
}

export interface AuthTokenGenerator {
  generate(params: AuthTokenGeneratorParams): string;
}

export class AuthTokenGeneratorImpl implements AuthTokenGenerator {
  generate(params: AuthTokenGeneratorParams): string {
    const data = `${params.userInfo.userId}-${params.cookieSecret}`;
    return crypto.createHash('sha256').update(data, 'binary').digest('hex');
  }
}
