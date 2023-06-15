import { IGithubGistMetadata } from '../types';

export function removeFileContentFromGistMetadata(gistMetadata: IGithubGistMetadata): IGithubGistMetadata {
  return {
    ...gistMetadata,
    files: Object.keys(gistMetadata.files).reduce((accumulator, filename: string) => {
      accumulator[filename] = {
        filename,
        content: '',
      };
      return accumulator;
    }, {} as IGithubGistMetadata['files']),
  };
}
