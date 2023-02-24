import { describe, it, vi, afterEach } from 'vitest';
import axios from 'axios';
import { randomEmail, randomUuid } from '@vighnesh153/fake-data';
import { createGist } from '../createGist';

vi.mock('axios');

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios.mockImplementation(impl);
}

describe('Helpers > "createGist" tests', () => {
  const GITHUB_PERSONAL_ACCESS_TOKEN = randomUuid();
  const APP_IDENTIFIER = randomUuid();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create the gist and return its metadata', async ({ expect }) => {
    const expectedGistMetadata = {
      id: randomUuid(),
      owner: { login: randomEmail() },
      files: {
        [randomUuid()]: {
          filename: randomUuid(),
        },
      },
    };

    mockAxiosImplementation(() =>
      Promise.resolve({
        data: expectedGistMetadata,
      })
    );

    const gistMetadata = await createGist({
      appIdentifier: APP_IDENTIFIER,
      personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
    });

    expect(gistMetadata).toStrictEqual(expectedGistMetadata);
  });
});
