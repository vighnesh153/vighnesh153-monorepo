import axios from 'axios';
import { withAuthConfig } from './withAuthConfig.ts';
import { buildGistFileFetchRequestConfigForCommit } from './buildGistFileFetchRequestConfigForCommit.ts';
import { CORSConfig } from '../types/index.ts';

export interface FetchLatestContentOfGistFileProps {
  personalAccessToken: string;
  fileName: string;
  gistId: string;
  gistOwner: string;
  corsConfig: CORSConfig;
  latestCommitId: string;
}

export async function fetchLatestContentOfGistFile(props: FetchLatestContentOfGistFileProps): Promise<unknown> {
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
