import {
  GetObjectCommand,
  PutObjectCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type S3PresignedUrlResponse =
  | { type: "success"; presignedUrl: string }
  | { type: "error"; error: Error };

export type S3PresignedUrlGeneratorUploadUrlProps = {
  bucketName: string;
  filePath: string;
  contentType: string;
  expiryMillis: number;
};

export type S3PresignedUrlGeneratorDownloadUrlProps = {
  bucketName: string;
  filePath: string;
  expiryMillis: number;
};

export interface S3PresignedUrlGenerator {
  generateUploadUrl(
    props: S3PresignedUrlGeneratorUploadUrlProps,
  ): Promise<S3PresignedUrlResponse>;
  generateDownloadUrl(
    props: S3PresignedUrlGeneratorDownloadUrlProps,
  ): Promise<S3PresignedUrlResponse>;
}

export class S3PresignedUrlGeneratorImpl implements S3PresignedUrlGenerator {
  constructor(private client: S3Client) {}

  generateUploadUrl(
    props: S3PresignedUrlGeneratorUploadUrlProps,
  ): Promise<S3PresignedUrlResponse> {
    const command = new PutObjectCommand({
      Bucket: props.bucketName,
      Key: props.filePath,
      ContentType: props.contentType,
    });

    return this.generateUrl(command, { expiryMillis: props.expiryMillis });
  }

  generateDownloadUrl(
    props: S3PresignedUrlGeneratorDownloadUrlProps,
  ): Promise<S3PresignedUrlResponse> {
    const command = new GetObjectCommand({
      Bucket: props.bucketName,
      Key: props.filePath,
    });

    return this.generateUrl(command, { expiryMillis: props.expiryMillis });
  }

  private async generateUrl(
    command: GetObjectCommand | PutObjectCommand,
    options: { expiryMillis: number },
  ): Promise<S3PresignedUrlResponse> {
    try {
      const presignedUrl = await getSignedUrl(this.client, command, {
        expiresIn: options.expiryMillis,
      });
      return { type: "success", presignedUrl };
    } catch (e: unknown) {
      if (e instanceof Error) {
        return { type: "error", error: e };
      }
      return {
        type: "error",
        error: new Error("Unknown error occurred", { cause: e }),
      };
    }
  }
}
