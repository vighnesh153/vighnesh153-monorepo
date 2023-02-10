import axios from 'axios';
import { IGithubGistMetadata } from '../types';
import { constants } from '../constants';
import { withAuthConfig } from './withAuthConfig';
import { generateGithubGistIdentifier } from './generateGithubGistIdentifier';

export interface FetchGistMetadataProps {
  personalAccessToken: string;
  appIdentifier: string;
}

/**
 * Fetches the metadata of the gist which has one of the files named `gistIdentifyingFileName`
 *
 * @todo Optimize this, if possible
 */
export async function fetchGistMetadata(props: FetchGistMetadataProps): Promise<IGithubGistMetadata | null> {
  const { personalAccessToken, appIdentifier } = props;
  // Fetches metadata of all the gists belonging to this PAT
  const { data: gistsMetadata } = await axios<IGithubGistMetadata[]>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: 'get',
        url: constants.urls.github.gists,
      },
    })
  );

  const identifyingFileName = generateGithubGistIdentifier(appIdentifier);
  return (
    gistsMetadata.find((gistMetadata) => {
      const gistFilesNames = Object.keys(gistMetadata.files);
      return gistFilesNames.includes(identifyingFileName);
    }) ?? null
  );
}
