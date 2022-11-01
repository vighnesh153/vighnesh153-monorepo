import { ApplicationType } from './applicationTypes';
import { generateRandomNumber, getInquirer } from '../utils';

/**
 * Get user inputs from console prompt
 */
export async function promptUserForInputs(): Promise<{
  applicationType: string;
  directoryName: string;
  packageName: string;
}> {
  const applicationType = await promptForApplicationType();
  const directoryName = await promptForDirectoryName();
  const packageName = await promptForPackageName(directoryName);

  return { applicationType, directoryName, packageName };
}

/**
 * Prompts the user for getting the ApplicationType
 */
async function promptForApplicationType(): Promise<string> {
  const inquirer = await getInquirer();
  const { applicationType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'applicationType',
      message: 'What type of application do you want to create?',
      choices: Object.values(ApplicationType),
      default: ApplicationType.NextJs,
    },
  ]);
  return applicationType;
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
      default: `new-app-${generateRandomNumber()}`,
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
      default: `@vighnesh153/${directoryName}`,
    },
  ]);
  return packageName;
}

/**
 * Prompts the user for the port number
 */
export async function promptForPort(
  question = 'Enter the development server port number (3000 <= {value} < 4000)'
): Promise<number> {
  const inquirer = await getInquirer();
  const { portNumber } = await inquirer.prompt([
    {
      type: 'number',
      name: 'portNumber',
      message: question,
      validate(input) {
        const port = Number(`${input}`);
        if (isNaN(port)) {
          return 'Port should be a number';
        }
        if (port < 3000 || port >= 4000) {
          return 'Port should be between 3000 (inclusive) and 3999 (inclusive)';
        }
        // port is valid
        return true;
      },
    },
  ]);
  return Number(`${portNumber}`);
}
