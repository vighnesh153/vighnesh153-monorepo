import * as http2 from "node:http2";
import * as crypto from "node:crypto";

import { Resource } from "sst";

import { mapNotNullish } from "@std/collections";
import { parseMediaType } from "@std/media-types";

import {
  type CompleteUserInfo,
  HttpHeaderKeys,
  HttpHeaderValues,
  isStringEmpty,
  Logger,
  not,
} from "@vighnesh153/tools";
import {
  type CreateUploadPresignedUrlRequest,
  CreateUploadPresignedUrlResponse,
  hasPermission,
  isValidCreateUploadPresignedUrlRequest,
  type LambdaMethodType,
  type LambdaResponsePayload,
} from "@vighnesh153/tools/vighnesh153";
import { DynamoDBTable } from "@vighnesh153/tools-server/aws_dynamodb";
import {
  loggerSingletonFactory,
  privateFilesMetadataTableMetadata,
  privateFilesMetadataTableSingletonFactory,
  publicFilesMetadataTableMetadata,
  publicFilesMetadataTableSingletonFactory,
} from "../common/factories/mod.ts";
import type { S3PresignedUrlGenerator } from "@vighnesh153/tools-server/aws_s3";
import { s3PresignedUrlGeneratorSingletonFactory } from "../common/factories/s3_factories.ts";

export async function controller({
  // info from request
  user = null,
  method = "post",
  body = null,

  // aws resources
  // @ts-ignore: SSM Secret type auto-complete not working
  publicFilesBucketName = Resource.PublicFilesBucket.name,
  // @ts-ignore: SSM Secret type auto-complete not working
  privateFilesBucketName = Resource.PrivateFilesBucket.name,

  // tools
  logger = loggerSingletonFactory(),
  s3PresignedUrlGenerator = s3PresignedUrlGeneratorSingletonFactory(),
  privateFilesMetadataDynamoTable = privateFilesMetadataTableSingletonFactory(),
  publicFilesMetadataDynamoTable = publicFilesMetadataTableSingletonFactory(),
}: {
  // info from request
  user?: CompleteUserInfo | null;
  method?: LambdaMethodType;
  body?: CreateUploadPresignedUrlRequest | null;

  // aws resources
  publicFilesBucketName?: string;
  privateFilesBucketName?: string;

  // tools
  logger?: Logger;
  s3PresignedUrlGenerator?: S3PresignedUrlGenerator;
  privateFilesMetadataDynamoTable?: DynamoDBTable<
    typeof privateFilesMetadataTableMetadata
  >;
  publicFilesMetadataDynamoTable?: DynamoDBTable<
    typeof publicFilesMetadataTableMetadata
  >;
} = {}): Promise<LambdaResponsePayload> {
  if (
    isStringEmpty(publicFilesBucketName) ||
    isStringEmpty(privateFilesBucketName)
  ) {
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      cookies: [],
      body: JSON.stringify({
        message: "Internal configuration error.",
      }),
      headers: {
        [HttpHeaderKeys.contentType]:
          HttpHeaderValues.contentType.applicationJson,
      },
    };
  }

  if (user === null) {
    return {
      statusCode: http2.constants.HTTP_STATUS_UNAUTHORIZED,
      cookies: [],
      body: JSON.stringify({
        message: `Login required.`,
      }),
      headers: {
        [HttpHeaderKeys.contentType]:
          HttpHeaderValues.contentType.applicationJson,
      },
    };
  }

  if (not(hasPermission(user.userId, "upload_files"))) {
    return {
      statusCode: http2.constants.HTTP_STATUS_FORBIDDEN,
      cookies: [],
      body: JSON.stringify({
        message: `"${user.userId}" is not authorized to upload files.`,
      }),
      headers: {
        [HttpHeaderKeys.contentType]:
          HttpHeaderValues.contentType.applicationJson,
      },
    };
  }

  if (method !== "post") {
    return {
      statusCode: http2.constants.HTTP_STATUS_BAD_REQUEST,
      cookies: [],
      body: JSON.stringify({
        message: `Expected method post, found '${method}'`,
      }),
      headers: {
        [HttpHeaderKeys.contentType]:
          HttpHeaderValues.contentType.applicationJson,
      },
    };
  }

  if (body == null || not(isValidCreateUploadPresignedUrlRequest(body))) {
    return {
      statusCode: http2.constants.HTTP_STATUS_BAD_REQUEST,
      cookies: [],
      body: JSON.stringify({
        message: `Request data doesn't match the schema`,
        culpritRequest: body,
      }),
      headers: {
        [HttpHeaderKeys.contentType]:
          HttpHeaderValues.contentType.applicationJson,
      },
    };
  }

  const filesMetadataTableMetadata = body.isPublic
    ? privateFilesMetadataDynamoTable
    : publicFilesMetadataDynamoTable;

  const bucketName = body.isPublic
    ? publicFilesBucketName
    : privateFilesBucketName;

  const filesMetadata = body.files.map((file) => {
    const id = crypto.randomUUID();
    const mediaType = parseMediaType(file.mimeType)[0];
    const fileExtension = file.fileExtension.length > 0
      ? `.${file.fileExtension}`
      : "";
    const filePath = `/${mediaType}/${id}${fileExtension}`;
    return {
      clientSideId: file.clientSideId,
      fileId: id,
      filePath,
      mimeType: mediaType,
      fileSizeInBytes: file.fileSizeInBytes,
      createdBy: user.userId,
      createdAtMillis: Date.now(),
    };
  });

  const uploadPresignedUrls = mapNotNullish(
    await Promise.all(
      filesMetadata.map(async (metadata) => {
        const presignedUrlResponse = await s3PresignedUrlGenerator
          .generateUploadUrl({
            contentType: metadata.mimeType,
            expiryMillis: 3600,
            filePath: metadata.filePath,
            bucketName,
          });

        if (presignedUrlResponse.type === "error") {
          logger.log(
            `Failed to fetch presigned url for`,
            metadata,
            ". Error =",
            presignedUrlResponse.error,
          );
          return null;
        }

        return {
          filePath: metadata.filePath,
          clientSideId: metadata.clientSideId,
          presignedUploadUrl: presignedUrlResponse.presignedUrl,
        };
      }),
    ),
    // pick only non null values
    (x) => x,
  );

  if (uploadPresignedUrls.length !== filesMetadata.length) {
    logger.log("Failed to fetch upload presigned url for some files.");
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      cookies: [],
      body: JSON.stringify({
        message: `Failed to fetch upload presigned url for some files.`,
      }),
      headers: {
        [HttpHeaderKeys.contentType]:
          HttpHeaderValues.contentType.applicationJson,
      },
    };
  }

  // write metadata to dynamodb
  const tableUpdateResponse = await filesMetadataTableMetadata.createMany({
    data: filesMetadata.map((metadata) => ({
      fileId: metadata.fileId,
      filePath: metadata.filePath,
      mimeType: metadata.mimeType,
      createdBy: metadata.createdBy,
      createdAtMillis: metadata.createdAtMillis,
      fileSizeInBytes: metadata.fileSizeInBytes,
      isUploaded: false,
    })),
  });

  if (tableUpdateResponse.error !== null) {
    logger.log("Failed to write file metadata info to dynamodb");
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      cookies: [],
      body: JSON.stringify({
        message: `Failed to write file metadata info to dynamodb`,
      }),
      headers: {
        [HttpHeaderKeys.contentType]:
          HttpHeaderValues.contentType.applicationJson,
      },
    };
  }

  return {
    statusCode: http2.constants.HTTP_STATUS_OK,
    cookies: [],
    body: JSON.stringify(
      {
        files: uploadPresignedUrls,
      } satisfies CreateUploadPresignedUrlResponse,
    ),
    headers: {
      [HttpHeaderKeys.contentType]:
        HttpHeaderValues.contentType.applicationJson,
    },
  };
}
