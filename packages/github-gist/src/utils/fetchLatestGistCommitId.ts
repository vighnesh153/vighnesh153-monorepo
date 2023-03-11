import axios from 'axios';
import { constants } from '../constants';
import { withAuthConfig } from './withAuthConfig';

const createRandomParam = () => Math.random().toString(16).split('.')[1];

export interface FetchLatestGistCommitProps {
  gistId: string;
  personalAccessToken: string;
}

export async function fetchLatestGistCommitId(props: FetchLatestGistCommitProps): Promise<string> {
  const { gistId, personalAccessToken } = props;
  const {
    data: [latestCommit],
  } = await axios<Array<{ version: string }>>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: 'get',
        url: `${constants.urls.github.gists}/${gistId}/commits`,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        params: {
          page: 1,
          per_page: 1,
          // We add this to the url so that we don't get served the same content due to cache
          dummyParam: createRandomParam(),
        },
      },
    })
  );
  return latestCommit.version;
}
