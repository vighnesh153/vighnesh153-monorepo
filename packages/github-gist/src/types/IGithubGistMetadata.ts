export interface IGithubGistMetadata {
  id: string;
  owner: { login: string };
  files: {
    [key: string]: {
      filename: string;
    };
  };
}
