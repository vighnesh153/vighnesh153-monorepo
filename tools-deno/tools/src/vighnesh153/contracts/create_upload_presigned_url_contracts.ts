import { z } from "zod";

import {
  isValidZodObject,
  type IsValidZodObjectReturnValue,
} from "@/vighnesh153/local_utils.ts";
import { assertType, type Equals } from "@/utils/type_assertion.ts";

const ZodCreateUploadPresignedUrlRequest = z.object({
  files: z.object({
    clientSideId: z.string().min(1),
    fileExtension: z.string().min(1),
    mimeType: z.string().min(1),
    fileSizeInBytes: z.number(),
  }).array(),
  isPublic: z.boolean(),
});

const ZodCreateUploadPresignedUrlResponse = z.object({
  files: z.object({
    clientSideId: z.string().min(1),
    filePath: z.string(),
    presignedUploadUrl: z.string(),
  }).array(),
});

export type CreateUploadPresignedUrlRequest = {
  files: {
    clientSideId: string;
    fileExtension: string;
    mimeType: string;
    fileSizeInBytes: number;
  }[];
  isPublic: boolean;
};

export type CreateUploadPresignedUrlResponse = {
  files: {
    clientSideId: string;
    filePath: string;
    presignedUploadUrl: string;
  }[];
};

assertType<
  Equals<
    CreateUploadPresignedUrlRequest,
    z.infer<typeof ZodCreateUploadPresignedUrlRequest>
  >
>;

assertType<
  Equals<
    CreateUploadPresignedUrlResponse,
    z.infer<typeof ZodCreateUploadPresignedUrlResponse>
  >
>;

export function isValidCreateUploadPresignedUrlRequest(
  value: unknown,
): IsValidZodObjectReturnValue {
  return isValidZodObject(value, ZodCreateUploadPresignedUrlRequest);
}

export function isValidCreateUploadPresignedUrlResponse(
  value: unknown,
): IsValidZodObjectReturnValue {
  return isValidZodObject(value, ZodCreateUploadPresignedUrlResponse);
}
