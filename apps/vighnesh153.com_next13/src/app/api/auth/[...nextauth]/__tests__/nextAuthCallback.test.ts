import { Account, User } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { randomEmail, randomImage, randomName, randomUuid } from '@vighnesh153/fake-data';

import { AuditAction } from '@prisma/client';

import { deleteEverything, prisma } from '@/lib/prisma';

import { nextAuthCallback } from '../nextAuthCallback';
import { NextAuthAllowSignIn, NextAuthDenySignIn } from '../nextAuthContants';

// Needed only for testing while building project on Vercel
// Using NeonDB for testing on Vercel
const timeout = 30000;

function generateRandomUser() {
  return {
    id: randomUuid(),
    name: randomName(),
    email: randomEmail(),
    image: randomImage(),
  } satisfies User;
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
  describe('pre-logic filters', () => {
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

  describe('db access', () => {
    beforeEach(async () => {
      await deleteEverything();
    });

    it(
      'should allow signing in if the user is signing up',
      async () => {
        const user = generateRandomUser();
        const googleProfile = generateGoogleProfile({ email_verified: true, ...user, picture: user.image });

        // NextAuth will create the user entry before invoking the "nextAuthCallback"
        await prisma.user.create({ data: { ...user } });

        const isSignInAllowed = await nextAuthCallback({
          account: generateOauthAccount('google'),
          user,
          profile: googleProfile,
        });

        expect(isSignInAllowed).toBe(NextAuthAllowSignIn);
      },
      timeout
    );

    it(
      'should create the audit log for sign up',
      async () => {
        const user = generateRandomUser();
        const googleProfile = generateGoogleProfile({ email_verified: true, ...user, picture: user.image });

        // NextAuth will create the user entry before invoking the "nextAuthCallback"
        await prisma.user.create({ data: { ...user } });

        await nextAuthCallback({
          account: generateOauthAccount('google'),
          user,
          profile: googleProfile,
        });

        const auditLogs = await prisma.auditLog.findMany({
          where: {
            userId: user.id,
          },
        });

        expect(auditLogs.length).toBe(1);
        expect(auditLogs[0].action).toBe(AuditAction.SIGN_UP);
      },
      timeout
    );

    it(
      'should allow signing in if the user is logging in',
      async () => {
        const oauthAccount = generateOauthAccount('google');
        const randomUser = generateRandomUser();
        const googleProfile = generateGoogleProfile({ email_verified: true, ...randomUser, picture: randomUser.image });

        // NextAuth will create the user entry before invoking the "nextAuthCallback"
        await prisma.user.create({ data: { ...randomUser } });

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

        expect(isSignInAllowed).toBe(NextAuthAllowSignIn);
      },
      timeout
    );

    it(
      'should create the audit log for log in',
      async () => {
        const user = generateRandomUser();
        const googleProfile = generateGoogleProfile({ email_verified: true, ...user, picture: user.image });

        // NextAuth will create the user entry before invoking the "nextAuthCallback"
        await prisma.user.create({ data: { ...user } });

        await nextAuthCallback({
          account: generateOauthAccount('google'),
          user,
          profile: googleProfile,
        });

        await nextAuthCallback({
          account: generateOauthAccount('google'),
          user,
          profile: googleProfile,
        });

        const auditLogs = await prisma.auditLog.findMany({
          where: {
            userId: user.id,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        expect(auditLogs.length).toBe(2);

        const signUpAuditLog = auditLogs[0];
        const logInAuditLog = auditLogs[1];

        expect(signUpAuditLog.action).toBe(AuditAction.SIGN_UP);
        expect(logInAuditLog.action).toBe(AuditAction.LOG_IN);
      },
      timeout
    );

    it(
      'should deny login if user account is blocked from signing in',
      async () => {
        const oauthAccount = generateOauthAccount('google');
        const randomUser = generateRandomUser();
        const googleProfile = generateGoogleProfile({ email_verified: true, ...randomUser });

        // NextAuth will create the user entry before invoking the "nextAuthCallback"
        await prisma.user.create({ data: { ...randomUser } });

        // signup for the first time
        await nextAuthCallback({
          account: oauthAccount,
          user: randomUser,
          profile: googleProfile,
        });

        // block the user from signing in
        await prisma.userInfo.update({
          where: {
            userId: randomUser.id,
          },
          data: {
            blockSignIn: true,
          },
        });

        // attempt logging in
        const isSignInAllowed = await nextAuthCallback({
          account: oauthAccount,
          user: randomUser,
          profile: googleProfile,
        });

        expect(isSignInAllowed).toBe(NextAuthDenySignIn);
      },
      timeout
    );
  });
});
