import { CORSConfig, IGithubGistProps } from '../types';

export function isGistPublic(options: IGithubGistProps): boolean {
  return options.isPublic ?? false;
}

export function getEnableRequestCaching(options: IGithubGistProps): boolean {
  return options.enableRequestCaching ?? true;
}

export function getCorsConfig(options: Pick<IGithubGistProps, 'corsConfig'>): CORSConfig {
  return options.corsConfig ?? { type: 'default' };
}
