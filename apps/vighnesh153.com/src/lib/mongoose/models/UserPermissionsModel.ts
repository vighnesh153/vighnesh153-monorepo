import { mainDbConnection } from '@/lib/mongoose/connection';
import { UserPermissionsSchema } from '@/lib/mongoose/schemas';
import { ModelNames } from '@/lib/mongoose/model-names';

export const UserPermissionsModel = mainDbConnection.model(ModelNames.UserPermissions, UserPermissionsSchema);
