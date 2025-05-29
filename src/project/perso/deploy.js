import run from "../../utils/bash/bash";

export async function deploy() {
  /**
   * VARIABLES
   */
  const user = process.env.SERVER_USER;
  const projectPath = `${process.env.ROOT_PATH}/yannicktirand.xyz`;

  const repoUrl = `${process.env.GITHUB}/YannickTirandXYZ`;

  /**
   * BODY
   */
  console.log(`Updating project Yannick Tirand XYZ...`);

  // git pull
  console.log(`Pulling ${repoUrl} at ${projectPath}...`);
  await run(`su - ${user} -c "cd ${projectPath} && git pull"`);
  
  // npm install
  console.log("Installing dependencies...");
  await run(`su - ${user} -c "cd ${projectPath} && npm install"`);

  // hugo build
  console.log("Build with Hugo...");
  await run('hugo build --cleanDestinationDir --minify');

  console.log();
  console.log("Deployment complete!");
}