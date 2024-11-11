import { isStringEmpty, Logger } from "@vighnesh153/tools";
import { DynamoDBTable } from "@vighnesh153/tools-server/aws_dynamodb";
import { filesMetadataFields } from "./dynamo_db_table_metadata";
import { loggerSingletonFactory } from "./factories/logger_factories";

export async function s3BucketEventListener({
  uploadedObjectsKeys,
  filesMetadataDynamoTable,

  // tools
  logger = loggerSingletonFactory(),
}: {
  uploadedObjectsKeys: string[];
  filesMetadataDynamoTable: DynamoDBTable<
    { fields: typeof filesMetadataFields; tableName: string }
  >;

  // tools
  logger?: Logger;
}) {
  logger.log(`Received file upload complete event for:`, uploadedObjectsKeys);

  const response = await Promise.allSettled(uploadedObjectsKeys.map((key) => {
    const segments = key.split("/");

    const fileId = segments.pop()?.split(".")?.[0] ?? "";
    const mimeType = segments.join("/");

    logger.log("Extracted file id:", fileId, "and mimeType:", mimeType);

    if (isStringEmpty(fileId)) {
      logger.log("Failed to extract file id from file: ", key);
      return Promise.reject(
        new Error(`Failed to extract fileId from "${key}"`),
      );
    }

    return filesMetadataDynamoTable.updateOne({
      key: { fileId, mimeType },
      data: { isUploaded: true },
    });
  }));

  console.log("Response:", JSON.stringify(response, null, 2));
}
