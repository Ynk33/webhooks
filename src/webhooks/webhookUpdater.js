import { exec } from 'child_process';
import Environments from '../utils/enums/environments';
import GithubPayload from '../utils/github/GithubPayload';

/**
 * Update this Webhooks project and rebuild it.
 * @param {GithubPayload} githubPayload The Github payload.
 * @param {import('express').Response} res The response. 
 * @returns 
 */
export default function updateWebhooks(githubPayload, res) {

  // If push not on main branch, do nothing.
  if (githubPayload.env !== Environments.PROD) {
    return
  }
  
  // Run the update script.
  console.log("[Webhooks] Update");

  exec('bash ./scripts/webhooks/update.sh', (error, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    if (error !== null) {
      console.log('exec error: ' + error)
      res.sendStatus(500).send("An error has occured during the Webhooks update.");
    }
  });

  res.send("Update request for Webhooks project received! Processing...")
}