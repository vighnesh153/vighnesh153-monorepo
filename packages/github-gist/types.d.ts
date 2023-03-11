declare module 'tsup.config' {
  const _default:
    | import('tsup').Options
    | import('tsup').Options[]
    | ((
        overrideOptions: import('tsup').Options
      ) =>
        | import('tsup').Options
        | import('tsup').Options[]
        | Promise<import('tsup').Options | import('tsup').Options[]>);
  export default _default;
}
declare module 'src/constants' {
  export const constants: {
    urls: {
      github: {
        rateLimit: string;
        gists: string;
      };
      corsAnywherePrefix: string;
    };
  };
}
declare module 'src/types/CORSConfig' {
  import { AxiosRequestConfig } from 'axios';
  export type CORSConfig =
    | {
        type: 'none';
      }
    | {
        type: 'default';
      }
    | {
        type: 'custom';
        /**
         *  Creates a custom request object to tackle CORS blocking
         */
        customRequestConfig: (url: string) => AxiosRequestConfig;
      };
}
declare module 'src/types/IGithubGistMetadata' {
  export interface IGithubGistMetadata {
    id: string;
    owner: {
      login: string;
    };
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
}
declare module 'src/types/IGithubGistProps' {
  import { CORSConfig } from 'src/types/CORSConfig';
  export interface IGithubGistProps {
    /**
     * Head over to [create personal access token](https://github.com/settings/tokens/new?scopes=gist) to create
     * your personalAccessToken. Make sure that the `gist` scope is checked. Keep the token, a secret.
     */
    personalAccessToken: string;
    /**
     * ID of your gist. To get the ID,
     *  * you need to create a new gist on [gist.github.com](https://gist.github.com)
     *  * open the newly created gist
     *  * copy the ID from the URL
     */
    gistId: string;
    /**
     * Since commit hashes are unique and whenever a file changes, we can be sure that the new SHA
     * will be different from the previously encountered ones. This option can be used to cache the
     * content for all unique SHAs
     *
     * @default true
     */
    enableRequestCaching?: boolean;
    /**
     * Whether the gist should be private or public
     *
     * @default false
     */
    isPublic?: boolean;
    /**
     * CORS configuration. Needed when using the API on the client side.
     *
     * If `type=default`, it will use `https://corsanywhere.herokuapp.com/` as prefix to
     * the GitHub URLs to tackle CORS blocking
     */
    corsConfig?: CORSConfig;
  }
}
declare module 'src/types/index' {
  export * from 'src/types/CORSConfig';
  export * from 'src/types/IGithubGistMetadata';
  export * from 'src/types/IGithubGistProps';
}
declare module 'src/utils/buildGistFileFetchRequestConfigForCommit' {
  import { AxiosRequestConfig } from 'axios';
  import { CORSConfig } from 'src/types/index';
  export interface BuildLatestGistFileFetchUrlProps {
    commitId: string;
    corsConfig: CORSConfig;
    fileName: string;
    gistId: string;
    gistOwner: string;
  }
  export function buildGistFileFetchRequestConfigForCommit(props: BuildLatestGistFileFetchUrlProps): AxiosRequestConfig;
}
declare module 'src/utils/caching' {
  export function getCache(key: string): unknown | null;
  /**
   *
   * @param keys=ALL_KEYS
   */
  export function resetCache(keys?: string[]): void;
  export function setCache(key: string, value: unknown): void;
}
declare module 'src/utils/withAuthConfig' {
  import { AxiosRequestConfig } from 'axios';
  interface AuthConfigProps {
    personalAccessToken: string;
    baseConfig?: AxiosRequestConfig;
  }
  export function withAuthConfig(props: AuthConfigProps): AxiosRequestConfig;
}
declare module 'src/utils/fetchGistMetadata' {
  import { IGithubGistMetadata } from 'src/types/index';
  export interface FetchGistMetadataUsingGistIdProps {
    personalAccessToken: string;
    gistId: string;
  }
  export function fetchGistMetadata(props: FetchGistMetadataUsingGistIdProps): Promise<IGithubGistMetadata>;
}
declare module 'src/utils/fetchLatestContentOfGistFile' {
  import { CORSConfig } from 'src/types/index';
  export interface FetchLatestContentOfGistFileProps {
    personalAccessToken: string;
    fileName: string;
    gistId: string;
    gistOwner: string;
    corsConfig: CORSConfig;
    latestCommitId: string;
  }
  export function fetchLatestContentOfGistFile(props: FetchLatestContentOfGistFileProps): Promise<unknown>;
}
declare module 'src/utils/fetchLatestGistCommitId' {
  export interface FetchLatestGistCommitProps {
    gistId: string;
    personalAccessToken: string;
  }
  export function fetchLatestGistCommitId(props: FetchLatestGistCommitProps): Promise<string>;
}
declare module 'src/utils/githubGistOptionsUtils' {
  import { CORSConfig, IGithubGistProps } from 'src/types/index';
  export function isGistPublic(options: IGithubGistProps): boolean;
  export function getEnableRequestCaching(options: IGithubGistProps): boolean;
  export function getCorsConfig(options: IGithubGistProps): CORSConfig;
}
declare module 'src/utils/removeFileContentFromGistMetadata' {
  import { IGithubGistMetadata } from 'src/types/index';
  export function removeFileContentFromGistMetadata(gistMetadata: IGithubGistMetadata): IGithubGistMetadata;
}
declare module 'src/utils/verifyGithubPAT' {
  export function verifyGithubPAT(token: string): Promise<void>;
}
declare module 'src/utils/index' {
  export * from 'src/utils/buildGistFileFetchRequestConfigForCommit';
  export * from 'src/utils/caching';
  export * from 'src/utils/fetchGistMetadata';
  export * from 'src/utils/fetchLatestContentOfGistFile';
  export * from 'src/utils/fetchLatestGistCommitId';
  export * from 'src/utils/githubGistOptionsUtils';
  export * from 'src/utils/removeFileContentFromGistMetadata';
  export * from 'src/utils/verifyGithubPAT';
  export * from 'src/utils/withAuthConfig';
}
declare module 'src/GithubGistFile' {
  import { CORSConfig, IGithubGistMetadata } from 'src/types/index';
  export interface GistFileProps {
    gistMetadata: IGithubGistMetadata;
    personalAccessToken: string;
    enableRequestCaching: boolean;
    fileName: string;
    fileContent: string;
    isPublic: boolean;
    corsConfig: CORSConfig;
    hasUnSyncedUpdates?: boolean;
  }
  export class GistFile {
    private options;
    /**
     * Returns `true`, if the file is dirty (modifier and not synced with Gist), else, false
     */
    hasUnSyncedUpdates: boolean;
    private fileContent;
    constructor(options: GistFileProps);
    /**
     * Get the name of the file
     */
    get name(): string;
    /**
     * Get the content in memory
     */
    get content(): string;
    /**
     * Update the file content
     *
     * > Updates are in-memory. If you want to save them to the Gist, invoke the `save()` method
     * on the file or on the entire gist
     *
     * @param newContent
     */
    set content(newContent: string);
    /**
     * Saves the content of the file on GitHub Gist
     */
    save(): Promise<void>;
    /**
     * Fetches the latest content of the file from the Gist
     */
    fetchLatestContent(): Promise<void>;
  }
}
declare module 'src/saveGithubGist' {
  import { GistFile } from 'src/GithubGistFile';
  export interface SaveGithubGistOptions {
    gistFiles: GistFile[];
    isGistPublic: boolean;
    personalAccessToken: string;
    gistId: string;
  }
  export function saveGithubGist(options: SaveGithubGistOptions): Promise<void>;
}
declare module 'src/GithubGist' {
  import { IGithubGistProps } from 'src/types/index';
  import { GistFile } from 'src/GithubGistFile';
  export class GithubGist {
    private options;
    private static avoidInstantiation;
    private gistMetadata;
    private gistFiles;
    /**
     *
     * @param options
     * @deprecated Use the `GithubGist.initializeUsingGistId` static method instead
     */
    private constructor();
    /**
     * Returns all the files from the Gist
     */
    get files(): GistFile[];
    /**
     * Returns the id of the gist
     */
    get id(): string;
    /**
     * Returns the GitHub username of the person who owns the gist
     */
    get owner(): string;
    /**
     * Initializes the gist object with the metadata from server and all file content
     * @param options
     */
    static initializeUsingGistId(options: IGithubGistProps): Promise<GithubGist>;
    /**
     * Fetches the latest content of all the files in the gist
     */
    fetchLatestContent(): Promise<void>;
    /**
     * Creates a new file and returns it
     *
     * > It doesn't save the file on the Gist. You have to manually invoke
     * the "save" method
     *
     * @param fileName
     */
    createNewFile(fileName: string): GistFile;
    /**
     * Saves only modified files as the latest commit
     */
    save(): Promise<void>;
    /**
     * Returns the file from Gist, if it exists, else, returns null
     * @param fileName
     */
    getFileByName(fileName: string): GistFile | null;
  }
}
declare module 'src/index' {
  export * from 'src/GithubGist';
  export * from 'src/GithubGistFile';
}
declare module 'src/__tests__/GithubGistFile.test' {}
declare module 'src/utils/__tests__/caching.test' {}
declare module 'src/utils/__tests__/fetchGistMetadata.test' {}
declare module 'src/utils/__tests__/fetchLatestContentOfGistFile.test' {}
declare module 'src/utils/__tests__/fetchLatestGistCommitId.test' {}
declare module 'src/utils/__tests__/verifyGithubPAT.test' {}
