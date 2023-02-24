import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { randomEmail, randomUuid } from '@vighnesh153/fake-data';
import { fetchLatestContent } from '../fetchLatestContent';

vi.mock('axios');

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios.mockImplementation(impl);
}

describe('Helpers > "fetchLatestContent" tests', () => {
  it('should fetch the latest content', async () => {
    const content = randomUuid();
    mockAxiosImplementation(() => Promise.resolve({ data: content }));

    const latestContent = await fetchLatestContent({
      latestCommitId: randomUuid(),
      gistId: randomUuid(),
      gistOwner: randomEmail(),
      corsConfig: { type: 'default' },
      fileName: randomUuid(),
      personalAccessToken: randomUuid(),
    });

    expect(latestContent).toBe(content);
  });
});
