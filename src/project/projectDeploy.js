import { exec } from 'child_process';
import Environments from '../utils/enums/environments';
import GithubPayload from '../utils/github/GithubPayload';
import ProjectTypes from '../utils/enums/projectTypes';
import { deploy as deployNext } from "./next/deploy";

/**
 * Update the project defined in the push payload, in preprod or prod based on the branch that has been pushed.
 * @param {GithubPayload} githubPayload The Github payload.
 * @param {import('express').Response} res The response. 
 * @returns 
 */
export default function deployProject(githubPayload, res) {
  
  // If push not main or develop branch, ignore and do nothing.
  if (githubPayload.env === Environments.NONE) {
    return;
  }

  const projectName = githubPayload.projectName;

  console.log('[' + projectName + '] deploy-' + githubPayload.env);

  if (projectName.toLowerCase().includes(ProjectTypes.WORDPRESS)) {

    // Deployment of Wordpress project

    const preprodOption = githubPayload.env === Environments.PREPROD ? ' --preprod' : '';
    const dbOption = githubPayload.dbNeedsUpdate ? ' --db' : '';
  
    exec('bash ./scripts/projects/wordpress/deploy.sh ' + projectName.toLowerCase() + preprodOption + dbOption, (error, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      if (error !== null) {
        console.log('exec error: ' + error)
        res.sendStatus(500).send("An error has occured during the deployment process.");
      }
    });

  } else if (projectName.toLowerCase().includes(ProjectTypes.NEXT)) {

    // Deployment of Next project

    deployNext(projectName.toLowerCase(), githubPayload.env, githubPayload.dbNeedsUpdate);
  }
  else {
    return;
  }

  res.send("Deployment request of " + projectName + " in " + githubPayload.env + " received! Processing...");
}