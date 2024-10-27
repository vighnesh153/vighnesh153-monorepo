import { CORSConfig } from "./CORSConfig.ts";

export interface IGithubGistProps {
  /**
   * Head over to [create personal access token](https://github.com/settings/tokens/new?scopes=gist) to create
   * your personalAccessToken. Make sure that the `gist` scope is checked. Keep the token, a secret.
   */
  personalAccessToken: string;

  /**
   * ID of your gist. To get the ID,
   *  * you need to create a new gist on [gist.github.com](https://gist.github.com)
   *  * open the newly created gist
   *  * copy the ID from the URL
   */
  gistId: string;

  /**
   * Since commit hashes are unique and whenever a file changes, we can be sure that the new SHA
   * will be different from the previously encountered ones. This option can be used to cache the
   * content for all unique SHAs
   *
   * @default true
   */
  enableRequestCaching?: boolean;

  /**
   * Whether the gist should be private or public
   *
   * @default false
   */
  isPublic?: boolean;

  /**
   * CORS configuration. Needed when using the API on the client side.
   *
   * If `type=default`, it will use `https://corsanywhere.herokuapp.com/` as prefix to
   * the GitHub URLs to tackle CORS blocking
   */
  corsConfig?: CORSConfig;
}
