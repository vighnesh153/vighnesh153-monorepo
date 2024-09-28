import { assert } from '../utils/assert';
import { Notification } from '../utils/notification';

import { FileIdGenerator, FileIdGeneratorImpl } from './FileIdGenerator';
import { FileUploader, FileUploaderImpl } from './FileUploader';
import { FileUploadMetadataFetcher, FileUploadMetadataFetcherImpl } from './FileUploadMetadataFetcher';
import { FileUploadState } from './types';

export type FileUploaderDependencies = {
  fileIdGenerator: FileIdGenerator;
  fileUploadMetadataFetcher: FileUploadMetadataFetcher;
  fileUploader: FileUploader;
};

export class FileUploadManager {
  private fileUploadStates = new Notification<FileUploadState[]>({
    notifyOnSubscribe: true,
  });

  readonly subscribe = this.fileUploadStates.subscribe;

  private readonly deps: FileUploaderDependencies;
  private get states(): FileUploadState[] {
    return this.fileUploadStates.getLatestPublishedData() ?? [];
  }

  constructor(deps: Partial<FileUploaderDependencies> = {}) {
    this.deps = {
      fileIdGenerator: new FileIdGeneratorImpl(),
      fileUploadMetadataFetcher: new FileUploadMetadataFetcherImpl(),
      fileUploader: new FileUploaderImpl(),
      ...deps,
    };
    this.fileUploadStates.publish([]);
  }

  async upload(files: File[]) {
    // update status to queued
    this.fileUploadStates.publish([
      ...files.map<FileUploadState>((file) => ({
        type: 'queued',
        file: file,
        fileId: this.deps.fileIdGenerator.generateFileId(file),
      })),
      ...this.states,
    ]);

    await this.performUpload();
  }

  private async performUpload(): Promise<void> {
    const filesBeingUploaded: FileUploadState[] = this.states.filter((state) => state.type === 'queued');
    const fileIdsBeingUploaded = filesBeingUploaded.map((state) => state.fileId);

    // update status to fetching upload metadata
    this.updateFileState(fileIdsBeingUploaded, (old) => ({
      type: 'fetching-upload-metadata',
      file: old.file,
      fileId: old.fileId,
    }));

    const response = await this.deps.fileUploadMetadataFetcher.fetchMetadata(filesBeingUploaded);
    if (response.type === 'error') {
      console.log(`Error occurred while fetching metadata for fileIds: ${fileIdsBeingUploaded}, files:`, this.states);

      // // update status to error
      this.updateFileState(fileIdsBeingUploaded, (old) => ({
        type: 'error',
        fileId: old.fileId,
        file: old.file,
        error: response.error,
      }));
      return;
    }

    // update status to in-progress
    this.updateFileState(fileIdsBeingUploaded, (old) => ({
      type: 'in-progress',
      file: old.file,
      fileId: old.fileId,
      uploadUrl: response.metadata.find(({ fileId }) => fileId === old.fileId)!.uploadUrl,
      uploadedBytes: 0,
      totalBytes: old.file.size,
    }));

    await Promise.allSettled(
      this.states
        .filter(({ fileId }) => fileIdsBeingUploaded.includes(fileId))
        .map((state) => {
          assert(state.type === 'in-progress');
          return this.uploadFile(state.fileId, state.file, state.uploadUrl);
        })
    );
  }

  private async uploadFile(fileId: string, file: File, uploadUrl: string) {
    const response = await this.deps.fileUploader.uploadFile(file, uploadUrl, (uploadedBytes) =>
      this.updateFileState([fileId], (old) => ({
        type: 'in-progress',
        file: old.file,
        fileId: old.fileId,
        uploadedBytes,
        uploadUrl: uploadUrl,
        totalBytes: file.size,
      }))
    );
    if (response.type === 'success') {
      this.updateFileState([fileId], (old) => ({
        type: 'complete',
        file: old.file,
        fileId: old.fileId,
      }));
    } else {
      console.log(`Error occurred while uploading file: ${fileId}, files:`, this.states);
      this.updateFileState([fileId], (old) => ({
        type: 'error',
        error: response.error,
        file: old.file,
        fileId: old.fileId,
      }));
    }
  }

  private updateFileState(fileIds: string[], transform: (oldState: FileUploadState) => FileUploadState): void {
    this.fileUploadStates.publish(
      this.states.map<FileUploadState>((oldFileState) =>
        fileIds.includes(oldFileState.fileId) ? transform(oldFileState) : oldFileState
      )
    );
  }
}
