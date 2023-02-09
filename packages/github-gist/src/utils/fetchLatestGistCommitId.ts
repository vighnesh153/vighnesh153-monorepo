import axios from 'axios';
import { constants } from '../constants';
import { withAuthConfig } from './withAuthConfig';

const createRandomParam = () => Math.random().toString(16).split('.')[1];

export interface FetchLatestGistCommitProps {
  gistId: string;
  personalAccessToken: string;
}

export async function fetchLatestGistCommitId({ gistId, personalAccessToken }: FetchLatestGistCommitProps) {
  const {
    data: { history },
  } = await axios<{ history: Array<{ version: string }> }>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: 'get',
        url: `${constants.urls.github.gists}/${gistId}`,
        params: {
          // We add this to the url so that we don't get served the same content due to cache
          dummyParam: createRandomParam(),
        },
      },
    })
  );
  const latestCommit = history[0];
  return latestCommit.version;
}
