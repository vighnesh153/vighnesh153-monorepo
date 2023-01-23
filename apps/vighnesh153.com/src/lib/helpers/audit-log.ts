import { ClientSession } from 'mongoose';
import { createAuditLog } from '@lib/mongoose/entity-creation';
import { IUserInfo } from '@vighnesh153/types';

export async function signUpAuditLog(userInfo: Omit<IUserInfo, 'createdAt'>, session: ClientSession) {
  await createAuditLog(
    {
      actor: userInfo,
      action: 'user/sign-up',
      message: `User "${userInfo.name}" has created their account`,
    },
    session
  );
}

export async function signInAuditLog(userInfo: Omit<IUserInfo, 'createdAt'>, session: ClientSession) {
  await createAuditLog(
    {
      actor: userInfo,
      action: 'user/log-in',
      message: `User "${userInfo.name}" has logged in to the system`,
    },
    session
  );
}
