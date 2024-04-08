const express = require("express");
const { updateWebhooks } = require("./src/webhookUpdater");
const { updateProject } = require("./src/projectUpdater");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8008;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/", (req, res) => {
  updateProject(req, res);
});

app.post("/webhooks", (req, res) => {
  updateWebhooks(req, res);
});

app.listen(port, () => {
  console.log(`Webhooks app listening on port ${port}`);
  console.log("This is a test");
});
