const { fetchData, fetchEnv, isIgnoringWebhooks } = require("./utils");

module.exports = {
  // Parse some info from the request and let this provided processor process these info.
  handle: function handle(req, res, processor) {
    // Parse th request body.
    let data = fetchData(req);

    // Find out branch has been pushed.
    let env = fetchEnv(data);

    // Do not process request if [IGNORE-WEBHOOKS] is present in the commit message
    console.log("Last commit message: " + data.head_commit.message);
    if (isIgnoringWebhooks(data)) {
      console.log("Last commit includes [IGNORE-WEBHOOKS]. So ignore.");
      res.send("Ignored.")
      return;
    }

    processor(data, env, res);
  }
}