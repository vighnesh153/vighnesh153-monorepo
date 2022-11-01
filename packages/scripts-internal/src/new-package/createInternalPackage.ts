import { createNodeJsPackage, getPackagesDirectory, Logger } from '../utils';
import * as path from 'path';
import { ProjectType } from './projectTypes';
import { createInternalTypescriptPackage } from './createInternalTypescriptPackage';
import { createInternalReactTypescriptPackage } from './createInternalReactTsPackage';

/**
 * Creates an internal package in the packages/ directory
 */
export async function createInternalPackage(directoryName: string, packageName: string, projectType: string) {
  Logger.info(`Creating a ${projectType} internal package...`);

  const directoryPath = path.resolve(getPackagesDirectory(), `${directoryName}-internal`);

  // Create an empty nodejs package
  await createNodeJsPackage(directoryPath, packageName);

  // Create the package
  ({
    [ProjectType.Typescript]: createInternalTypescriptPackage,
    [ProjectType.ReactTypescript]: createInternalReactTypescriptPackage,
  }[projectType]?.(directoryPath));
}
