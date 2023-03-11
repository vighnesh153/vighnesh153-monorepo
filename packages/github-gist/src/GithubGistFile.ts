import axios from 'axios';
import { not } from '@vighnesh153/utils';
import { fetchLatestContentOfGistFile, fetchLatestGistCommitId, getCache, setCache, withAuthConfig } from './utils';
import { constants } from './constants';
import { CORSConfig, IGithubGistMetadata } from './types';

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
  /**
   * Returns `true`, if the file is dirty (modifier and not synced with Gist), else, false
   */
  hasUnSyncedUpdates: boolean;

  private fileContent: string;

  constructor(private options: GistFileProps) {
    this.fileContent = options.fileContent;
    this.hasUnSyncedUpdates = options.hasUnSyncedUpdates ?? true;
  }

  /**
   * Get the name of the file
   */
  get name(): string {
    return this.options.fileName;
  }

  /**
   * Get the content in memory
   */
  get content(): string {
    return this.fileContent;
  }

  /**
   * Update the file content
   *
   * > Updates are in-memory. If you want to save them to the Gist, invoke the `save()` method
   * on the file or on the entire gist
   *
   * @param newContent
   */
  set content(newContent: string) {
    if (this.fileContent === newContent) {
      return;
    }
    this.fileContent = newContent;
    this.hasUnSyncedUpdates = true;
  }

  /**
   * Saves the content of the file on GitHub Gist
   */
  async save(): Promise<void> {
    if (not(this.hasUnSyncedUpdates)) return;

    await axios(
      withAuthConfig({
        personalAccessToken: this.options.personalAccessToken,
        baseConfig: {
          url: `${constants.urls.github.gists}/${this.options.gistMetadata.id}`,
          method: 'patch',
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
          data: {
            public: this.options.isPublic,
            files: {
              [this.options.fileName]: {
                content: this.fileContent,
              },
            },
          },
        },
      })
    );
    this.hasUnSyncedUpdates = false;
  }

  /**
   * Fetches the latest content of the file from the Gist
   */
  async fetchLatestContent(): Promise<void> {
    const gistId = this.options.gistMetadata.id;
    const {
      personalAccessToken,
      fileName,
      enableRequestCaching,
      corsConfig,
      gistMetadata: {
        owner: { login: gistOwner },
      },
    } = this.options;

    const latestCommitId = await fetchLatestGistCommitId({
      gistId,
      personalAccessToken,
    });

    const cacheKey = `gistId=${gistId},commitId=${latestCommitId},fileName=${fileName}`;

    // cache hit and caching is enabled
    if (enableRequestCaching && getCache(cacheKey) !== null) {
      this.fileContent = getCache(cacheKey) as string;
      this.hasUnSyncedUpdates = false;
      return;
    }

    // fetch the actual data
    const fileContent = await fetchLatestContentOfGistFile({
      personalAccessToken,
      fileName,
      gistId,
      gistOwner,
      corsConfig,
      latestCommitId,
    });

    // if caching is enabled, store the result in the cache
    if (enableRequestCaching) {
      setCache(cacheKey, fileContent);
    }

    this.fileContent = typeof fileContent === 'string' ? fileContent : JSON.stringify(fileContent);
    this.hasUnSyncedUpdates = false;
  }
}
