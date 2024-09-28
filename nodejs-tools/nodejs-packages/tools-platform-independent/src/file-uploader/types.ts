export type FileUploadState =
  | {
      type: 'queued';
      fileId: string;
      file: File;
    }
  | {
      type: 'fetching-upload-metadata';
      fileId: string;
      file: File;
    }
  | {
      type: 'in-progress';
      fileId: string;
      file: File;
      uploadUrl: string;
      uploadedBytes: number;
      totalBytes: number;
    }
  | {
      type: 'complete';
      fileId: string;
      file: File;
    }
  | {
      type: 'error';
      fileId: string;
      file: File;
      error: Error;
    };
