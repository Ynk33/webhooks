import express from "express";
import handle from "./src/requestHandler";
import deployWebhooks from "./src/webhooks/webhooksDeploy";
import deployProject from "./src/project/projectDeploy";

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
async function run(command) {
  console.log(`Before: ${command}`);
  command = command.replace(/(\r\n|\n|\r)/gm,""); // TODO: Dirty fix, I need to find a way to really fix this.
  console.log(`After: ${command}`);
}

console.log("##### DEBUG #####");
console.log();

console.log("##### First test");
let projectName = "nomadkatenext";
let url = "nomadkatenext-preprod.yankadevlab.tech";
let _port = "8100"; 
let suffix = "-preprod";
await run(`bash ./scripts/projects/next/setupServer.sh ${projectName} ${url} ${_port} ${suffix}`);

console.log();

console.log("##### Second test");
projectName = "nomadkatenext";
url = "nomadkatenext-preprod.yankadevlab.tech";
_port = "8100"; 
suffix = "preprod";
await run(`bash ./scripts/projects/next/setupServer.sh ${projectName} ${url} ${_port} ${suffix}`);

console.log();
console.log("##### END DEBUG #####");