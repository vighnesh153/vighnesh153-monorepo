import { describe, it, expect, vi } from 'vitest';
import { randomEmail, randomUuid } from '@vighnesh153/fake-data';
import { fetchAllGistFiles } from '../fetchAllGistFiles';

vi.mock('../../GithubGistFile', () => ({
  GistFile: class {
    // eslint-disable-next-line class-methods-use-this
    fetchLatestContent(): Promise<void> {
      return Promise.resolve();
    }
  },
}));

describe('Helpers > "fetchAllGistFiles" tests', () => {
  const GITHUB_PERSONAL_ACCESS_TOKEN = randomUuid();

  it(`should fetch all the gist file's content`, async () => {
    const allGistFiles = await fetchAllGistFiles({
      corsConfig: { type: 'default' },
      enableRequestCaching: true,
      gistMetadata: {
        id: randomUuid(),
        files: {
          [randomUuid()]: {
            filename: randomUuid(),
          },
          [randomUuid()]: {
            filename: randomUuid(),
          },
          [randomUuid()]: {
            filename: randomUuid(),
          },
        },
        owner: {
          login: randomEmail(),
        },
      },
      isGistPublic: false,
      personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
    });

    expect(allGistFiles.length).toEqual(3);
  });
});
