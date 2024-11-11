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
    const fileId = key.split("/").at(-1)?.split(".")?.[0] ?? "";

    if (isStringEmpty(fileId)) {
      return Promise.reject(
        new Error(`Failed to extract fileId from "${key}"`),
      );
    }

    return filesMetadataDynamoTable.updateOne({
      key: { fileId },
      data: { isUploaded: true },
    });
  }));

  console.log("Response:", response);
}
