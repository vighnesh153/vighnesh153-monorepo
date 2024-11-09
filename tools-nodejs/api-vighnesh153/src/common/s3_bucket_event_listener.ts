import { DynamoDBTable } from "@vighnesh153/tools-server/aws_dynamodb";
import { filesMetadataFields } from "./dynamo_db_table_metadata";

export async function s3BucketEventListener({
  uploadedObjectsKeys,
  filesMetadataDynamoTable,
}: {
  uploadedObjectsKeys: string[];
  filesMetadataDynamoTable?: DynamoDBTable<
    { fields: typeof filesMetadataFields; tableName: string }
  >;
}) {
  // TODO: implement
}
