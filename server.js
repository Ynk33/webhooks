const express = require("express");
const { updateWebhooks } = require("./src/webhookUpdater");
const { updateProject } = require("./src/projectUpdater");

const app = express();
const bodyParser = require("body-parser");
const { handle } = require("./src/requestHandler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8008;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/webhooks", (req, res) => {
  console.log("Connection on /webhooks, update attempt...");
  handle(req, res, updateWebhooks);
});

app.post("/", (req, res) => {
  console.log("Connection on /, project attempt...");
  handle(req, res, updateProject);
});

app.listen(port, () => {
  console.log(`Webhooks app listening on port ${port}`);
});
