const { exec } = require('child_process');

module.exports = {
  handle: function handle(req, res) {
    
    // Parse the request's body
    let data = fetchData(req);

    // Find out branch has been pushed
    let env = fetchEnv(data);
    // --- If it is not main or develop, ignore and do nothing
    if (env === undefined) {
      return;
    }

    // Fetch the project's name
    let project = fetchProject(data);

    // Launch the deploy script with the appropriate parameters
    console.log('[' + project + '] deploy-' + env);

    exec('bash ./scripts/deploy.sh ' + project.toLowerCase() + (env === 'preprod' ? ' --preprod' : ''), (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log('exec error: ' + error)
      }
    });

    res.send("Deployment of " + project + " started in " + env);
  }
}

// Returns the json contained in the request's body.
function fetchData(req) {
  return req.body;
}

// Returns the environment based on the branch. Returns undefined if the branch is not main or develop.
function fetchEnv(data) {

  const developBranch = "develop";
  const mainBranch = "main";

  if (data.ref.includes(mainBranch)) {
    return "prod";
  }
  else if (data.ref.includes(developBranch)) {
    return "preprod";
  }
  else {
    return undefined;
  }
}

// Returns the project name.
function fetchProject(data) {
  return data.repository.name;
}