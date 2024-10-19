export type FileUploadMetadataFetcherResponse =
  | {
    type: "success";
    metadata: Array<{ fileId: string; uploadUrl: string }>;
  }
  | {
    type: "error";
    error: Error;
  };

export interface FileUploadMetadataFetcher {
  fetchMetadata(
    files: { fileId: string; file: File }[],
  ): Promise<FileUploadMetadataFetcherResponse>;
}

export class FileUploadMetadataFetcherImpl
  implements FileUploadMetadataFetcher {
  async fetchMetadata(
    files: { fileId: string; file: File }[],
  ): Promise<FileUploadMetadataFetcherResponse> {
    // TODO: fetch metadata
    throw new Error("Not implemented");
    // return {
    //   type: "success",
    //   metadata: [],
    // };
  }
}