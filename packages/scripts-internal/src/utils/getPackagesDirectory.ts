import { getProjectRoot } from './getProjectRoot';

/**
 * Returns the "packages/" directory path
 */
export function getPackagesDirectory() {
  return `${getProjectRoot()}/packages`;
}
