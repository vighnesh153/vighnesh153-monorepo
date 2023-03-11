import { not } from '@vighnesh153/utils';
import axios from 'axios';
import { withAuthConfig } from './utils';
import { constants } from './constants';
import { GistFile } from './GithubGistFile';

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
}

export async function saveGithubGist(options: SaveGithubGistOptions): Promise<void> {
  const { gistFiles, isGistPublic, personalAccessToken, gistId } = options;

  const payload = constructPayload(gistFiles);

  // No files need updates. Hence, the payload is empty
  if (Object.keys(payload).length === 0) return;

  await axios(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        url: `${constants.urls.github.gists}/${gistId}`,
        method: 'patch',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        data: {
          public: isGistPublic,
          files: payload,
        },
      },
    })
  );
}
