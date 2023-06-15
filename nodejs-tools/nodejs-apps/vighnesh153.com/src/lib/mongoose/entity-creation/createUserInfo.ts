import { ClientSession, Document as MongooseDocument } from 'mongoose';
import { IUserInfo } from '@vighnesh153/types';
import { UserInfoModel } from '@/lib/mongoose/models';
import { signUpAuditLog } from '@/lib/helpers/audit-log';

type CreateUserInfoReturnType = MongooseDocument<unknown, unknown, IUserInfo> & IUserInfo;

/**
 * Creates a new user info entity
 *
 * @param userInfo
 * @param session
 */
export async function createUserInfo(
  userInfo: Omit<IUserInfo, 'createdAt'>,
  session?: ClientSession
): Promise<CreateUserInfoReturnType> {
  const newUser = await UserInfoModel.create([{ ...userInfo }], { session });
  await signUpAuditLog(userInfo, session);
  return newUser[0];
}
