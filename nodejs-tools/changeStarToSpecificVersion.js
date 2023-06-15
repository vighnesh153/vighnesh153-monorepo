console.log(`
  This script will change the "*" version to "x.x.x" version format.
  
  This is needed because the packages/* libraries are tightly paired to other packages/* libraries
  and any incompatible library versions could break the application
`);

import fs from 'node:fs';
import path from 'node:path';

const packagesDir = path.resolve(".", "nodejs-pacakges");
const packageJsonFileName = "package.json";
const versionTrackerPackageDirName = "version-tracker";

function readJsonFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8').toString();
  return JSON.parse(fileContent);
}

function writeJsonToFile(filePath, content) {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

function getPackageVersion() {
  const versionTrackerPackageJson = path.resolve(packagesDir, versionTrackerPackageDirName, packageJsonFileName)
  const packageJson = readJsonFile(versionTrackerPackageJson);
  return packageJson.version;
}

function getAllLocalPackages() {
  const packageContainers = fs.readdirSync(packagesDir);
  return packageContainers.map((packageContainer) => {
    const packageJsonPath = path.resolve(packagesDir, packageContainer, packageJsonFileName)
    const packageJson = readJsonFile(packageJsonPath);
    return packageJson.name;
  });
}

function updateLocalPackageVersionsToExact(localPackageNames, latestPackageVersion) {
  const packageContainers = fs.readdirSync(packagesDir);
  packageContainers.forEach((packageContainer) => {
    const packageJsonPath = path.resolve(packagesDir, packageContainer, packageJsonFileName)
    const packageJson = readJsonFile(packageJsonPath);
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
