import express from "express";
import handle from "./src/requestHandler";
import deployWebhooks from "./src/webhooks/webhooksDeploy";
import deployProject from "./src/project/projectDeploy";
import { runTest } from "./src/utils/bash/bash";

/**
 * CONFIG
 */

require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8008;


/**
 * ROUTES
 */

app.post("/webhooks", (req, res) => {
  console.log("Connection on /webhooks, webhooks deploy attempt...");
  handle(req, res, deployWebhooks);
});

app.post("/", (req, res) => {
  console.log("Connection on /, project deploy attempt...");
  handle(req, res, deployProject);
});

app.listen(port, () => {
  console.log(`Webhooks app listening on port ${port}`);
});

/**
 * REMINDER: DEBUG
 */
console.log("##### DEBUG #####");
console.log();

console.log("##### First test");
let projectName = "nomadkatenext";
let url = "nomadkatenext-preprod.yankadevlab.tech";
let _port = "8100"; 
let suffix = "-preprod";
await runTest(`bash ./scripts/projects/next/setupServer.sh ${projectName} ${url} ${_port} ${suffix}`);

console.log();

console.log("##### Second test");
projectName = "nomadkatenext";
url = "nomadkatenext-preprod.yankadevlab.tech";
_port = "8100"; 
suffix = "preprod";
await runTest(`bash ./scripts/projects/next/setupServer.sh ${projectName} ${url} ${_port} ${suffix}`);

console.log();
console.log("##### END DEBUG #####");