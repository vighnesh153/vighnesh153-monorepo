import { GistFile } from '../GithubGistFile';
import { CORSConfig, IGithubGistMetadata } from '../types';

export interface ConstructGistFileProps {
  corsConfig: CORSConfig;
  gistFileContent: string;
  gistFileName: string;
  gistMetadata: IGithubGistMetadata;
  isGistPublic: boolean;
  personalAccessToken: string;
}

export function constructGistFile({
  corsConfig,
  gistFileName,
  gistMetadata,
  gistFileContent,
  isGistPublic,
  personalAccessToken,
}: ConstructGistFileProps): GistFile {
  return new GistFile({
    corsConfig,
    fileName: gistFileName,
    gistMetadata,
    fileContent: gistFileContent,
    isPublic: isGistPublic,
    personalAccessToken,
  });
}
