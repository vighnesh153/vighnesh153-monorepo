import { User } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { DenySignIn, signInCallback } from '../sign-in-callback';

describe('Next Auth Sign-in callback tests', () => {
  it('should deny sign in if provider is not google', async () => {
    const result = await signInCallback({
      account: {
        provider: 'amazon',
        providerAccountId: 'com.amazon',
        type: 'oauth',
      },
      user: {} as User,
    });

    expect(result).toBe(DenySignIn);
  });

  it('should deny sign in if google profile is not verified', async () => {
    const result = await signInCallback({
      account: {
        provider: 'google',
        providerAccountId: 'com.google',
        type: 'oauth',
      },
      user: {} as User,
      profile: {
        email_verified: false,
      } as GoogleProfile,
    });

    expect(result).toBe(DenySignIn);
  });

  // TODO: add more tests
});
