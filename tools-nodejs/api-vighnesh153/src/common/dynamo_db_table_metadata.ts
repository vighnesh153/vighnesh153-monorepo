import type {
  DynamoTypeMap,
  TableMetadata,
} from "@vighnesh153/tools-server/aws_dynamodb";

export const userInfoFields = /* @__PURE__ */ {
  userId: "string",
  name: "string",
  email: "string",
  profilePictureUrl: "string",
  createdAtMillis: "number",
} satisfies Record<string, keyof DynamoTypeMap>;

export const UserInfoTableMetadata = /* @__PURE__ */ {
  fields: userInfoFields,
} satisfies Partial<TableMetadata>;