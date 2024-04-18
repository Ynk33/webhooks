import Environments from "../enums/environments";

export default class GithubPayload {
  /**
   * Creates a new instance of GithubPayload.
   * @param {JSON} payload The Github payload in a JSON format.
   */
  constructor(payload) {
    this._payload = payload;
  }

  /**
   * Returns the project name extracted from the Github payload.
   * @returns {string} The name of the project.
   */
  get projectName() {
    return this._payload.repository.name;
  }
  
  /**
   * Returns the deployment environment based on the branch. Returns undefined if the branch is not main or develop.
   * @returns {string} The deployment environment.
   */
  get env() {
    const developBranch = "develop";
    const mainBranch = "main";

    if (this._payload.ref.includes(mainBranch)) {
      return Environments.PROD;
    }
    else if (this._payload.ref.includes(developBranch)) {
      return Environments.PREPROD;
    }
    else {
      return Environments.NONE;
    }
  }

  /**
   * Check if the request contains a commit or not.
   * @returns {boolean} True if the request contains a commit, false otherwise.
   */
  get isACommit() {
    return this._payload.head_commit !== undefined;
  }

  /**
   * Assess if the last commit requires to ignore webhooks.
   * @returns {boolean} Whether the webhooks must ignore this query or not.
   */
  get isIgnoringWebHooks() {
    return this._payload.head_commit.message.includes("[IGNORE-WEBHOOKS]");
  }

  /**
   * Assess if the last commit requires the database to be updated.
   * @returns {boolean} Whether the the database must be updated or not.
   */
  get dbNeedsUpdate() {
    return this._payload.head_commit.message.includes("[DB]");
  }
}