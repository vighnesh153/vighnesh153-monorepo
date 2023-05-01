import { ClientSession } from 'mongoose';
import { IUserInfo, IUserPermissions, SuccessOrFailureType } from '@vighnesh153/types';
import { createAuditLog } from '@/lib/mongoose/entity-creation/createAuditLog';
import { myPersonalizedEmail } from '@/modules/common';

export async function signUpAuditLog(
  userInfo: Omit<IUserInfo, 'createdAt'>,
  session?: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: { email: userInfo.email },
      action: 'user/sign-up',
      message: `User "${userInfo.name}" has created their account`,
    },
    session
  );
}

export async function signInAuditLog(
  userInfo: Pick<IUserInfo, 'name' | 'email'>,
  session: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: { email: userInfo.email },
      action: 'user/log-in',
      message: `User "${userInfo.name}" has logged in to the system`,
    },
    session
  );
}

export async function updatedUserInfoAuditLog(
  userInfo: Partial<Omit<IUserInfo, 'createdAt'>> & Pick<IUserInfo, '_id'>,
  session: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      // eslint-disable-next-line no-underscore-dangle
      actor: { email: userInfo._id },
      action: 'user/update-info',
      fields: { updates: userInfo },
      message: `User "${userInfo.name}"'s info has been updated`,
    },
    session
  );
}

export async function userPermissionsCreationAuditLog(
  userPermissions: Omit<IUserPermissions, 'createdAt'>,
  session?: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: { email: myPersonalizedEmail },
      action: 'user-permissions/create',
      // eslint-disable-next-line no-underscore-dangle
      message: `Permissions created for "${userPermissions._id}" id`,
    },
    session
  );
}

export async function updateUserPermissionsAuditLog(
  userPermissions: Partial<Omit<IUserPermissions, 'createdAt'>> & Pick<IUserPermissions, '_id'>,
  session: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: { email: myPersonalizedEmail },
      action: 'user-permissions/update',
      fields: { updates: userPermissions },
      // eslint-disable-next-line no-underscore-dangle
      message: `Permissions updated for "${userPermissions._id}" id`,
    },
    session
  );
}
