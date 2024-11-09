import { type Handler, S3Event } from "aws-lambda";
import { privateFilesMetadataTableSingletonFactory } from "../common/factories/dynamodb_factories";
import { s3BucketEventListener } from "../common/s3_bucket_event_listener";

export const handler: Handler<S3Event> = async (request) =>
  s3BucketEventListener({
    uploadedObjectsKeys: request.Records.map((record) => record.s3.object.key),
    filesMetadataDynamoTable: privateFilesMetadataTableSingletonFactory(),
  });
