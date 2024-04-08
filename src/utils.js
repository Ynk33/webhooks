// Projects environments, based on the branch that has been pushed.
const Environments = {
  PROD: "prod",
  PREPROD: "preprod",
  NONE: undefined
};

/**
 * Set of functions to read some data from the Github webhook payload.
 */
module.exports = {

  Environments: Environments,

  // Returns the json contained in the request's body.
  fetchData: function fetchData(req) {
    return req.body;
  },

  // Returns the environment based on the branch. Returns undefined if the branch is not main or develop.
  fetchEnv: function fetchEnv(data) {

    const developBranch = "develop";
    const mainBranch = "main";

    if (data.ref.includes(mainBranch)) {
      return Environments.PROD;
    }
    else if (data.ref.includes(developBranch)) {
      return Environments.PREPROD;
    }
    else {
      return Environments.NONE;
    }
  },

  // Returns the project name.
  fetchProject: function fetchProject(data) {
    return data.repository.name;
  }
}