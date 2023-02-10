import { GistFile } from '../GithubGistFile';
import { CORSConfig, IGithubGistMetadata } from '../types';
import { constructGistFile } from './constructGistFile';

export interface FetchAllGistFilesProps {
  corsConfig: CORSConfig;
  enableRequestCaching: boolean;
  gistMetadata: IGithubGistMetadata;
  isGistPublic: boolean;
  personalAccessToken: string;
}

export async function fetchAllGistFiles({
  corsConfig,
  enableRequestCaching,
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
      enableRequestCaching,
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
