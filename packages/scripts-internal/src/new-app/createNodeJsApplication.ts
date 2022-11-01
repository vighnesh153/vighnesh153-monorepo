import { createNodeJsPackage } from '../utils';

/**
 * Creates an empty node-js application in the apps/ directory
 */
export async function createNodeJsApplication(directoryName: string, packageName: string) {
  await createNodeJsPackage(directoryName, packageName);
}
