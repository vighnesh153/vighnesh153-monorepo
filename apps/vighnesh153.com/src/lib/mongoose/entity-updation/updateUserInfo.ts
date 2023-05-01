import { ClientSession, Document as MongooseDocument } from 'mongoose';
import { IUserInfo } from '@vighnesh153/types';
import { UserInfoModel } from '@/lib/mongoose/models';
import { updatedUserInfoAuditLog } from '@/lib/helpers/audit-log';

type UpdateUserInfoReturnType = (MongooseDocument<unknown, unknown, IUserInfo> & IUserInfo) | null;

/**
 * Updates the user info of an existing user
 *
 * @param userInfo
 * @param session
 */
export async function updateUserInfo(
  userInfo: Partial<Omit<IUserInfo, 'createdAt'>> & Pick<IUserInfo, '_id'>,
  session: ClientSession
): Promise<UpdateUserInfoReturnType> {
  // eslint-disable-next-line no-underscore-dangle
  const filter = { _id: userInfo._id };
  const updatedUser = await UserInfoModel.findOneAndUpdate(filter, userInfo, { session });
  await updatedUserInfoAuditLog(userInfo, session);
  return updatedUser;
}
