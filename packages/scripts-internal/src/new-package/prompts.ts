import { PackageType } from './packageTypes';
import { generateRandomNumber, getInquirer } from '../utils';
import { ProjectType } from './projectTypes';

/**
 * Get user inputs from console prompt
 */
export async function promptUserForInputs(): Promise<{
  packageType: string;
  directoryName: string;
  packageName: string;
  projectType: string;
}> {
  const packageType = await promptForPackageType();
  const directoryName = await promptForDirectoryName();
  const packageName = await promptForPackageName(directoryName);
  const projectType = await promptForProjectType();

  return { packageType, directoryName, packageName, projectType };
}

/**
 * Prompts the user for getting the PackageType
 */
async function promptForPackageType(): Promise<string> {
  const inquirer = await getInquirer();
  const { packageType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageType',
      message: 'What type of package do you want to create?',
      choices: Object.values(PackageType),
      default: PackageType.Internal,
    },
  ]);
  return packageType;
}

/**
 * Prompts the user to get the directoryName
 */
async function promptForDirectoryName(): Promise<string> {
  const inquirer = await getInquirer();
  const { directoryName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'directoryName',
      message: 'Enter the name of the directory',
      default: `new-package-${generateRandomNumber()}`,
    },
  ]);
  return directoryName;
}

/**
 * Prompts the user to get the packageName
 */
async function promptForPackageName(directoryName: string): Promise<string> {
  const inquirer = await getInquirer();
  const { packageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'packageName',
      message: 'Enter the package name',
      default: `@vighnesh153/package-${directoryName}`,
    },
  ]);
  return packageName;
}

/**
 * Prompts the user to get the projectType
 */
async function promptForProjectType(): Promise<string> {
  const inquirer = await getInquirer();
  const { projectType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'What type of project do you want to create?',
      choices: Object.values(ProjectType),
      default: ProjectType.Typescript,
    },
  ]);
  return projectType;
}
