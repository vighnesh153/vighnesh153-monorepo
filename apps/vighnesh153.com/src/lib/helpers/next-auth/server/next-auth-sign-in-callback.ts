import { Account, CallbacksOptions } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { log } from 'next-axiom';
import { ClientSession } from 'mongoose';

import { not } from '@vighnesh153/utils';
import { IUserInfo, SuccessOrFailureType } from '@vighnesh153/types';

import {
  abortTransactionAndEnd,
  commitTransactionAndEnd,
  createNewSessionWithTransaction,
} from '@lib/mongoose/session';
import { createUserInfo } from '@lib/mongoose/entity-creation';
import { isDuplicateMongooseDocument } from '@lib/mongoose/utils';
import { updateUserInfo } from '@lib/mongoose/entity-updation';

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
    _id: googleProfile.email,
    name: googleProfile.name,
    image: googleProfile.picture,
    email: googleProfile.email,
  };
}

async function handleFailure(session: ClientSession, message: string, error?: unknown) {
  const abortedTransaction = await abortTransactionAndEnd(session);
  log.error(message, { error, abortedTransaction });
}

async function handleSignUpFailure(session: ClientSession, error?: unknown) {
  return handleFailure(session, 'Failed to create new user', error);
}

async function handleSignInFailure(session: ClientSession, error?: unknown) {
  return handleFailure(session, 'Failed to sign in existing user', error);
}

/**
 * Creates a new entry in UserInfo if the user doesn't exist
 *
 * @param userInfo
 */
async function signUp(userInfo: Omit<IUserInfo, 'createdAt'>): Promise<SuccessOrFailureType> {
  const session = await createNewSessionWithTransaction();

  try {
    await createUserInfo(userInfo, session);
  } catch (error) {
    await handleSignUpFailure(session, error);
    throw error;
  }
  return commitTransactionAndEnd(session);
}

/**
 * When the user logs in, this adds an audit log to the database
 *
 * @param userInfo
 */
async function signIn(userInfo: Omit<IUserInfo, 'createdAt'>): Promise<SuccessOrFailureType> {
  const session = await createNewSessionWithTransaction();
  try {
    await updateUserInfo(userInfo, session);
  } catch (error) {
    await handleSignInFailure(session, error);
    throw error;
  }
  return commitTransactionAndEnd(session);
}

/**
 * Actual callback used by NextAuth which gets invoked after user registers for the first time, or
 * if the user is a returning user
 *
 * @param account
 * @param profile
 */
export const nextAuthSignInCallback: CallbacksOptions['signIn'] = async ({ account, profile }) => {
  if (not(isGoogleProvider(account))) {
    return DenySignIn;
  }
  const googleProfile = profile as GoogleProfile;
  if (not(isGoogleProfileVerified(googleProfile))) {
    return DenySignIn;
  }

  const userInfo = constructUserInfoFromGoogleProfile(googleProfile);

  try {
    const signUpSuccessful = (await signUp(userInfo)) === 'success';
    return signUpSuccessful ? AllowSignIn : DenySignIn;
  } catch (error) {
    if (not(isDuplicateMongooseDocument(error))) {
      log.error('Failed to create new user', { error });
      return DenySignIn;
    }

    const signInSuccessful = (await signIn(userInfo)) === 'success';
    return signInSuccessful ? AllowSignIn : DenySignIn;
  }
};
