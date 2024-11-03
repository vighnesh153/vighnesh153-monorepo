import { createSingletonFactory } from "@vighnesh153/tools";
import {
  createS3Client,
  S3PresignedUrlGenerator,
  S3PresignedUrlGeneratorImpl,
} from "@vighnesh153/tools-server/aws_s3";

export const s3ClientSingletonFactory = /* @__PURE__ */ createSingletonFactory(
  () => createS3Client(),
);

export const s3PresignedUrlGeneratorSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<S3PresignedUrlGenerator>(() => {
    return new S3PresignedUrlGeneratorImpl(s3ClientSingletonFactory());
  });
