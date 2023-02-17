console.log(`
  This script overrides the package.json file with the requested override configuration"
`);

const key = 'overrideConfigWhilePublishing';

const fs = require('fs');

function main() {
  const packages = fs.readdirSync('./packages');
  packages.forEach((pkg) => {
    const packageJsonPath = `./packages/${pkg}/package.json`;
    const packageJson = require(packageJsonPath);

    Object.assign(packageJson, packageJson[key] ?? {});

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  });

  console.log(`
  Overrides to package.json complete ✅
`);
}

main();
