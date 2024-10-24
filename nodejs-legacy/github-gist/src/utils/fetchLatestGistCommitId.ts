import axios from "axios";
import { constants } from "../constants.ts";
import { withAuthConfig } from "./withAuthConfig.ts";
import { CORSConfig } from "../types/index.ts";
import { withCorsConfig } from "./withCorsConfig.ts";

const createRandomParam = () => Math.random().toString(16).split(".")[1];

export interface FetchLatestGistCommitProps {
  gistId: string;
  personalAccessToken: string;
  corsConfig: CORSConfig;
}

export async function fetchLatestGistCommitId(
  props: FetchLatestGistCommitProps,
): Promise<string> {
  const { gistId, personalAccessToken, corsConfig } = props;
  const url = `${constants.urls.github.gists}/${gistId}/commits`;
  const axiosRequestConfig = withCorsConfig({ url, corsConfig });

  const {
    data: [latestCommit],
  } = await axios<Array<{ version: string }>>(
    withAuthConfig({
      personalAccessToken,
      baseConfig: {
        method: "get",
        ...axiosRequestConfig,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          ...axiosRequestConfig.headers,
        },
        params: {
          page: 1,
          per_page: 1,
          // We add this to the url so that we don't get served the same content due to cache
          dummyParam: createRandomParam(),
          ...axiosRequestConfig.params,
        },
      },
    }),
  );
  return latestCommit.version;
}
