import { ApplicationType } from "./applicationTypes";
import { generateRandomNumber, getInquirer } from "../utils";

/**
 * Get user inputs from console prompt
 */
export async function promptUserForInputs(): Promise<{ applicationType: string, directoryName: string, packageName: string }> {
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
      type: "list",
      name: "applicationType",
      message: "What type of application do you want to create?",
      choices: Object.values(ApplicationType),
      default: ApplicationType.NextJs
    }
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
      type: "input",
      name: "directoryName",
      message: "Enter the name of the directory",
      default: `new-app-${generateRandomNumber()}`
    }
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
      type: "input",
      name: "packageName",
      message: "Enter the package name",
      default: `@vighnesh153/${directoryName}`
    }
  ]);
  return packageName;
}