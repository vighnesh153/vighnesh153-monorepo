import util from 'util';
import child_process from "child_process";

import { createSpinner } from "./createSpinner";
import { delay } from "./delay";

const exec = util.promisify(child_process.exec);

/**
 * Indexes the project and installs dependencies
 */
export async function runNpmInstall(packageName: string) {
  const spinner = createSpinner({
    text: "🚧 Indexing project and installing dependencies..."
  });
  await delay();

  // execute "npm install"
  await exec(`npm install -w ${packageName}`);

  spinner.succeed({
    text: "✅ Done indexing project and installing dependencies... 🎉"
  })
}