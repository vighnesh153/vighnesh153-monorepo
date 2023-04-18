import { ClientSession } from 'mongoose';
import { createAuditLog } from '@lib/mongoose/entity-creation/createAuditLog';
import { IUserInfo, IUserPermissions, SuccessOrFailureType } from '@vighnesh153/types';

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

export async function userPermissionsCreationAuditLog(
  userPermissions: Omit<IUserPermissions, 'createdAt'>,
  session?: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: {
        email: 'me@vighnesh153.com',
        name: 'Admin',
      },
      action: 'user-permissions/create',
      // eslint-disable-next-line no-underscore-dangle
      message: `Permissions created for "${userPermissions._id}" id`,
    },
    session
  );
}

export async function updateUserPermissionsAuditLog(
  userPermissions: Omit<IUserPermissions, 'createdAt'>,
  session: ClientSession
): Promise<SuccessOrFailureType> {
  return createAuditLog(
    {
      actor: {
        email: 'me@vighnesh153.com',
        name: 'Admin',
      },
      action: 'user-permissions/update',
      fields: { updates: userPermissions },
      // eslint-disable-next-line no-underscore-dangle
      message: `Permissions updated for "${userPermissions._id}" id`,
    },
    session
  );
}
