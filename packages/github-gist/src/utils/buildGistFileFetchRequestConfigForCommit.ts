import { AxiosRequestConfig } from 'axios';
import { CORSConfig } from '../types';
import { withCorsConfig } from './withCorsConfig';

export interface BuildLatestGistFileFetchUrlProps {
  commitId: string;
  corsConfig: CORSConfig;
  fileName: string;
  gistId: string;
  gistOwner: string;
}

export function buildGistFileFetchRequestConfigForCommit(props: BuildLatestGistFileFetchUrlProps): AxiosRequestConfig {
  const { commitId, corsConfig, fileName, gistId, gistOwner } = props;
  const url = `https://gist.githubusercontent.com/${gistOwner}/${gistId}/raw/${commitId}/${fileName}`;
  return withCorsConfig({ url, corsConfig });
}
