import { DynamoTypeMap, TableMetadata } from '@vighnesh153/aws-dynamo-db';

export const userInfoFields = {
  userId: 'string',
  name: 'string',
  email: 'string',
  profilePictureUrl: 'string',
  createdAtMillis: 'number',
} satisfies Record<string, keyof DynamoTypeMap>;

export const UserInfoTableMetadata = {
  tableName: process.env.SST_Table_tableName_UserInfo!,
  fields: userInfoFields,
} satisfies TableMetadata;
