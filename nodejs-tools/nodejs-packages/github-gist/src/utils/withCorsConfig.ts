import { AxiosRequestConfig } from 'axios';
import { CORSConfig } from '../types';
import { constants } from '../constants';

export interface WithCorsConfigOptions {
  url: string;
  corsConfig: CORSConfig;
}

export function withCorsConfig(options: WithCorsConfigOptions): AxiosRequestConfig {
  const { url, corsConfig } = options;

  if (corsConfig.type === 'none') {
    return { url };
  }

  if (corsConfig.type === 'default') {
    return { url: `${constants.urls.corsAnywherePrefix}${url}` };
  }

  if (corsConfig.type === 'custom') {
    return corsConfig.customRequestConfig(url);
  }

  throw new Error('Unrecognized CORS configuration type');
}
