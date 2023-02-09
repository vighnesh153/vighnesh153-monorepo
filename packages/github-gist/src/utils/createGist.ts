import axios from 'axios';
import { constants } from '../constants';
import { generateGithubGistIdentifier } from './generateGithubGistIdentifier';
import { withAuthConfig } from './withAuthConfig';
import { IGithubGistMetadata } from '../types';

export interface CreateGistProps {
  appIdentifier: string;

  isGistPublic?: boolean;

  personalAccessToken: string;
}

export async function createGist({ appIdentifier, isGistPublic = false, personalAccessToken }: CreateGistProps) {
  const identifyingFileContent = constants.identifier.content.replace(constants.identifier.keyword, appIdentifier);
  const fileIdentifier = generateGithubGistIdentifier(appIdentifier);
  const payload = {
    public: isGistPublic,
    files: {
      [fileIdentifier]: {
        content: identifyingFileContent,
      },
    },
  };

  const { data: gistMetadata } = await axios<IGithubGistMetadata>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: 'post',
        url: constants.urls.github.gists,
        data: payload,
      },
    })
  );

  return gistMetadata;
}
