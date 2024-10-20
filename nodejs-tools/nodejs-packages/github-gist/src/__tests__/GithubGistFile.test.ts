import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { randomEmail, randomUuid } from '@vighnesh153/tools';
import { GistFile, GistFileProps } from '../GithubGistFile.ts';

vi.mock('axios');

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios.mockImplementation(impl);
}

function createGistFile(options: Partial<GistFileProps> = {}): GistFile {
  return new GistFile({
    personalAccessToken: randomUuid(),
    fileContent: '',
    fileName: randomUuid(),
    enableRequestCaching: true,
    isPublic: false,
    ...options,
    corsConfig: { type: 'default', ...options.corsConfig },
    gistMetadata: {
      id: randomUuid(),
      files: {},
      ...options.gistMetadata,
      owner: { login: randomEmail(), ...options.gistMetadata?.owner },
    },
  });
}

describe('GithubGistFile tests', () => {
  it('should return the name of the file', () => {
    const fileName = randomUuid();
    const gistFile = createGistFile({ fileName });

    expect(gistFile.name).toBe(fileName);
  });

  it('should return the content', () => {
    const fileContent = randomUuid();
    const gistFile = createGistFile({ fileContent });

    expect(gistFile.content).toBe(fileContent);
  });

  it('should set the content and mark the file as dirty', () => {
    const fileContent = randomUuid();
    const gistFile = createGistFile();

    gistFile.hasUnSyncedUpdates = false;
    gistFile.content = fileContent;

    expect(gistFile.content).toBe(fileContent);
    expect(gistFile.hasUnSyncedUpdates).toBe(true);
  });

  it('should not initiate the POST request if there are no changes', async () => {
    mockAxiosImplementation(() => Promise.reject(new Error('This should not have invoked')));

    const gistFile = createGistFile();
    gistFile.hasUnSyncedUpdates = false;

    // This should not throw the above error
    await gistFile.save();
  });

  it('should save the content and mark the file as not dirty', async () => {
    mockAxiosImplementation(() => Promise.resolve({}));

    const fileContent = randomUuid();
    const gistFile = createGistFile();

    gistFile.content = fileContent;

    expect(gistFile.hasUnSyncedUpdates).toBe(true);

    await gistFile.save();

    expect(gistFile.hasUnSyncedUpdates).toBe(false);
  });
});
