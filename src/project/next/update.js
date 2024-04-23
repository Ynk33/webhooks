import run from "../../utils/bash/bash";
import Environments from "../../utils/enums/environments";

/**
 * Deploy an update of a NextJS project.
 * @param {string} projectName The project name.
 * @param {string} env The deployment environment.
 */
export default async function update(projectName, env) {
  /**
   * VARIABLES
   */
  const domain = process.env.DOMAIN;
  const suffix = env == Environments.PREPROD ? '-preprod' : '';
  const url = `${projectName}${suffix}.${domain}`;
  const projectPath = `${process.env.ROOT_PATH}/${url}`;

  const repoUrl = `${process.env.GITHUB}/${projectName}`;

  /**
   * BODY
   */
  console.log(`Updating project ${projectName}${suffix}.${domain}...`);

  // git pull
  console.log(`Pulling ${repoUrl} at ${projectPath}...`);
  await run(`su - yanka -c "cd ${projectPath} && git pull"`);
  
  // npm install
  console.log("Installing dependencies...");
  await run(`su - yanka -c "cd ${projectPath} && npm install"`);

  // next build
  console.log("Build with NextJS...");
  await run(`su - yanka -c "cd ${projectPath} && npm run build"`);

  // Restart server with pm2
  console.log(`Restart pm2 process ${projectName}${suffix}...`);
  await run(`su - yanka -c "pm2 restart ${projectName}${suffix} --time"`);

  console.log();
  console.log("Deployment complete!");
}