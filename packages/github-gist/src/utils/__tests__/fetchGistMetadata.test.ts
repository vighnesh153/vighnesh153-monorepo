import { describe, it, vi } from 'vitest';
import axios from 'axios';
import { randomEmail, randomUuid } from '@vighnesh153/fake-data';
// import { fetchGistMetadata } from '../fetchGistMetadata';

vi.mock('axios');

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios.mockImplementation(impl);
}

describe('Helpers > "fetchGistMetadata" tests', () => {
  // const GITHUB_PERSONAL_ACCESS_TOKEN = randomUuid();

  it('should return null if no gist found which has the appIdentifier file', async () => {
    mockAxiosImplementation(() => Promise.resolve({ data: [] }));

    // const metadata = await fetchGistMetadata({
    //   personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
    //   gistId: randomUuid(),
    // });
    // expect(metadata).toBeNull();
  });

  it('should return the gist metadata based on the identifier provided', async () => {
    const gistId = randomUuid();
    const ownerLogin = randomEmail();

    mockAxiosImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: randomUuid(),
            owner: { login: randomEmail() },
            files: { [randomUuid()]: {}, [randomUuid()]: {}, [randomUuid()]: {} },
          },
          {
            id: gistId,
            owner: { login: ownerLogin },
            files: {
              [randomUuid()]: {},
              [randomUuid()]: {},
              [randomUuid()]: {},
            },
          },
          {
            id: randomUuid(),
            owner: { login: randomEmail() },
            files: { [randomUuid()]: {}, [randomUuid()]: {}, [randomUuid()]: {} },
          },
        ],
      })
    );

    // const metadata = await fetchGistMetadata({
    //   personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
    //   gistId,
    // });
    // expect(metadata).toMatchObject({
    //   id: gistId,
    //   owner: { login: ownerLogin },
    // });
  });
});
