import { Account, User } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { randomEmail, randomImage, randomName, randomUuid } from '@vighnesh153/fake-data';

import { deleteEverything } from '@/lib/prisma';

import { nextAuthCallback } from '../nextAuthCallback';
import { NextAuthDenySignIn } from '../nextAuthContants';

function generateRandomUser(): User {
  return {
    id: randomUuid(),
    name: randomName(),
    email: randomEmail(),
    image: randomImage(),
  };
}

function generateOauthAccount(provider: 'amazon' | 'google'): Account {
  return {
    provider,
    providerAccountId: `com.${provider}`,
    type: 'oauth',
  };
}

function generateGoogleProfile(overrides: Partial<GoogleProfile>): GoogleProfile {
  return {
    email_verified: true,
    aud: '',
    azp: '',
    exp: 0,
    family_name: '',
    given_name: '',
    hd: '',
    iat: 0,
    iss: '',
    jti: '',
    name: randomName(),
    email: randomEmail(),
    picture: randomImage(),
    nbf: 0,
    sub: '',
    ...overrides,
  };
}

describe('"nextAuthCallback" tests', () => {
  beforeEach(async () => {
    await deleteEverything();
  });

  it('should deny sign in if provider is not google', async () => {
    const isSignInAllowed = await nextAuthCallback({
      account: generateOauthAccount('amazon'),
      user: generateRandomUser(),
    });

    expect(isSignInAllowed).toBe(NextAuthDenySignIn);
  });

  it('should deny sign in if google profile is not verified', async () => {
    const isSignInAllowed = await nextAuthCallback({
      account: generateOauthAccount('google'),
      user: generateRandomUser(),
      profile: generateGoogleProfile({ email_verified: false }),
    });

    expect(isSignInAllowed).toBe(NextAuthDenySignIn);
  });
});
