import {
  alphabeticallyOrder,
  createDirectory,
  createEslintConfigFile,
  createLintStagedConfigFile,
  createNodeJsPackage,
  createSpinner,
  createTsConfigFile,
  delay,
  getPackagesDirectory,
  Logger,
  readFile,
  writeFile,
} from '../utils';
import * as path from 'path';

/**
 * Creates an internal package in the packages/ directory
 */
export async function createInternalPackage(directoryName: string, packageName: string, projectType: string) {
  Logger.info(`Creating a ${projectType} internal package...`);

  const directoryPath = path.resolve(getPackagesDirectory(), `${directoryName}-internal`);

  // Create an empty nodejs package
  await createNodeJsPackage(directoryPath, packageName);

  await Promise.all([
    // Create the tsconfig.json file
    createTsConfigFile(directoryPath, 'base'),

    // Create the .lintstagedrc.js file
    createLintStagedConfigFile(directoryPath),

    // Creates the eslint config file
    createEslintConfigFile(directoryPath, 'ts-base'),

    // Create the "src/index.ts" file
    createSrcDirAndIndexFile(directoryPath),

    // Update package.json
    updatePackageDotJson(directoryPath),
  ]);
}

/**
 * Creates the "src/index.ts" file
 * @param directoryPath
 */
async function createSrcDirAndIndexFile(directoryPath: string) {
  const srcDirectoryPath = path.resolve(directoryPath, 'src');
  const indexFilePath = path.resolve(srcDirectoryPath, 'index.ts');

  const spinner = createSpinner({
    text: '🚧 Creating "src/index.ts" file...',
  });
  await delay();

  await createDirectory(srcDirectoryPath);
  await writeFile(
    indexFilePath,
    `
console.log('Vighnesh is awesome!');
  `.trim()
  );

  spinner.succeed({
    text: '✅ Created "src/index.ts" file 🎉',
  });
}

/**
 * Adds typescript package specifics to the package.json
 */
async function updatePackageDotJson(directoryPath: string) {
  const packageJsonPath = path.resolve(directoryPath, 'package.json');

  const spinner = createSpinner({
    text: '🚧 Updating package.json...',
  });
  await delay();

  // package.json file
  const packageJson = JSON.parse(await readFile(packageJsonPath));

  // Update the content
  Object.assign(packageJson, {
    main: './src/index.ts',
    types: './src/index.ts',
    dependencies: alphabeticallyOrder({
      ...packageJson.dependencies,
    }),
    devDependencies: alphabeticallyOrder({
      ...packageJson.devDependencies,
      '@vighnesh153/dependencies-typescript': '*',
    }),
  });

  // write back to the package.json file
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  spinner.succeed({
    text: '✅ Updated package.json 🎉',
  });
}
