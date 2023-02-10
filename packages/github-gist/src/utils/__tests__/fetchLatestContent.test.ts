import axios from 'axios';
import { randomEmail, randomUuid } from '@vighnesh153/fake-data';
import { fetchLatestContent } from '../fetchLatestContent';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mockedAxios.mockImplementation(impl);
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
