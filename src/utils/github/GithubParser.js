import GithubPayload from "./GithubPayload";

/**
 * @class GithubParser A convenient class to parse the body of a request and extracts the Github payload from it.
 */
export default class GithubParser {
  /**
   * Creates a new instance of GithubParser and populates its payload with the query.
   * @param {any} req The query.
   */
  constructor(req) {
    this.payload = new GithubPayload(req.body);
  }

  /**
   * @returns {GithubPayload} The Github payload.
   */
  get payload() {
    return this.payload;
  }
}