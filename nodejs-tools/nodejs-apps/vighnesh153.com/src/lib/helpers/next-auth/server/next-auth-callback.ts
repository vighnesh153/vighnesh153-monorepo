import { Account, CallbacksOptions } from 'next-auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { log } from 'next-axiom';
import { ClientSession } from 'mongoose';

import { not, slugify } from '@vighnesh153/utils';
import { IUserInfo, SuccessOrFailureType } from '@vighnesh153/types';

import {
  abortTransactionAndEnd,
  commitTransactionAndEnd,
  createNewSessionWithTransaction,
} from '@/lib/mongoose/session';
import { createUserInfo, createUserPermissions } from '@/lib/mongoose/entity-creation';
import { isDuplicateMongooseDocument } from '@/lib/mongoose/utils';
import { updateUserInfo } from '@/lib/mongoose/entity-updation';
import { consoleLogger } from '@/lib/helpers/consoleLogger';
import { md5Hash } from '@/lib/helpers/hashing';
import { signInAuditLog } from '@/lib/helpers/audit-log';
import { getUserInfoByServerId } from '@/lib/mongoose/entity-retrieval';

export const AllowSignIn = true;
export const DenySignIn = false;

function isGoogleProvider(account: Account | null): boolean {
  return account?.provider === 'google';
}

function isGoogleProfileVerified(googleProfile: GoogleProfile): boolean {
  return googleProfile.email_verified;
}

function constructUserInfoFromGoogleProfile(googleProfile: GoogleProfile): Omit<IUserInfo, 'createdAt'> {
  const { name, email, picture: image } = googleProfile;
  const salt = Math.random().toString(16).split('.')[1];
  const clientId = md5Hash(googleProfile.email + salt);
  const userNameSalt = Math.random().toString(16).split('.')[1].slice(0, 5);
  const userName = slugify(`${name} ${userNameSalt}`, { convertToLowerCase: true });
  return {
    _id: email,
    clientId,
    userName,
    completelyBanned: false,
    name,
    image,
    email,
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
    await createUserPermissions(
      {
        // eslint-disable-next-line no-underscore-dangle
        _id: userInfo._id,
        softBan: false,
        permissions: [],
      },
      session
    );
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
async function signIn(userInfo: Pick<IUserInfo, '_id' | 'name' | 'image' | 'email'>): Promise<SuccessOrFailureType> {
  consoleLogger('Inside "signIn" function');
  const session = await createNewSessionWithTransaction();
  try {
    consoleLogger('Inside "signIn" function: Fetching existing userInfo ⏳');
    const existingUserInfo = await getUserInfoByServerId(userInfo._id, session);
    consoleLogger('Inside "signIn" function: Fetched existing userInfo ✅');
    if (existingUserInfo === null) {
      consoleLogger('Inside "signIn" function: Existing user info not found. Denying sign-in');
      await handleFailure(session, `Couldn't find existing user with id: "${userInfo._id}"`);
      return 'failure';
    }
    // User Account is completely banned from signing in to "vighnesh153.com"
    if (existingUserInfo.completelyBanned) {
      consoleLogger('Inside "signIn" function: User account is completely banned. Denying sign-in');
      log.info(`CompletelyBanned user with id: "${userInfo._id}" tried to log in`, { userInfo });
      return 'failure';
    }
    consoleLogger('Inside "signIn" function: Updating userInfo...');
    await updateUserInfo(userInfo, session);
    consoleLogger('Inside "signIn" function: Adding signInAuditLog...');
    await signInAuditLog(userInfo, session);
  } catch (error) {
    consoleLogger('Inside "signIn" function: Some error occurred. Denying sign-in', error);
    await handleSignInFailure(session, error);
    return 'failure';
  }
  consoleLogger('Inside "signIn" function: Sign-in successful');
  return commitTransactionAndEnd(session);
}

/**
 * Actual callback used by NextAuth which gets invoked after user registers for the first time, or
 * if the user is a returning user
 *
 * @param account
 * @param profile
 */
export const nextAuthCallback: CallbacksOptions['signIn'] = async ({ account, profile }) => {
  consoleLogger('Inside nextAuthCallback');
  if (not(isGoogleProvider(account))) {
    consoleLogger('Inside nextAuthCallback: Not a google provider. Denying signing in');
    return DenySignIn;
  }
  consoleLogger('Inside nextAuthCallback: Profile is Google profile');
  const googleProfile = profile as GoogleProfile;
  if (not(isGoogleProfileVerified(googleProfile))) {
    consoleLogger('Inside nextAuthCallback: Google Profile not verified. Denying signing in');
    return DenySignIn;
  }
  consoleLogger('Inside nextAuthCallback: Google profile is verified');

  const userInfo = constructUserInfoFromGoogleProfile(googleProfile);

  try {
    consoleLogger('Inside nextAuthCallback: Attempting to SignUp');
    const signUpSuccessful = (await signUp(userInfo)) === 'success';
    consoleLogger(`Inside nextAuthCallback: SignUp successful: ${signUpSuccessful}`);
    return signUpSuccessful ? AllowSignIn : DenySignIn;
  } catch (error) {
    consoleLogger(`Inside nextAuthCallback: Error occurred while signing in: ${error}`);
    if (not(isDuplicateMongooseDocument(error))) {
      consoleLogger(`Inside nextAuthCallback: Not duplicate document`);
      log.error('Failed to create new user', { error });
      return DenySignIn;
    }

    consoleLogger(`Inside nextAuthCallback: Attempting to SignIn`);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, name, email, image } = userInfo;
    // We need to pass only these 4 fields so that we don't override other fields like
    // username, completelyBanned, etc.
    const signInSuccessful =
      (await signIn({
        _id,
        name,
        email,
        image,
      })) === 'success';
    consoleLogger(`Inside nextAuthCallback: SignIn successful: ${signInSuccessful}`);
    return signInSuccessful ? AllowSignIn : DenySignIn;
  }
};
