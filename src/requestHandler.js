const { fetchData, fetchEnv } = require("./utils");

module.exports = {
  // Parse some info from the request and let this provided processor process these info.
  handle: function handle(req, res, processor) {
    // Parse th request body.
    let data = fetchData(req);

    // Find out branch has been pushed.
    let env = fetchEnv(data);

    processor(data, env, res);
  }
}