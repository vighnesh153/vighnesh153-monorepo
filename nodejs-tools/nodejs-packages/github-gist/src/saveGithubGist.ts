import { not } from '@vighnesh153/tools-platform-independent';
import axios from 'axios';
import { withAuthConfig } from './utils';
import { constants } from './constants';
import { GistFile } from './GithubGistFile';
import { CORSConfig } from './types';
import { withCorsConfig } from './utils/withCorsConfig';

function constructPayload(gistFiles: GistFile[]): Record<string, { content: string }> {
  const payload: Record<string, { content: string }> = {};
  gistFiles.forEach((gistFile) => {
    if (not(gistFile.hasUnSyncedUpdates)) return;
    payload[gistFile.name] = {
      content: gistFile.content,
    };
  });
  return payload;
}

export interface SaveGithubGistOptions {
  gistFiles: GistFile[];
  isGistPublic: boolean;
  personalAccessToken: string;
  gistId: string;
  corsConfig: CORSConfig;
}

export async function saveGithubGist(options: SaveGithubGistOptions): Promise<void> {
  const { gistFiles, isGistPublic, personalAccessToken, gistId, corsConfig } = options;
  const url = `${constants.urls.github.gists}/${gistId}`;

  const payload = constructPayload(gistFiles);
  const axiosRequestConfig = withCorsConfig({ url, corsConfig });

  // No files need updates. Hence, the payload is empty
  if (Object.keys(payload).length === 0) return;

  await axios(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: 'patch',
        ...axiosRequestConfig,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          ...axiosRequestConfig.headers,
        },
        data: {
          public: isGistPublic,
          files: payload,
          ...axiosRequestConfig.data,
        },
      },
    })
  );
}
