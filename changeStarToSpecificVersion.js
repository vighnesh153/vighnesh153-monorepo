console.log(`
  This script will change the "*" version to "x.x.x" version format.
  
  This is needed because the packages/* libraries are tightly paired to other packages/* libraries
  and any incompatible library versions could break the application
`);

import fs from 'fs';

function readJsonFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8').toString();
  return JSON.parse(fileContent);
}

function writeJsonToFile(filePath, content) {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

function getPackageVersion() {
  const packageJson = readJsonFile('./packages/version-tracker/package.json');
  return packageJson.version;
}

function getAllLocalPackages() {
  const packageContainers = fs.readdirSync('./packages');
  return packageContainers.map((packageContainer) => {
    const packageJson = readJsonFile(`./packages/${packageContainer}/package.json`);
    return packageJson.name;
  });
}

function updateLocalPackageVersionsToExact(localPackageNames, latestPackageVersion) {
  const packageContainers = fs.readdirSync('./packages');
  packageContainers.forEach((packageContainer) => {
    const packageJsonPath = `./packages/${packageContainer}/package.json`;
    const packageJson = readJsonFile(`./packages/${packageContainer}/package.json`);
    for (const localPackageName of localPackageNames) {
      if (packageJson.dependencies?.hasOwnProperty(localPackageName)) {
        packageJson.dependencies[localPackageName] = latestPackageVersion;
      }
    }
    writeJsonToFile(packageJsonPath, packageJson);
  });
}

async function main() {
  const latestPackageVersion = getPackageVersion();
  console.log(`Latest package version: ${latestPackageVersion} 🦄`);
  const localPackageNames = getAllLocalPackages();
  console.log(`Local package names:`);
  console.log(localPackageNames);

  updateLocalPackageVersionsToExact(localPackageNames, latestPackageVersion);

  console.log(`\nUpdate complete ✅`);
}

main();
