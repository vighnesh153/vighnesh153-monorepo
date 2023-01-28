import { ClientSession } from 'mongoose';
import { createAuditLog } from '@lib/mongoose/entity-creation/createAuditLog';
import { IUserInfo, SuccessOrFailureType } from '@vighnesh153/types';

export async function signUpAuditLog(
  userInfo: Omit<IUserInfo, 'createdAt'>,
  session?: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: userInfo,
      action: 'user/sign-up',
      message: `User "${userInfo.name}" has created their account`,
    },
    session
  );
}

export async function signInAuditLog(
  userInfo: Omit<IUserInfo, 'createdAt'>,
  session: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: userInfo,
      action: 'user/log-in',
      message: `User "${userInfo.name}" has logged in to the system`,
    },
    session
  );
}

export async function updatedUserInfoAuditLog(
  userInfo: Omit<IUserInfo, 'createdAt'>,
  session: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: userInfo,
      action: 'user/update-info',
      fields: { updates: userInfo },
      message: `User "${userInfo.name}"'s info has been updated`,
    },
    session
  );
}
