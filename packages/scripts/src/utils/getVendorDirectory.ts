import { getProjectRoot } from "./getProjectRoot";

/**
 * Returns the "vendor/" directory path
 */
export function getVendorDirectory() {
  return `${getProjectRoot()}/vendor`;
}
