const { exec } = require('child_process');
const { Environments } = require("./utils");

module.exports = {
  // Update this Webhooks project and rebuild it with npm.
  updateWebhooks: function update(data, env, res) {

    // If push not on main branch, do nothing.
    if (env !== Environments.PROD) {
      return
    }
    
    // Run the update script.
    console.log("[Webhooks] Update");

    exec('bash ./scripts/webhooks/update.sh', (error, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      if (error !== null) {
        console.log('exec error: ' + error)
      }
    });

    res.send("Update request for Webhooks project received! Processing...")
  }
}