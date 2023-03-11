import axios from 'axios';
import { IGithubGistMetadata } from '../types';
import { withAuthConfig } from './withAuthConfig';
import { constants } from '../constants';

const createRandomParam = () => Math.random().toString(16).split('.')[1];

export interface FetchGistMetadataUsingGistIdProps {
  personalAccessToken: string;
  gistId: string;
}

export async function fetchGistMetadata(props: FetchGistMetadataUsingGistIdProps): Promise<IGithubGistMetadata> {
  const { personalAccessToken, gistId } = props;

  const { data: gistsMetadata } = await axios<IGithubGistMetadata>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: 'get',
        url: `${constants.urls.github.gists}/${gistId}`,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        params: {
          // We add this to the url so that we don't get served the same content due to cache
          dummyParam: createRandomParam(),
        },
      },
    })
  );

  return gistsMetadata;
}
