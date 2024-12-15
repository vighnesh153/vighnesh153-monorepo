import type { FileUploadState } from "@vighnesh153/tools/file_upload";

export const testFilesData: FileUploadState[] = [
  {
    type: "queued",
    file: { name: "file 1 (queued)" } as unknown as File,
    clientSideFileId: "123",
    isPublic: true,
  },
  {
    type: "fetching-upload-metadata",
    file: { name: "file 2 (fetching upload metadata)" } as unknown as File,
    clientSideFileId: "123",
    isPublic: true,
  },
  {
    type: "error-fetching-upload-metadata",
    file: {
      name: "file 3 (error fetching upload metadata)",
    } as unknown as File,
    clientSideFileId: "123",
    isPublic: true,
    error: new Error("Fetching metadata error occurred"),
  },
  {
    type: "upload-in-progress",
    file: { name: "file 4 (upload in progress)" } as unknown as File,
    clientSideFileId: "123",
    filePath: "/path/to/file",
    isPublic: true,
    totalBytes: 200,
    presignedUploadUrl: "...",
    uploadedBytes: 125,
  },
  {
    type: "upload-complete",
    file: { name: "file 5 (upload complete)" } as unknown as File,
    clientSideFileId: "123",
    filePath: "/path/to/file",
    isPublic: true,
    totalBytes: 200,
  },
  {
    type: "upload-error",
    file: { name: "file 6 (upload error)" } as unknown as File,
    clientSideFileId: "123",
    isPublic: true,
    error: new Error("Upload error occurred"),
  },
];
