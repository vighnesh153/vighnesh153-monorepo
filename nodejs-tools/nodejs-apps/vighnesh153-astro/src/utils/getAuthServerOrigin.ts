import { authServerOrigins } from '@/constants/authConstants';
import { isProd } from './isProd';

export function getAuthServerOrigin(): string {
  if (isProd()) {
    return authServerOrigins.production;
  }
  return authServerOrigins.default;
}
