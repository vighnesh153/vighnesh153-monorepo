import { DynamoTypeMap, TableMetadata } from "@vighnesh153/aws-dynamo-db";

export const userInfoFields = {
  userId: "string",
  name: "string",
  email: "string",
  profilePictureUrl: "string",
  createdAtMillis: "number",
} satisfies Record<string, keyof DynamoTypeMap>;

export const UserInfoTableMetadata = {
  fields: userInfoFields,
} satisfies Partial<TableMetadata>;
