import { S3Client, type S3ClientConfig } from "@aws-sdk/client-s3";

export function createS3Client(config: S3ClientConfig = {}): S3Client {
  return new S3Client({ ...config });
}
