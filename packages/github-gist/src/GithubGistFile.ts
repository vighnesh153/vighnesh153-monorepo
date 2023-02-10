import axios from 'axios';
import { not } from '@vighnesh153/utils';
import {
  buildGistFileFetchRequestConfigForCommit,
  fetchLatestGistCommitId,
  getCache,
  setCache,
  withAuthConfig,
} from './utils';
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
}

export class GistFile {
  hasUnSyncedUpdates = true;

  constructor(private options: GistFileProps) {}

  get name(): string {
    return this.options.fileName;
  }

  get content(): string {
    return this.options.fileContent;
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
    if (this.options.fileContent === newContent) {
      return;
    }
    this.options.fileContent = newContent;
    this.hasUnSyncedUpdates = true;
  }

  /**
   * Saves the content of the file on GitHub Gist
   */
  async save(): Promise<void> {
    if (not(this.hasUnSyncedUpdates)) return;

    const url = `${constants.urls.github.gists}/${this.options.gistMetadata.id}`;
    const body = {
      public: this.options.isPublic,
      files: {
        [this.options.fileName]: {
          content: this.options.fileContent,
        },
      },
    };

    await axios.post(url, body, withAuthConfig({ personalAccessToken: this.options.personalAccessToken }));
    this.hasUnSyncedUpdates = false;
  }

  /**
   * Fetches the latest content of the file from the Gist
   */
  async fetchLatestContent(): Promise<void> {
    const latestCommit = await fetchLatestGistCommitId({
      gistId: this.options.gistMetadata.id,
      personalAccessToken: this.options.personalAccessToken,
    });

    const key = `gistId=${this.options.gistMetadata.id},commitId=${latestCommit},fileName=${this.options.fileName}`;
    let fileContent: string | null = this.options.enableRequestCaching ? (getCache(key) as string | null) : null;

    if (fileContent === null) {
      const { data } = await axios<string>(
        withAuthConfig({
          personalAccessToken: this.options.personalAccessToken,
          baseConfig: {
            ...buildGistFileFetchRequestConfigForCommit({
              fileName: this.options.fileName,
              gistId: this.options.gistMetadata.id,
              gistOwner: this.options.gistMetadata.owner.login,
              corsConfig: this.options.corsConfig,
              commitId: latestCommit,
            }),
            method: 'get',
          },
        })
      );
      fileContent = data ?? '';
    }
    setCache(key, fileContent);

    this.options.fileContent = typeof fileContent === 'string' ? fileContent : JSON.stringify(fileContent);
    this.hasUnSyncedUpdates = false;
  }
}
