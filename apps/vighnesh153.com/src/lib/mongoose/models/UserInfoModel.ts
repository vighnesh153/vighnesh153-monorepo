import { mainDbConnection } from '@lib/mongoose/connection';
import { UserInfoSchema } from '@lib/mongoose/schemas';

export const UserInfoModel = mainDbConnection.model('user_info', UserInfoSchema);
