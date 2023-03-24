import axios from 'axios';
import * as fs from 'fs';

export async function downloadImage(url: string, path: string): Promise<void> {
  return axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(path))
          .on('finish', () => resolve())
          .on('error', (error: unknown) => reject(error));
      })
  );
}
