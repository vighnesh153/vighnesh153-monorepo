import { uiOrigins } from '@/constants/uiOrigins';

export function isProd(): boolean {
  return window.location.origin === uiOrigins.production;
}
