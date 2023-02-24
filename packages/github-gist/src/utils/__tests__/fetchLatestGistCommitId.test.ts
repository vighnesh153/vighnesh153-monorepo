import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { randomUuid } from '@vighnesh153/fake-data';
import { fetchLatestGistCommitId } from '../fetchLatestGistCommitId';

vi.mock('axios');

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios.mockImplementation(impl);
}

describe('Helpers > "fetchLatestGistCommitId" tests', () => {
  const GITHUB_PERSONAL_ACCESS_TOKEN = randomUuid();
  const GIST_ID = randomUuid();

  it('should fetch the latest commit id', async () => {
    mockAxiosImplementation(() =>
      Promise.resolve({
        data: {
          history: [
            { version: '6' },
            { version: '5' },
            { version: '4' },
            { version: '3' },
            { version: '2' },
            { version: '1' },
          ],
        },
      })
    );

    const latestCommit = await fetchLatestGistCommitId({
      gistId: GIST_ID,
      personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
    });
    expect(latestCommit).toEqual('6');
  });
});
