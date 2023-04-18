import { ClientSession, Document as MongooseDocument } from 'mongoose';
import { IUserPermissions } from '@vighnesh153/types';
import { UserPermissionsModel } from '@lib/mongoose/models';
import { userPermissionsCreationAuditLog } from '@lib/helpers/audit-log';

type CreateUserPermissionsReturnType = MongooseDocument<unknown, unknown, IUserPermissions> & IUserPermissions;

/**
 * Creates a new user permissions entity
 *
 * @param userPermissions
 * @param session
 */
export async function createUserPermissions(
  userPermissions: Omit<IUserPermissions, 'createdAt'>,
  session?: ClientSession
): Promise<CreateUserPermissionsReturnType> {
  const newUser = await UserPermissionsModel.create([{ ...userPermissions }], { session });
  await userPermissionsCreationAuditLog(userPermissions, session);
  return newUser[0];
}
