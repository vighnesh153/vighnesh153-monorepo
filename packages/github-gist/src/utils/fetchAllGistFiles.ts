import { GistFile } from '../GithubGistFile';
import { CORSConfig, IGithubGistMetadata } from '../types';
import { constructGistFile } from './constructGistFile';

export interface FetchAllGistFilesProps {
  corsConfig: CORSConfig;
  gistMetadata: IGithubGistMetadata;
  isGistPublic: boolean;
  personalAccessToken: string;
}

export async function fetchAllGistFiles({
  corsConfig,
  gistMetadata,
  isGistPublic,
  personalAccessToken,
}: FetchAllGistFilesProps): Promise<GistFile[]> {
  const gistFiles: GistFile[] = [];
  const gistFileContentPromises: Promise<void>[] = [];
  const gistFilesNames = Object.keys(gistMetadata.files);

  gistFilesNames.forEach((gistFileName) => {
    const gistFile = constructGistFile({
      gistFileName,
      gistFileContent: '',
      corsConfig,
      gistMetadata,
      personalAccessToken,
      isGistPublic,
    });
    gistFileContentPromises.push(gistFile.fetchLatestContent());
    gistFiles.push(gistFile);
  });

  // Wait for all the file content to be available
  await Promise.all(gistFileContentPromises);

  return gistFiles;
}
