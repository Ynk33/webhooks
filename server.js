import express from "express";
import handle from "./src/requestHandler";
import updateWebhooks from "./src/webhooks/webhookUpdater";
import updateProject from "./src/project/projectUpdater";
import { deploy } from "./src/project/next/deploy";

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
  console.log("Connection on /webhooks, update attempt...");
  handle(req, res, updateWebhooks);
});

app.post("/", (req, res) => {
  console.log("Connection on /, project update attempt...");
  handle(req, res, updateProject);
});

app.listen(port, () => {
  console.log(`Webhooks app listening on port ${port}`);
});
