import { simpleGit as git } from "simple-git";
import Environments from "../../utils/enums/environments";
import run from "../../utils/bash/bash";

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
  git().clone(repoUrl, projectPath, {
    "--branch": branch,
    "--recurse-submodules": true,
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
