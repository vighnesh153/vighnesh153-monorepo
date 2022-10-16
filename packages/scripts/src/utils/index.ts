import path from "path";
import fs from "node:fs/promises";
import Spinnies from "spinnies";

/**
 * Returns the Logger
 */
export * from "./logger";

/**
 * Returns the inquirer instance
 */
export { default as getInquirer } from "./getInquirer";

/**
 * Reads the file
 */
export async function readFile(filePath: string) {
  const file = await fs.readFile(filePath);
  return file.toString("utf-8");
}

/**
 * Writes in the file
 */
export async function writeFile(filePath: string, fileContent: string) {
  await fs.writeFile(filePath, fileContent);
}

/**
 * Checks whether the file exists
 */
export async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return false;
    } else {
      throw err;
    }
  }
}

/**
 * Creates the directory
 */
export async function createDirectory(directory: string) {
  return fs.mkdir(directory);
}

/**
 * Generates a new random number
 */
export function generateRandomNumber() {
  return Math.floor(Math.random() * 1000000);
}

/**
 * Returns the projectRoot directory
 */
export function getProjectRoot() {
  return process.cwd();
}

/**
 * Returns the "apps/" directory path
 */
export function getAppsDirectory() {
  return `${getProjectRoot()}/apps`;
}

/**
 * Returns the "packages/" directory path
 */
export function getPackagesDirectory() {
  return `${getProjectRoot()}/packages`;
}

/**
 * Returns the "vendor/" directory path
 */
export function getVendorDirectory() {
  return `${getProjectRoot()}/vendor`;
}

/**
 * Adds a delay
 */
export async function delay(ms: number = 2000) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Returns the instance of spinnies
 */
export const spinnies = new Spinnies();

/**
 * Create the README.md file
 */
export async function createReadmeFile(parentDirectory: string, packageName: string) {
  const fileName = path.resolve(parentDirectory, "README.md");

  spinnies.add("create README.md", {
    text: "🚧 Creating README.md file...\n"
  });
  await delay()

  // create the file
  await writeFile(fileName, `# ${packageName}`);

  spinnies.succeed("create README.md", {
    text: "✅ Created README.md file 🎉\n"
  });
}