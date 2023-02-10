import { AxiosRequestConfig } from 'axios';
import { constants } from '../constants';
import { CORSConfig } from '../types';

export interface BuildLatestGistFileFetchUrlProps {
  commitId: string;
  corsConfig: CORSConfig;
  fileName: string;
  gistId: string;
  gistOwner: string;
}

export function buildGistFileFetchRequestConfigForCommit({
  commitId,
  corsConfig,
  fileName,
  gistId,
  gistOwner,
}: BuildLatestGistFileFetchUrlProps): AxiosRequestConfig {
  const url = `https://gist.githubusercontent.com/${gistOwner}/${gistId}/raw/${commitId}/${fileName}`;

  if (corsConfig.type === 'none') {
    return { url };
  }

  if (corsConfig.type === 'default') {
    return { url: `${constants.urls.corsAnywherePrefix}${url}` };
  }

  if (corsConfig.type === 'custom') {
    return corsConfig.customRequestConfig(url);
  }

  throw new Error('Unrecognized CORS configuration type');
}
