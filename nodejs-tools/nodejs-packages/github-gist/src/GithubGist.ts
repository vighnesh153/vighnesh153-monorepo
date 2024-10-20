import {
  fetchGistMetadata,
  getCorsConfig,
  getEnableRequestCaching,
  isGistPublic,
  removeFileContentFromGistMetadata,
  verifyGithubPAT,
} from "./utils/index.ts";
import { IGithubGistMetadata, IGithubGistProps } from "./types/index.ts";
import { GistFile } from "./GithubGistFile.ts";
import { saveGithubGist } from "./saveGithubGist.ts";

function gistNotInitializedError() {
  return new Error(
    `Gist is not initialized. Initialize the gist by invoking the "initialize()" method first`,
  );
}

function buildGistFilesFromGistMetadataFiles(
  gistMetadata: IGithubGistMetadata,
  options: IGithubGistProps,
): GistFile[] {
  const cleanedGistMetadata = removeFileContentFromGistMetadata(gistMetadata);

  return Object.values(gistMetadata.files).map(
    (file) =>
      new GistFile({
        corsConfig: getCorsConfig(options),
        gistMetadata: cleanedGistMetadata,
        isPublic: isGistPublic(options),
        personalAccessToken: options.personalAccessToken,
        enableRequestCaching: getEnableRequestCaching(options),
        fileContent: file.content,
        fileName: file.filename,
        hasUnSyncedUpdates: false,
      }),
  );
}

export class GithubGist {
  private static avoidInstantiation = true;

  private gistMetadata: IGithubGistMetadata | null = null;

  private gistFiles: GistFile[] = [];

  /**
   * @param options
   * @deprecated Use the `GithubGist.initializeUsingGistId` static method instead
   */
  private constructor(private options: IGithubGistProps) {
    if (GithubGist.avoidInstantiation) {
      throw new Error(
        `Public instantiation is not supported. Do "await GithubGist.initializeUsingGistId(...)" instead`,
      );
    }
  }

  /**
   * Returns all the files from the Gist
   */
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

  /**
   * Initializes the gist object with the metadata from server and all file content
   * @param options
   */
  static async initializeUsingGistId(
    options: IGithubGistProps,
  ): Promise<GithubGist> {
    const { personalAccessToken, gistId } = options;

    // Throws error if the token is not valid
    await verifyGithubPAT(personalAccessToken);

    // Create the Gist instance
    GithubGist.avoidInstantiation = false;
    const gist = new GithubGist(options);
    GithubGist.avoidInstantiation = true;

    // Waits to fetch the gist metadata
    const gistMetadata = await fetchGistMetadata({
      personalAccessToken,
      gistId,
      corsConfig: getCorsConfig(options),
    });

    // File content will be stored in `gistFiles`. Remove it from here to avoid bloat.
    gist.gistMetadata = removeFileContentFromGistMetadata(gistMetadata);

    // Grab the file content and initialize the `GistFiles`
    gist.gistFiles = buildGistFilesFromGistMetadataFiles(gistMetadata, options);
    return gist;
  }

  /**
   * Fetches the latest content of all the files in the gist
   */
  async fetchLatestContent(): Promise<void> {
    const { personalAccessToken, gistId } = this.options;
    const gistMetadata = await fetchGistMetadata({
      personalAccessToken,
      gistId,
      corsConfig: getCorsConfig(this.options),
    });
    this.gistFiles = buildGistFilesFromGistMetadataFiles(
      gistMetadata,
      this.options,
    );
  }

  /**
   * Creates a new file and returns it
   *
   * > It doesn't save the file on the Gist. You have to manually invoke
   * the "save" method
   *
   * @param fileName
   */
  createNewFile(fileName: string): GistFile {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }

    const existingFile = this.getFileByName(fileName);
    if (existingFile !== null) {
      return existingFile;
    }

    const gistFile = new GistFile({
      corsConfig: getCorsConfig(this.options),
      enableRequestCaching: getEnableRequestCaching(this.options),
      isPublic: isGistPublic(this.options),
      fileName,
      fileContent: "",
      personalAccessToken: this.options.personalAccessToken,
      gistMetadata: this.gistMetadata,
    });
    this.gistFiles.push(gistFile);
    return gistFile;
  }

  /**
   * Saves only modified files as the latest commit
   */
  async save(): Promise<void> {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }

    await saveGithubGist({
      gistId: this.gistMetadata.id,
      gistFiles: this.gistFiles,
      isGistPublic: isGistPublic(this.options),
      personalAccessToken: this.options.personalAccessToken,
      corsConfig: getCorsConfig(this.options),
    });

    this.gistFiles.forEach((gistFile) => {
      // eslint-disable-next-line no-param-reassign
      gistFile.hasUnSyncedUpdates = false;
    });
  }

  /**
   * Returns the file from Gist, if it exists, else, returns null
   * @param fileName
   */
  getFileByName(fileName: string): GistFile | null {
    if (this.gistMetadata === null) {
      throw gistNotInitializedError();
    }
    return this.gistFiles.find((file) => file.name === fileName) ?? null;
  }
}
