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
import { consoleLogger } from '@lib/helpers/consoleLogger';

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
  consoleLogger('Inside nextAuthSignInCallback');
  if (not(isGoogleProvider(account))) {
    consoleLogger('Inside nextAuthSignInCallback: Not a google provider. Denying signing in');
    return DenySignIn;
  }
  consoleLogger('Inside nextAuthSignInCallback: Profile is Google profile');
  const googleProfile = profile as GoogleProfile;
  if (not(isGoogleProfileVerified(googleProfile))) {
    consoleLogger('Inside nextAuthSignInCallback: Google Profile not verified. Denying signing in');
    return DenySignIn;
  }
  consoleLogger('Inside nextAuthSignInCallback: Google profile is verified');

  const userInfo = constructUserInfoFromGoogleProfile(googleProfile);

  try {
    consoleLogger('Inside nextAuthSignInCallback: Attempting to SignUp');
    const signUpSuccessful = (await signUp(userInfo)) === 'success';
    consoleLogger(`Inside nextAuthSignInCallback: SignUp successful: ${signUpSuccessful}`);
    return signUpSuccessful ? AllowSignIn : DenySignIn;
  } catch (error) {
    consoleLogger(`Inside nextAuthSignInCallback: Error occurred while signing in: ${error}`);
    if (not(isDuplicateMongooseDocument(error))) {
      consoleLogger(`Inside nextAuthSignInCallback: Not duplicate document`);
      log.error('Failed to create new user', { error });
      return DenySignIn;
    }

    consoleLogger(`Inside nextAuthSignInCallback: Attempting to SignIn`);
    const signInSuccessful = (await signIn(userInfo)) === 'success';
    consoleLogger(`Inside nextAuthSignInCallback: SignIn successful: ${signInSuccessful}`);
    return signInSuccessful ? AllowSignIn : DenySignIn;
  }
};
