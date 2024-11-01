import { z } from "zod";

import { ACCEPTABLE_MIME_TYPES } from "@/vighnesh153/mime_types.ts";

export const CreateUploadPresignedUrlRequest = z.object({
  files: z.object({
    clientSideId: z.string().min(1),
    fileExtension: z.string().min(1),
    mimeType: z.enum(ACCEPTABLE_MIME_TYPES),
    fileSizeInBytes: z.number(),
  }).array(),
  isPublic: z.boolean(),
});

// deno-lint-ignore no-slow-types
export const CreateUploadPresignedUrlResponse = z.object({
  files: z.object({
    clientSideId: z.string().min(1),
    filePath: z.string(),
    presignedUploadUrl: z.string(),
  }).array(),
});

export type CreateUploadPresignedUrlRequest = z.infer<
  typeof CreateUploadPresignedUrlRequest
>;

export type CreateUploadPresignedUrlResponse = z.infer<
  typeof CreateUploadPresignedUrlResponse
>;
