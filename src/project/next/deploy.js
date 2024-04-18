import fs from "fs";
import Environments from "../../utils/enums/environments";

export function deploy(projectName, env) {
  // TODO: Deployment of a Next project

  /**
   * VARIABLES
   */
  const rootPath = process.env.ROOT_PATH;
  const domain = process.env.DOMAIN;
  const suffix = env == Environments.PREPROD ? '-preprod' : '';

  // Check if first deploy or update
  if (fs.existsSync(`${rootPath}/${projectName}${suffix}/${domain}`)) {
    console.log("Project exists, update");
  }
  else {
    console.log("Project does not exists, create");
  }

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


  /**
   * UPDATE
   */

  // git pull

  // npm install

  // next build

  // Restart server with pm2

}