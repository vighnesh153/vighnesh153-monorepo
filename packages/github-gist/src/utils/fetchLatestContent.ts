import axios from 'axios';
import { withAuthConfig } from './withAuthConfig';
import { buildGistFileFetchRequestConfigForCommit } from './buildGistFileFetchRequestConfigForCommit';
import { CORSConfig } from '../types';

export interface FetchLatestContentProps {
  personalAccessToken: string;
  fileName: string;
  gistId: string;
  gistOwner: string;
  corsConfig: CORSConfig;
  latestCommitId: string;
}

export async function fetchLatestContent(props: FetchLatestContentProps): Promise<unknown> {
  const { personalAccessToken, fileName, gistId, gistOwner, corsConfig, latestCommitId } = props;
  const { data } = await axios<string>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        ...buildGistFileFetchRequestConfigForCommit({
          fileName,
          gistId,
          gistOwner,
          corsConfig,
          commitId: latestCommitId,
        }),
        method: 'get',
      },
    })
  );
  return data ?? '';
}
