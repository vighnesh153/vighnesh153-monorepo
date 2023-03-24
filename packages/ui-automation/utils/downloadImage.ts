import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';

export interface DownloadImageProps {
  url: string;
  filePath: string;
  headers?: AxiosRequestConfig['headers'];
}

export async function downloadImage(props: DownloadImageProps): Promise<void> {
  const { url, filePath, headers } = props;
  return axios({
    url,
    responseType: 'stream',
    headers: {
      ...headers,
    },
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(filePath))
          .on('finish', () => resolve())
          .on('error', (error: unknown) => reject(error));
      })
  );
}
