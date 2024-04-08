const { exec } = require('child_process');
const { fetchData, fetchEnv, fetchProject, Environments } = require('./utils');

module.exports = {
  updateProject: function update(req, res) {
    
    // Parse the request's body.
    let data = fetchData(req);

    // Find out branch has been pushed.
    let env = fetchEnv(data);
    // --- If it is not main or develop, ignore and do nothing.
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