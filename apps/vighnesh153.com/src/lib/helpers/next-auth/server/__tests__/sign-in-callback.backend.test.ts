import { Account, User } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { randomEmail, randomImage, randomName, randomUuid } from '@vighnesh153/fake-data';

import { AllowSignIn, DenySignIn, signInCallback } from '../sign-in-callback';

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

describe('Next Auth Sign-in callback tests', () => {
  it('should deny sign in if provider is not google', async () => {
    const isSignInAllowed = await signInCallback({
      account: generateOauthAccount('amazon'),
      user: generateRandomUser(),
    });

    expect(isSignInAllowed).toBe(DenySignIn);
  });

  it('should deny sign in if google profile is not verified', async () => {
    const isSignInAllowed = await signInCallback({
      account: generateOauthAccount('google'),
      user: generateRandomUser(),
      profile: generateGoogleProfile({ email_verified: false }),
    });

    expect(isSignInAllowed).toBe(DenySignIn);
  });

  it('should create user info if the user is signing in for the first time', async () => {
    const isSignInAllowed = await signInCallback({
      account: generateOauthAccount('google'),
      user: generateRandomUser(),
      profile: generateGoogleProfile({ email_verified: true }),
    });

    expect(isSignInAllowed).toBe(AllowSignIn);
  });

  it('should sign-in the user if the user is signing in for the second time', async () => {
    const oauthAccount = generateOauthAccount('google');
    const randomUser = generateRandomUser();
    const googleProfile = generateGoogleProfile({ email_verified: true });

    // signup for the first time
    await signInCallback({
      account: oauthAccount,
      user: randomUser,
      profile: googleProfile,
    });

    // signing in for the second time
    const isSignInAllowed = await signInCallback({
      account: oauthAccount,
      user: randomUser,
      profile: googleProfile,
    });

    expect(isSignInAllowed).toBe(AllowSignIn);
  });
});
