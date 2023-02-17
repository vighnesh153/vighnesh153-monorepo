console.log(`
 This script will remove all the private packages from the "packages/" directory before executing "npm publish" 
`);
const fs = require('fs');

function main() {
  const packages = fs.readdirSync('./packages');
  packages.forEach((pkg) => {
    const packageJsonPath = `./packages/${pkg}/package.json`;
    const packageJson = require(packageJsonPath);
    if (packageJson.private) {
      fs.rmdirSync(`./packages/${pkg}`);
      console.log(`Removed ./packages/${pkg} ✅`);
    }
  });

  console.log(`
  Removed private packages to package.json complete ✅
  `);
}

main();
