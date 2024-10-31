import type { CreateUploadPresignedUrlResponse } from "@/vighnesh153/contracts/mod.ts";

export type FileUploadMetadataFetcherResponse =
  | {
    type: "success";
    metadata: CreateUploadPresignedUrlResponse;
  }
  | {
    type: "error";
    error: Error;
  };

export interface FileUploadMetadataFetcher {
  fetchMetadata(
    files: { clientSideFileId: string; file: File }[],
  ): Promise<FileUploadMetadataFetcherResponse>;
}
