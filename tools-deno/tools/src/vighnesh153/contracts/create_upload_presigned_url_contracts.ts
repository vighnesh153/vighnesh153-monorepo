export type CreateUploadPresignedUrlRequest = {
  files: Array<{
    clientSideId: string;
    mimeType: string;
    fileSizeInBytes: number;
  }>;
  isPublic: boolean;
};

export type CreateUploadPresignedUrlResponse = {
  files: Array<{
    clientSideId: string;
    filePath: string;
    presignedUploadUrl: string;
  }>;
};
