import { mainDbConnection } from '@lib/mongoose/connection';
import { UserInfoSchema } from '@lib/mongoose/schemas';
import { ModelNames } from '@lib/mongoose/model-names';

export const UserInfoModel = mainDbConnection.model(ModelNames.UserInfo, UserInfoSchema);
