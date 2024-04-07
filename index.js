const express = require("express");
const bodyParser = require("body-parser");
const { handle } = require("./src/requestHandler");

const port = 8008;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/", (req, res) => {
  handle(req, res);
});

app.listen(port, () => {
  console.log(`Webhooks app listening on port ${port}`);
});
