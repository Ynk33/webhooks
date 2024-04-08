const { exec } = require('child_process');
const { fetchProject, Environments } = require('./utils');

module.exports = {
  // Update the project defined in the push payload, in preprod or prod based on the branch that has been pushed.
  updateProject: function update(data, env, res) {
    
    // If push not main or develop branch, ignore and do nothing.
    if (env === Environments.NONE) {
      return;
    }

    // Fetch the project's name.
    let project = fetchProject(data);

    // Launch the deploy script with the appropriate parameters.
    console.log('[' + project + '] deploy-' + env);

    exec('bash ./scripts/projects/deploy.sh ' + project.toLowerCase() + (env === Environments.PREPROD ? ' --preprod' : ''), (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log('exec error: ' + error)
      }
    });

    res.send("Deployment of " + project + " started in " + env);
  }
}