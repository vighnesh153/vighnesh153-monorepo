export interface IGithubGistMetadata {
  id: string;
  owner: { login: string };
  files: {
    [key: string]: {
      filename: string;

      /**
       * This will only be available on `/gists/{gist_id}` route
       */
      content: string;
    };
  };
}
