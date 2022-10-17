import { getProjectRoot } from "./getProjectRoot";

/**
 * Returns the "apps/" directory path
 */
export function getAppsDirectory() {
  return `${getProjectRoot()}/apps`;
}
