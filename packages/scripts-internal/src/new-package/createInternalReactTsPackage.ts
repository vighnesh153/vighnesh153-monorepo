import {
  alphabeticallyOrder,
  createDirectory,
  createEslintConfigFile,
  createLintStagedConfigFile,
  createSpinner,
  createTsConfigFile,
  delay,
  readFile,
  writeFile,
} from '../utils';
import path from 'path';

/**
 * Creates a basic react-typescript package
 */
export async function createInternalReactTypescriptPackage(directoryPath: string) {
  const spinner = createSpinner({
    text: '🚧 Updating basic react-typescript package...',
  });
  await delay();

  // basic react-typescript package stuff
  await Promise.all([
    // Create the tsconfig.json file
    createTsConfigFile(directoryPath, 'base'),

    // Create the .lintstagedrc.js file
    createLintStagedConfigFile(directoryPath),

    // Creates the eslint config file
    createEslintConfigFile(directoryPath, 'ts-base'),

    // Create the "src/index.tsx" file
    createSrcDirAndIndexFile(directoryPath),

    // Update package.json
    updatePackageDotJson(directoryPath),
  ]);

  spinner.succeed({
    text: '✅ Updated basic react-typescript package 🎉',
  });
}

/**
 * Creates the "src/index.tsx" file
 * @param directoryPath
 */
async function createSrcDirAndIndexFile(directoryPath: string) {
  const srcDirectoryPath = path.resolve(directoryPath, 'src');
  const indexFilePath = path.resolve(srcDirectoryPath, 'index.tsx');

  const spinner = createSpinner({
    text: '🚧 Creating "src/index.tsx" file...',
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
    text: '✅ Created "src/index.tsx" file 🎉',
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
    main: './src/index.tsx',
    types: './src/index.tsx',
    peerDependencies: {
      react: '>=16.8.0',
      'react-dom': '>=16.8.0',
    },
    dependencies: alphabeticallyOrder({
      ...packageJson.dependencies,
      '@vighnesh153/dependencies-react-lib': '*',
    }),
    devDependencies: alphabeticallyOrder({
      ...packageJson.devDependencies,
      '@vighnesh153/dependencies-react-lib-dev': '*',
    }),
  });

  // write back to the package.json file
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  spinner.succeed({
    text: '✅ Updated package.json 🎉',
  });
}
