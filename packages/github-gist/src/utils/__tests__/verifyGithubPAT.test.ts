import axios from 'axios';
import { verifyGithubPAT } from '../verifyGithubPAT';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mockedAxios.mockImplementation(impl);
}

describe('"verifyGithubPAT" function tests', () => {
  const GITHUB_PERSONAL_ACCESS_TOKEN = 'my-github-access-token';

  it('should throw error if API returns 4xx', async () => {
    mockAxiosImplementation(() => Promise.reject(new Error('Unauthorized')));

    await expect(verifyGithubPAT(GITHUB_PERSONAL_ACCESS_TOKEN)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Token is invalid."`
    );
  });

  it(`should throw error if token doesn't have "gist" oauth scope`, async () => {
    mockAxiosImplementation(() => {
      const resolveValue = {
        headers: {
          'x-oauth-scopes': '',
        },
      };
      return Promise.resolve(resolveValue);
    });

    await expect(verifyGithubPAT(GITHUB_PERSONAL_ACCESS_TOKEN)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Token doesn't have gist access."`
    );
  });

  it(`should not throw error if token is valid and has "gist" oauth scope`, async () => {
    mockAxiosImplementation(() => {
      const resolveValue = {
        headers: {
          'x-oauth-scopes': 'gist',
        },
      };
      return Promise.resolve(resolveValue);
    });

    await expect(verifyGithubPAT(GITHUB_PERSONAL_ACCESS_TOKEN)).resolves.not.toThrow();
  });
});
