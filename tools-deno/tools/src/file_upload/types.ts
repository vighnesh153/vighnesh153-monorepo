type Common = {
  clientSideFileId: string;
  file: File;
  isPublic: boolean;
};

export type FileUploadState_Queued = Common & {
  type: "queued";
};

export type FileUploadState_FetchingUploadMetadata = Common & {
  type: "fetching-upload-metadata";
};

export type FileUploadState_ErrorFetchingUploadMetadata = Common & {
  type: "error-fetching-upload-metadata";
  error: Error;
};

export type FileUploadState_UploadInProgress = Common & {
  type: "upload-in-progress";
  filePath: string;
  presignedUploadUrl: string;
  uploadedBytes: number;
  totalBytes: number;
};

export type FileUploadState_UploadComplete = Common & {
  type: "upload-complete";
  filePath: string;
  totalBytes: number;
};

export type FileUploadState_UploadError = Common & {
  type: "upload-error";
  error: Error;
};

export type FileUploadState =
  | FileUploadState_Queued
  | FileUploadState_FetchingUploadMetadata
  | FileUploadState_ErrorFetchingUploadMetadata
  | FileUploadState_UploadInProgress
  | FileUploadState_UploadComplete
  | FileUploadState_UploadError;
