console.log(`
  This script updates the version of all the packages that match "packages/*"
`);

const fs = require('fs');

const newVersion = (process.argv[2] ?? '').toString().trim();

if (!newVersion || newVersion === 'ignore') {
  process.exit(0);
}

function main() {
  console.log(`New version: ${newVersion}`);
  const packages = fs.readdirSync('./packages');
  packages.forEach((pkg) => {
    const packageJsonPath = `./packages/${pkg}/package.json`;
    const packageJson = require(packageJsonPath);
    const oldVersion = packageJson.version;
    packageJson.version = newVersion;
    console.log(`Package: ${pkg}, Old version: ${oldVersion}, New version: ${newVersion}`);
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  });
}

main();
