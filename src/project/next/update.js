export default function update(projectName, env, dbNeedsUpdate) {
  /**
   * VARIABLES
   */
  const domain = process.env.DOMAIN;
  const suffix = env == Environments.PREPROD ? '-preprod' : '';

  /**
   * BODY
   */
  console.log(`Updating project ${projectName}${suffix}.${domain}${dbNeedsUpdate ? ' with DB' : ''}...`);


  /**
   * UPDATE
   */

  // git pull

  // npm install

  // next build

  // Restart server with pm2
}