import { ClientSession, Document as MongooseDocument } from 'mongoose';
import { IUserPermissions } from '@vighnesh153/types';
import { UserPermissionsModel } from '@lib/mongoose/models';
import { updateUserPermissionsAuditLog } from '@lib/helpers/audit-log';

type UpdateUserPermissionsReturnType = (MongooseDocument<unknown, unknown, IUserPermissions> & IUserPermissions) | null;

/**
 * Updates the user permissions of an existing user
 *
 * @param userPermissions
 * @param session
 */
export async function updateUserPermissions(
  userPermissions: Omit<IUserPermissions, 'createdAt'>,
  session: ClientSession
): Promise<UpdateUserPermissionsReturnType> {
  // eslint-disable-next-line no-underscore-dangle
  const filter = { _id: userPermissions._id };
  const updatedUserPermissions = await UserPermissionsModel.findOneAndUpdate(filter, userPermissions, { session });
  await updateUserPermissionsAuditLog(userPermissions, session);
  return updatedUserPermissions;
}
