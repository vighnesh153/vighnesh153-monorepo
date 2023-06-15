import { CallbacksOptions } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';

import { not } from '@vighnesh153/utils';

import { prisma } from '@/lib/prisma';
import { createRequestLogger } from '@/lib/requestLogger';
import { NextAuthAllowSignIn, NextAuthDenySignIn, NextAuthSuccessFailure } from './nextAuthContants';
import { nextAuthSignUpUser } from './nextAuthSignUp';
import { nextAuthLoginUser } from './nextAuthLogin';
import {
  nextAuthCheckIsUserRegistered,
  nextAuthIsGoogleProfileVerified,
  nextAuthIsGoogleProvider,
} from './nextAuthUtils';

export const nextAuthCallback: CallbacksOptions['signIn'] = async ({ account, profile }) => {
  const logger = createRequestLogger();

  logger.debug('Inside "nextAuthCallback"');

  if (not(nextAuthIsGoogleProvider(account))) {
    logger.debug('Inside nextAuthCallback: Not a google provider. Denying signing in');
    return NextAuthDenySignIn;
  }

  logger.debug('Inside nextAuthCallback: Profile is Google profile');

  const googleProfile = profile as GoogleProfile;

  if (not(nextAuthIsGoogleProfileVerified(googleProfile))) {
    logger.debug('Inside nextAuthCallback: Google Profile not verified. Denying signing in');
    return NextAuthDenySignIn;
  }

  logger.debug('Inside nextAuthCallback: Google profile is verified');

  const result = await prisma.$transaction(async (tx): Promise<NextAuthSuccessFailure> => {
    logger.debug('Inside nextAuthCallback: Finding the user entity created by NextAuth ⏳');
    const user = await tx.user.findUnique({ where: { email: googleProfile.email } });
    logger.debug('Inside nextAuthCallback: User entity fetch complete ✅');

    if (user === null) {
      logger.error(
        'Inside nextAuthCallback: This should not be null ' +
          'because NextAuth invokes the signIn callback after the User is created'
      );
      return 'failure';
    }

    logger.debug('Inside nextAuthCallback: Checking if user is already registered ⏳');
    const isUserRegistered = await nextAuthCheckIsUserRegistered(tx, user);
    logger.info(`Inside nextAuthCallback: isUserRegistered=${isUserRegistered}`, { email: googleProfile.email });
    return isUserRegistered ? nextAuthLoginUser({ tx, user, logger }) : nextAuthSignUpUser({ tx, user, logger });
  });

  logger.debug(`Inside nextAuthCallback: NextAuthCallback complete, result=${result}`);
  return result === 'success' ? NextAuthAllowSignIn : NextAuthDenySignIn;
};
