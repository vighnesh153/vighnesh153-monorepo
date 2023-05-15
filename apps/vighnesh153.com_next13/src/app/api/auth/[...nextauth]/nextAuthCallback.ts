import { CallbacksOptions } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';
import { log } from 'next-axiom';

import { not } from '@vighnesh153/utils';

import { prisma } from '@/lib/prisma';
import { NextAuthAllowSignIn, NextAuthDenySignIn, NextAuthSuccessFailure } from './nextAuthContants';
import { nextAuthSignUpUser } from './nextAuthSignUp';
import { nextAuthLoginUser } from './nextAuthLogin';
import {
  nextAuthCheckIsUserRegistered,
  nextAuthIsGoogleProfileVerified,
  nextAuthIsGoogleProvider,
} from './nextAuthUtils';

export const nextAuthCallback: CallbacksOptions['signIn'] = async ({ account, profile }) => {
  log.debug('Inside "nextAuthCallback"');

  if (not(nextAuthIsGoogleProvider(account))) {
    log.debug('Inside nextAuthCallback: Not a google provider. Denying signing in');
    return NextAuthDenySignIn;
  }

  log.debug('Inside nextAuthCallback: Profile is Google profile');

  const googleProfile = profile as GoogleProfile;

  if (not(nextAuthIsGoogleProfileVerified(googleProfile))) {
    log.debug('Inside nextAuthCallback: Google Profile not verified. Denying signing in');
    return NextAuthDenySignIn;
  }

  log.debug('Inside nextAuthCallback: Google profile is verified');

  const result = await prisma.$transaction(async (tx): Promise<NextAuthSuccessFailure> => {
    const user = await tx.user.findUnique({ where: { email: googleProfile.email } });

    if (user === null) {
      log.error('This should not be null because NextAuth invokes the signIn callback after the User is created');
      return 'failure';
    }

    const isUserRegistered = await nextAuthCheckIsUserRegistered(tx, user);
    return isUserRegistered ? nextAuthLoginUser(tx, user) : nextAuthSignUpUser(tx, user);
  });

  return result === 'success' ? NextAuthAllowSignIn : NextAuthDenySignIn;
};
