import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { randomEmail, randomUuid } from '@vighnesh153/fake-data';
import { fetchGistMetadata } from '../fetchGistMetadata';
import { IGithubGistMetadata } from '../../types';

vi.mock('axios');

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios.mockImplementation(impl);
}

describe('Helpers > "fetchGistMetadata" tests', () => {
  const getConfig = () =>
    ({
      gistId: randomUuid(),
      corsConfig: { type: 'default' },
      personalAccessToken: randomUuid(),
    } as const);

  it('should throw 404 if gist is not found', () => {
    const error = new Error('Resource not found');
    mockAxiosImplementation(() => Promise.reject(error));

    expect(() => fetchGistMetadata(getConfig())).rejects.toThrowError(error);
  });

  it('should return the gist metadata based on the identifier provided', async () => {
    const gistMetadata: IGithubGistMetadata = {
      id: randomUuid(),
      owner: {
        login: randomEmail(),
      },
      files: {},
    };

    mockAxiosImplementation(() => Promise.resolve({ data: gistMetadata }));

    const fetchedGistMetadata = await fetchGistMetadata({
      ...getConfig(),
      gistId: gistMetadata.id,
    });
    expect(fetchedGistMetadata).toMatchObject(gistMetadata);
  });
});
