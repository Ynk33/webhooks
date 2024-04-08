const { fetchData, fetchEnv, Environments } = require("./utils");

module.exports = {
  updateWebhooks: function update(req, res) {

    // Parse th request body.
    let data = fetchData(req);
    console.log(data);

    // Find out which branch has been pushed.
    let env = fetchEnv(data);
    // --- If it is not on main branch, do nothing.
    if (env !== Environments.PROD) {
      return
    }
    
    console.log("[Webhooks] Update");

    

    // Run the update script.
    exec('bash ./scripts/webhooks/update.sh', (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log('exec error: ' + error)
      }
    });

    res.send("Update request for Webhooks project received! Processing...")
  }
}