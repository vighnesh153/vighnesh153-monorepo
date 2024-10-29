import type {} from "@kitsonk/xhr/globals";
// import "@kitsonk/xhr";

export type FileUploaderResponse = { type: "success" } | {
  type: "error";
  error: Error;
};

export interface FileUploader {
  uploadFile(
    file: File,
    uploadUrl: string,
    uploadProgress: (uploadedBytes: number) => void,
  ): Promise<FileUploaderResponse>;
}

export class FileUploaderImpl implements FileUploader {
  async uploadFile(
    file: File,
    uploadUrl: string,
    uploadProgress: (uploadedBytes: number) => void,
  ): Promise<FileUploaderResponse> {
    try {
      await new Promise((resolve, reject) => {
        // @ts-ignore: Deno doesn't identify the XMLHttpRequest type
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type);

        // @ts-ignore: Deno doesn't identify the XMLHttpRequest type
        xhr.upload.onprogress = (e) => {
          uploadProgress(e.loaded ?? 0);
        };

        // @ts-ignore: Deno doesn't identify the XMLHttpRequest type
        xhr.onerror = (e) => {
          reject(
            new Error(
              `Some error occurred while uploading file: ${file.name}`,
              { cause: e },
            ),
          );
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(null);
          } else {
            reject(
              new Error(
                `Upload failed with status: ${xhr.status}`,
              ),
            );
          }
        };

        xhr.send(file);
      });
      return { type: "success" };
    } catch (e) {
      return { type: "error", error: e as Error };
    }
  }
}
