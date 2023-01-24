import { Account, CallbacksOptions } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { log } from 'next-axiom';
import { ClientSession } from 'mongoose';

import { not } from '@vighnesh153/utils';
import { IUserInfo } from '@vighnesh153/types';

import {
  abortTransactionAndEnd,
  commitTransactionAndEnd,
  createNewSessionWithTransaction,
} from '@lib/mongoose/session';
import { createUserInfo } from '@lib/mongoose/entity-creation';
import { isDuplicateMongooseDocument } from '@lib/mongoose/utils';
import { signInAuditLog } from '@lib/helpers/audit-log';

export const AllowSignIn = true;
export const DenySignIn = false;

function isGoogleProvider(account: Account | null): boolean {
  return account?.provider === 'google';
}

function isGoogleProfileVerified(googleProfile: GoogleProfile): boolean {
  return googleProfile.email_verified;
}

function constructUserInfoFromGoogleProfile(googleProfile: GoogleProfile): Omit<IUserInfo, 'createdAt'> {
  return {
    name: googleProfile.name,
    image: googleProfile.picture,
    email: googleProfile.email,
  };
}

async function handleSignInSignUpError(error: unknown, session: ClientSession) {
  const abortedTransaction = await abortTransactionAndEnd(session);
  log.error('Failed to create new user', { error, abortedTransaction });
  return DenySignIn;
}

export const signInCallback: CallbacksOptions['signIn'] = async ({ account, profile }) => {
  if (not(isGoogleProvider(account))) {
    return DenySignIn;
  }
  const googleProfile = profile as GoogleProfile;
  if (not(isGoogleProfileVerified(googleProfile))) {
    return DenySignIn;
  }
  const session = await createNewSessionWithTransaction();
  const userInfo = constructUserInfoFromGoogleProfile(googleProfile);
  try {
    // we don't need a transaction here because if this fails, we don't want to
    // abort the transaction but instead, we need to sign in the user if they have
    // already
    await createUserInfo(userInfo);
  } catch (error) {
    if (not(isDuplicateMongooseDocument(error))) {
      return handleSignInSignUpError(error, session);
    }

    // Email is duplicate
    await signInAuditLog(userInfo, session);
  }
  const isTransactionCommitSuccessful = (await commitTransactionAndEnd(session)) === 'success';
  return isTransactionCommitSuccessful ? AllowSignIn : DenySignIn;
};
