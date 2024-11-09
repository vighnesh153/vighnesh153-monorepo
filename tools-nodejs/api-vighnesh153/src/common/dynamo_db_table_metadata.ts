import type { DynamoTypeMap } from "@vighnesh153/tools-server/aws_dynamodb";

export const userInfoFields = /* @__PURE__ */ {
  userId: "string",
  name: "string",
  email: "string",
  profilePictureUrl: "string",
  createdAtMillis: "number",
} satisfies Record<string, keyof DynamoTypeMap>;

export const filesMetadataFields = /* @__PURE__ */ {
  fileId: "string",
  filePath: "string",
  mimeType: "string",
  fileSizeInBytes: "number",
  createdAtMillis: "number",
  createdBy: "string",
  // whether the file is uploaded at this filePath
  isUploaded: "boolean",
} satisfies Record<string, keyof DynamoTypeMap>;
