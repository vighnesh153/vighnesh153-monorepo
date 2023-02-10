import axios from 'axios';
import { not } from '@vighnesh153/utils';
import { createGist, fetchGistMetadata, verifyGithubPAT, withAuthConfig } from './utils';
import { CORSConfig, IGithubGistMetadata } from './types';
import { GistFile } from './GithubGistFile';
import { fetchAllGistFiles } from './utils/fetchAllGistFiles';
import { constructGistFile } from './utils/constructGistFile';
import { constants } from './constants';

function gistNotInitializedError() {
  return new Error(`Gist is not initialized. Initialize the gist by invoking the "initialize()" method first`);
}

export interface GithubGistProps {
  /**
   * Head over to this link: https://github.com/settings/tokens/new?scopes=gist to create
   * your personalAccessToken. Make sure that the "gist" scope is checked. Keep the token, a secret.
   */
  personalAccessToken: string;

  /**
   * A unique name to identify your gist. The appIdentifier will be used to identify the gist being
   * used for the storage.
   *
   * Examples: my-chat-app, my-first-app
   *
   * Note: Remember to use same identifier when re-starting the application. For different applications,
   * use different identifiers, unless you want to share the files in the gist among different applications.
   */
  appIdentifier: string;

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

export class GithubGist {
  private gistMetadata: IGithubGistMetadata | null = null;

  private gistFiles: GistFile[] = [];

  constructor(private options: GithubGistProps) {}

  get files(): GistFile[] {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }
    return [...this.gistFiles];
  }

  /**
   * Returns the id of the gist
   */
  get id() {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }
    return this.gistMetadata.id;
  }

  /**
   * Returns the GitHub username of the person who owns the gist
   */
  get owner() {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }
    return this.gistMetadata.owner.login;
  }

  createNewFile(fileName: string): GistFile {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }

    const existingFile = this.getFileByName(fileName);
    if (existingFile !== null) {
      return existingFile;
    }

    const gistFile = constructGistFile({
      corsConfig: this.corsConfig(),
      enableRequestCaching: this.getEnableRequestCaching(),
      isGistPublic: this.isGistPublic(),
      gistFileName: fileName,
      gistFileContent: '',
      personalAccessToken: this.options.personalAccessToken,
      gistMetadata: this.gistMetadata,
    });
    this.gistFiles.push(gistFile);
    return gistFile;
  }

  async save(): Promise<void> {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }

    const payload: Record<string, { content: string }> = {};
    this.gistFiles.forEach((gistFile) => {
      if (not(gistFile.hasUnSyncedUpdates)) return;
      payload[gistFile.name] = {
        content: gistFile.content,
      };
    });

    // No files need updates. Hence, the payload is empty
    if (Object.keys(payload).length === 0) return;

    await axios(
      withAuthConfig({
        personalAccessToken: this.options.personalAccessToken,
        baseConfig: {
          url: `${constants.urls.github.gists}/${this.gistMetadata.id}`,
          method: 'post',
          data: {
            public: this.isGistPublic(),
            files: payload,
          },
        },
      })
    );

    this.gistFiles.forEach((gistFile) => {
      // eslint-disable-next-line no-param-reassign
      gistFile.hasUnSyncedUpdates = false;
    });
  }

  getFileByName(fileName: string): GistFile | null {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }
    return this.gistFiles.find((file) => file.name === fileName) ?? null;
  }

  /**
   * [Side Effect] Initializes the Gist. If the gist doesn't exist, it creates it, else, it
   * will just fetch the metadata of the Gist
   *
   * > Should only be invoked once in the beginning
   */
  async initialize(): Promise<void> {
    if (this.gistMetadata !== null) {
      throw new Error('Gist is already initialized');
    }

    // Throws error if the token is not valid
    await verifyGithubPAT(this.options.personalAccessToken);

    // Fetches the metadata of the gist matching the
    const fetchedGistMetadata = await fetchGistMetadata({
      personalAccessToken: this.options.personalAccessToken,
      appIdentifier: this.options.appIdentifier,
    });

    // Gist doesn't exist. So, create one
    if (fetchedGistMetadata === null) {
      this.gistMetadata = await createGist({
        isGistPublic: this.options.isPublic,
        personalAccessToken: this.options.personalAccessToken,
        appIdentifier: this.options.appIdentifier,
      });
    } else {
      this.gistMetadata = fetchedGistMetadata;
    }

    this.gistFiles = await fetchAllGistFiles({
      corsConfig: this.corsConfig(),
      enableRequestCaching: this.getEnableRequestCaching(),
      isGistPublic: this.isGistPublic(),
      personalAccessToken: this.options.personalAccessToken,
      gistMetadata: this.gistMetadata,
    });
  }

  private getEnableRequestCaching(): boolean {
    return this.options.enableRequestCaching ?? true;
  }

  private corsConfig(): CORSConfig {
    return this.options.corsConfig ?? { type: 'default' };
  }

  private isGistPublic(): boolean {
    return this.options.isPublic ?? false;
  }
}
