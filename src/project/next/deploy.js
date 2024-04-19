import fs from "fs";
import Environments from "../../utils/enums/environments";
import update from "./update";
import { create } from "./create";

/**
 * Deploy a NextJS project.
 * @param {string} projectName The project name.
 * @param {string} env The deployment environment.
 */
export function deploy(projectName, env) {
  /**
   * VARIABLES
   */
  const rootPath = process.env.ROOT_PATH;
  const domain = process.env.DOMAIN;
  const suffix = env == Environments.PREPROD ? '-preprod' : '';

  /**
   * BODY
   */
  
  // Check if first deploy or update
  if (fs.existsSync(`${rootPath}/${projectName}${suffix}.${domain}`)) {
    update(projectName, env);
  }
  else {
    create(projectName, env);
  }
}