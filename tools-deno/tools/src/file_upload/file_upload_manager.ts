import { assert } from "@std/assert";
import { Notification } from "@/utils/mod.ts";

import {
  type FileIdGenerator,
  FileIdGeneratorImpl,
} from "./file_id_generator.ts";
import { type FileUploader, FileUploaderImpl } from "./file_uploader.ts";
import type { FileUploadMetadataFetcher } from "./file_upload_metadata_fetcher.ts";
import type { FileUploadState } from "./types.ts";

export type FileUploaderDependencies = {
  fileIdGenerator?: FileIdGenerator;
  fileUploadMetadataFetcher: FileUploadMetadataFetcher;
  fileUploader?: FileUploader;
};

export class FileUploadManager {
  private fileUploadStates = new Notification<FileUploadState[]>({
    notifyOnSubscribe: true,
  });

  private readonly deps: Required<FileUploaderDependencies>;
  private get states(): FileUploadState[] {
    return this.fileUploadStates.getData() ?? [];
  }

  constructor(deps: FileUploaderDependencies) {
    this.deps = {
      fileIdGenerator: new FileIdGeneratorImpl(),
      fileUploader: new FileUploaderImpl(),
      ...deps,
    };
    this.fileUploadStates.publish([]);
  }

  /**
   * Subscribe to state changes
   *
   * @param cb
   * @returns unsubscribe function
   */
  subscribe(
    cb: (data: FileUploadState[]) => void,
  ): { unsubscribe: () => void } {
    return this.fileUploadStates.subscribe(cb);
  }

  async upload(files: File[], isPublic: boolean) {
    // update status to queued
    this.fileUploadStates.publish([
      ...files.map<FileUploadState>((file) => ({
        type: "queued",
        file: file,
        clientSideFileId: this.deps.fileIdGenerator.generateFileId(file),
        isPublic,
      })),
      ...this.states,
    ]);

    console.log("Queued the files for upload:", files);

    await this.performUpload(isPublic);
  }

  private async performUpload(isPublic: boolean): Promise<void> {
    const queuedFiles: FileUploadState[] = this.states.filter((state) =>
      state.type === "queued"
    );
    const queuedFilesIds = queuedFiles.map((state) => state.clientSideFileId);

    // update status to fetching upload metadata
    this.updateFileState(
      queuedFilesIds,
      ({ file, clientSideFileId, isPublic }) => ({
        type: "fetching-upload-metadata",
        file,
        clientSideFileId,
        isPublic,
      }),
    );

    console.log("Fetching upload metadata for files:", queuedFiles);

    const response = await this.deps.fileUploadMetadataFetcher.fetchMetadata(
      queuedFiles,
      isPublic,
    );
    if (response.type === "error") {
      console.log(
        `Error occurred while fetching metadata for fileIds: ${queuedFilesIds}, files:`,
        this.states,
      );

      // // update status to error
      this.updateFileState(
        queuedFilesIds,
        ({ clientSideFileId, file, isPublic }) => ({
          type: "error-fetching-upload-metadata",
          clientSideFileId,
          file,
          error: response.error,
          isPublic,
        }),
      );
      return;
    }

    // update status to in-progress
    this.updateFileState(
      queuedFilesIds,
      ({ clientSideFileId, file, isPublic }) => {
        const { presignedUploadUrl, filePath } = response.metadata.files.find((
          { clientSideId: clientSideIdFromResponse },
        ) => clientSideFileId === clientSideIdFromResponse)!;
        return {
          type: "upload-in-progress",
          file,
          clientSideFileId,
          isPublic,
          presignedUploadUrl,
          uploadedBytes: 0,
          totalBytes: file.size,
          filePath,
        };
      },
    );

    console.log("Upload to server in progress:", queuedFiles);

    await Promise.allSettled(
      this.states
        .filter(({ clientSideFileId }) =>
          queuedFilesIds.includes(clientSideFileId)
        )
        .map((state) => {
          assert(state.type === "upload-in-progress");
          return this.uploadFile(
            state.clientSideFileId,
            state.file,
            state.presignedUploadUrl,
          );
        }),
    );
  }

  private async uploadFile(
    fileId: string,
    file: File,
    presignedUploadUrl: string,
  ) {
    const response = await this.deps.fileUploader.uploadFile(
      file,
      presignedUploadUrl,
      (uploadedBytes) =>
        this.updateFileState(
          [fileId],
          ({ file, clientSideFileId, isPublic, ...rest }) => {
            assert(rest.type === "upload-in-progress");
            return {
              type: "upload-in-progress",
              file,
              clientSideFileId,
              uploadedBytes,
              presignedUploadUrl,
              totalBytes: file.size,
              filePath: rest.filePath,
              isPublic,
            };
          },
        ),
    );
    if (response.type === "success") {
      this.updateFileState(
        [fileId],
        ({ file, clientSideFileId, isPublic, ...rest }) => {
          assert(rest.type === "upload-in-progress");
          return {
            type: "upload-complete",
            file,
            clientSideFileId,
            isPublic,
            totalBytes: rest.totalBytes,
            filePath: rest.filePath,
          };
        },
      );
      console.log("Upload complete for file:", file);
    } else {
      console.log(
        `Error occurred while uploading file: ${fileId}, files:`,
        this.states,
      );
      this.updateFileState(
        [fileId],
        ({ file, clientSideFileId, isPublic }) => ({
          type: "upload-error",
          error: response.error,
          file,
          clientSideFileId,
          isPublic,
        }),
      );
    }
  }

  private updateFileState(
    fileIds: string[],
    transform: (oldState: FileUploadState) => FileUploadState,
  ): void {
    this.fileUploadStates.publish(
      this.states.map<FileUploadState>((oldFileState) =>
        fileIds.includes(oldFileState.clientSideFileId)
          ? transform(oldFileState)
          : oldFileState
      ),
    );
  }
}
