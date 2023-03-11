import axios from 'axios';
import { CORSConfig, IGithubGistMetadata } from '../types';
import { withAuthConfig } from './withAuthConfig';
import { constants } from '../constants';
import { withCorsConfig } from './withCorsConfig';

const createRandomParam = () => Math.random().toString(16).split('.')[1];

export interface FetchGistMetadataUsingGistIdProps {
  personalAccessToken: string;
  gistId: string;
  corsConfig: CORSConfig;
}

export async function fetchGistMetadata(props: FetchGistMetadataUsingGistIdProps): Promise<IGithubGistMetadata> {
  const { personalAccessToken, gistId, corsConfig } = props;
  const url = `${constants.urls.github.gists}/${gistId}`;

  const axiosRequestConfig = withCorsConfig({ url, corsConfig });

  const { data: gistsMetadata } = await axios<IGithubGistMetadata>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: 'get',
        ...axiosRequestConfig,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          ...axiosRequestConfig.headers,
        },
        params: {
          // We add this to the url so that we don't get served the same content due to cache
          dummyParam: createRandomParam(),
          ...axiosRequestConfig.params,
        },
      },
    })
  );

  return gistsMetadata;
}
