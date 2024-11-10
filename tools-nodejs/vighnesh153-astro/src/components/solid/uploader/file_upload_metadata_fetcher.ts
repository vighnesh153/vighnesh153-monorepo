import { routes } from "@/utils";
import type { JsonHttpClient } from "@vighnesh153/tools";
import type {
  FileUploadMetadataFetcher,
  FileUploadMetadataFetcherResponse,
} from "@vighnesh153/tools/file_upload";
import type {
  CreateUploadPresignedUrlRequest,
  CreateUploadPresignedUrlResponse,
} from "@vighnesh153/tools/vighnesh153";

export class FileUploadMetadataFetcherImpl
  implements FileUploadMetadataFetcher {
  constructor(private readonly httpClient: JsonHttpClient) {}

  async fetchMetadata(
    files: { clientSideFileId: string; file: File }[],
    isPublic: boolean,
  ): Promise<FileUploadMetadataFetcherResponse> {
    const request: CreateUploadPresignedUrlRequest = {
      files: files.map(({ clientSideFileId, file }) => {
        const ext = file.name.split(".").pop() ?? "";
        return {
          clientSideId: clientSideFileId,
          mimeType: file.type,
          fileSizeInBytes: file.size,
          fileExtension: ext,
        };
      }),
      isPublic,
    };

    const requestExecutor = this.httpClient.post<
      CreateUploadPresignedUrlRequest,
      CreateUploadPresignedUrlResponse
    >({
      path: routes.api.createUploadPresignedUrl.path,
      data: request,
      credentials: "include",
    });

    const response = await requestExecutor.execute();

    if (response.isSuccess()) {
      return {
        type: "success",
        metadata: response.getSuccessResponse().data,
      };
    }

    const err = response.getErrorResponse();
    return {
      type: "error",
      error: new Error(err.errorMessage, { cause: err }),
    };
  }
}
