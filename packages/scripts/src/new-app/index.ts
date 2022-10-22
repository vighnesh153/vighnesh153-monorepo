import { ApplicationType } from "./applicationTypes";
import { createNodeJsApplication } from "./createNodeJsApplication";
import { createNextJsApplication } from "./createNextJsApplication";
import { promptUserForInputs } from "./prompts";
import { runNpmInstall } from "../utils";

async function main() {
  console.log("Preparing creation of a new application in `apps/` directory");

  const {
    applicationType,
    directoryName,
    packageName
  } = await promptUserForInputs();

  // Creates the app
  await {
    [ApplicationType.NodeJs]: createNodeJsApplication,
    [ApplicationType.NextJs]: createNextJsApplication
  }[applicationType](directoryName, packageName);

  // index the app and install dependencies, if any
  await runNpmInstall(packageName)
}

main().catch(e => {
  console.log("\x1b[31m", "\nAn error occurred when creating your app");
  console.log("\x1b[31m", e);
});
