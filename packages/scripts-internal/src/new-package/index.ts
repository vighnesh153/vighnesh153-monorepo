import { PackageType } from './packageTypes';
import { promptUserForInputs } from './prompts';
import { runNpmInstall } from '../utils';
import { createInternalPackage } from './createInternalPackage';
import { createExternalPackage } from './createExternalPackage';

async function main() {
  console.log('Preparing creation of a new package in `packages/` directory');

  const { packageType, directoryName, packageName, projectType } = await promptUserForInputs();

  // Creates the package
  await {
    [PackageType.Internal]: createInternalPackage,
    [PackageType.External]: createExternalPackage,
  }[packageType](directoryName, packageName, projectType);

  // index the package and install dependencies, if any
  await runNpmInstall(packageName);
}

export default async function createNewPackage() {
  main().catch((e) => {
    console.log('\x1b[31m', '\nAn error occurred when creating your package');
    console.log('\x1b[31m', e);
  });
}
