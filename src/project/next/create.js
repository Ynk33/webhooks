
export function create(projectName, env) {
  /**
   * VARIABLES
   */
  const domain = process.env.DOMAIN;
  const suffix = env == Environments.PREPROD ? '-preprod' : '';

  /**
   * BODY
   */
  console.log(`Creating project ${projectName}${suffix}.${domain}...`);

  
  /**
   * FIRST DEPLOY
   */

  // Git clone

  // If preprod, checkout develop

  // npm install

  // next build

  // server block
  // If preprod, don't forget the .htpasswd

  // Certbot

  // Run server with pm2
}