import { GistFile } from '../GithubGistFile';
import { CORSConfig, IGithubGistMetadata } from '../types';

export interface ConstructGistFileProps {
  corsConfig: CORSConfig;
  enableRequestCaching: boolean;
  gistFileContent: string;
  gistFileName: string;
  gistMetadata: IGithubGistMetadata;
  isGistPublic: boolean;
  personalAccessToken: string;
}

export function constructGistFile(props: ConstructGistFileProps): GistFile {
  const {
    corsConfig,
    enableRequestCaching,
    gistFileName,
    gistMetadata,
    gistFileContent,
    isGistPublic,
    personalAccessToken,
  } = props;
  return new GistFile({
    corsConfig,
    enableRequestCaching,
    fileName: gistFileName,
    gistMetadata,
    fileContent: gistFileContent,
    isPublic: isGistPublic,
    personalAccessToken,
  });
}