import { ClientSession, Document as MongooseDocument, Types } from 'mongoose';
import { IUserInfo } from '@vighnesh153/types';
import { UserInfoModel } from '@lib/mongoose/models';
import { signInAuditLog, updatedUserInfoAuditLog } from '@lib/helpers/audit-log';

type UpdateUserInfoReturnType =
  | (MongooseDocument<unknown, unknown, IUserInfo> & IUserInfo & { _id: Types.ObjectId })
  | null;

/**
 * Updates the user info of an existing user
 *
 * @param userInfo
 * @param session
 */
export async function updateUserInfo(
  userInfo: Omit<IUserInfo, 'createdAt'>,
  session: ClientSession
): Promise<UpdateUserInfoReturnType> {
  const filter = { email: userInfo.email };
  const updatedUser = await UserInfoModel.findOneAndUpdate(filter, userInfo, { session });
  await signInAuditLog(userInfo, session);
  await updatedUserInfoAuditLog(userInfo, session);
  return updatedUser;
}
