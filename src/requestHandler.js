import GithubParser from "./utils/github/GithubParser";

/**
 * Extract the Github payload from the request body and give it to the processor.
 * @param {import("express").Request} req The request.
 * @param {import("express").Response} res The response.
 * @param {void} processor The function that will process the query. 
 * @returns 
 */
export default function handle(req, res, processor) {

  // Parse the request body.
  const githubPayload = (new GithubParser(req)).payload;

  // Do not process request if [IGNORE-WEBHOOKS] is present in the commit message
  if (githubPayload.isIgnoringWebHooks) {
    console.log("Last commit includes [IGNORE-WEBHOOKS]. So ignore.");
    res.send("Ignored.")
    return;
  }

  // Process
  processor(githubPayload, res);
}