import { simpleGit as git } from "simple-git";
import fs from "fs";
import Environments from "../../utils/enums/environments";
import run, { runAndReturn } from "../../utils/bash/bash";
import { searchAndReplace } from "../../utils/files/files";

export async function create(projectName, env) {
  /**
   * VARIABLES
   */
  const domain = process.env.DOMAIN;
  const suffix = env == Environments.PREPROD ? "-preprod" : "";
  const url = `${projectName}${suffix}.${domain}`;
  const projectPath = `${process.env.ROOT_PATH}/${url}`;

  const repoUrl = `${process.env.GITHUB}/${projectName}`;
  const branch = env === Environments.PREPROD ? "develop" : "main";

  /**
   * BODY
   */

  console.log(`Creating project ${projectName}${suffix}.${domain}...`);

  // Git clone
  console.log(`Cloning ${repoUrl} at ${projectPath}...`);
  await git().clone(repoUrl, projectPath, {
    "--branch": branch,
    "--recurse-submodules": true,
  });

  // Update .env file
  console.log("Setting up .env file...");
  fs.copyFile(`${projectPath}/.env.sample`, `${projectPath}/.env`, async (err) => {
    if (err) {
      console.log("Error Found:", err);
    }
    else {
      // Find a free port
      const port = await runAndReturn("bash ./scripts/utils/net.sh");
      // Update .env file
      searchAndReplace("[PORT]", port, `${projectPath}/.env`);
      searchAndReplace("[SET WORDPRESS API URL]", `https://${url}`.replace(/next/g, "wordpress"), `${projectPath}/.env`);
      searchAndReplace("[SET WEBSITE URL]", `https://${url}`, `${projectPath}/.env`);
    }
});
  

  // npm install
  console.log("Installing dependencies...");
  await run(`su - yanka -c "cd ${projectPath} && npm install`);

  // next build
  console.log("Build with NextJS...");
  await run(`su - yanka -c "cd ${projectPath} && npm run build`);

  // Nginx configuration
  console.log("Updating Nginx configuration...");
  await run(
    `bash ./scripts/projects/next/setupServer.sh ${projectName} ${projectPath} ${url} ${suffix}`
  );

  // Run server with pm2
  console.log(`Start pm2 process ${projectName}${suffix}...`);
  await run(`pm2 start npm --name ${projectName}${suffix} --time -- start`);

  console.log();
  console.log("Deployment complete!");
}
