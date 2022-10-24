import { getInquirer } from '../utils';
import createNewApplication from '../new-app';
import createNewPackage from '../new-package';

const ProjectType = {
  Package: 'package',
  Application: 'application',
};

async function createNewProject() {
  console.log('Preparing creation of a new project in the workspace');

  const projectType = await promptForProjectType();

  // Create the project
  ({
    [ProjectType.Application]: createNewApplication,
    [ProjectType.Package]: createNewPackage,
  }[projectType]());
}

/**
 * Prompts the user for getting the PackageType
 */
async function promptForProjectType(): Promise<string> {
  const inquirer = await getInquirer();
  const { projectType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'What type of project do you want to create?',
      choices: Object.values(ProjectType),
      default: ProjectType.Application,
    },
  ]);
  return projectType;
}

createNewProject().then();
