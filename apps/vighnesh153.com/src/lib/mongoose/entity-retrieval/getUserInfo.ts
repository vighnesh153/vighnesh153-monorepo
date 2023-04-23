import { ClientSession, Document as MongooseDocument } from 'mongoose';
import { IUserInfo } from '@vighnesh153/types';
import { UserInfoModel } from '@lib/mongoose/models';

type FetchUserInfoReturnType = MongooseDocument<unknown, unknown, IUserInfo> & IUserInfo;

/**
 * Fetches the user info entity by server id
 *
 * @param id
 * @param session
 */
export async function getUserInfoByServerId(
  id: IUserInfo['_id'],
  session?: ClientSession
): Promise<FetchUserInfoReturnType | null> {
  return UserInfoModel.findById(id, '', { session });
}

/**
 * Fetches the user info entity by client id
 *
 * @param clientId
 * @param session
 */
export async function getUserInfoByClientId(
  clientId: IUserInfo['clientId'],
  session?: ClientSession
): Promise<FetchUserInfoReturnType | null> {
  return UserInfoModel.findOne({ clientId }, '', { session });
}
