import axios from 'axios';
import { randomEmail, randomUuid } from '@vighnesh153/fake-data';
import { createGist } from '../createGist';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mockedAxios.mockImplementation(impl);
}

describe('Helpers > "createGist" tests', () => {
  const GITHUB_PERSONAL_ACCESS_TOKEN = randomUuid();
  const APP_IDENTIFIER = randomUuid();

  it('should create the gist and return its metadata', async () => {
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
