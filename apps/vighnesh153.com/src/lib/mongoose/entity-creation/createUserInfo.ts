import { Document as MongooseDocument, Types } from 'mongoose';
import { IUserInfo } from '@vighnesh153/types';
import { UserInfoModel } from '@lib/mongoose/models';

type CreateUserInfoReturnType = MongooseDocument<unknown, unknown, IUserInfo> & IUserInfo & { _id: Types.ObjectId };

/**
 * Creates a new user info entity and invokes the `save` method on it
 *
 * @param userInfo
 */
export async function createUserInfo(userInfo: Omit<IUserInfo, 'createdAt'>): Promise<CreateUserInfoReturnType> {
  const userInfoDoc = new UserInfoModel({ ...userInfo });
  await userInfoDoc.save();
  return userInfoDoc;
}
