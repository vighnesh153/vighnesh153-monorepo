import { Account, User } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { randomEmail, randomImage, randomName, randomUuid } from '@vighnesh153/fake-data';

import { updateUserInfo } from '@/lib/mongoose/entity-updation';
import { commitTransactionAndEnd, createNewSessionWithTransaction } from '@/lib/mongoose/session';

import { AllowSignIn, DenySignIn, nextAuthCallback } from '../next-auth-callback';

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

// "sign-in first time" and "sign-in second time" tests are
// flaky (with a very low reproduction rate)
jest.retryTimes(5, { logErrorsBeforeRetry: true });

describe('Next Auth Sign-in callback tests', () => {
  it('should deny sign in if provider is not google', async () => {
    const isSignInAllowed = await nextAuthCallback({
      account: generateOauthAccount('amazon'),
      user: generateRandomUser(),
    });

    expect(isSignInAllowed).toBe(DenySignIn);
  });

  it('should deny sign in if google profile is not verified', async () => {
    const isSignInAllowed = await nextAuthCallback({
      account: generateOauthAccount('google'),
      user: generateRandomUser(),
      profile: generateGoogleProfile({ email_verified: false }),
    });

    expect(isSignInAllowed).toBe(DenySignIn);
  });

  it('should create user info if the user is signing in for the first time', async () => {
    const isSignInAllowed = await nextAuthCallback({
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
    await nextAuthCallback({
      account: oauthAccount,
      user: randomUser,
      profile: googleProfile,
    });

    // signing in for the second time
    const isSignInAllowed = await nextAuthCallback({
      account: oauthAccount,
      user: randomUser,
      profile: googleProfile,
    });

    expect(isSignInAllowed).toBe(AllowSignIn);
  });

  it('should deny sign-in if user account is completely banned', async () => {
    const oauthAccount = generateOauthAccount('google');
    const randomUser = generateRandomUser();
    const emailId =
      randomUser.email ??
      ((): string => {
        throw new Error('This should not be undefined or null');
      })();
    const googleProfile = generateGoogleProfile({ email: emailId, email_verified: true });

    // signup for the first time
    await nextAuthCallback({
      account: oauthAccount,
      user: randomUser,
      profile: googleProfile,
    });

    const session = await createNewSessionWithTransaction();
    await updateUserInfo(
      {
        _id: emailId,
        completelyBanned: true,
      },
      session
    );
    await commitTransactionAndEnd(session);

    // signing in
    const isSignInAllowed = await nextAuthCallback({
      account: oauthAccount,
      user: randomUser,
      profile: googleProfile,
    });

    expect(isSignInAllowed).toBe(DenySignIn);
  });
});
