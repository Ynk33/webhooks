const express = require("express");
const bodyParser = require("body-parser");

const port = 8008;

const payloadExample = {
  ref: "refs/heads/main",
  before: "06ec559c4227a58a173f358a696951d4777206bf",
  after: "56d98eea5224157be3138f439ac342efb016103e",
  repository: {
    id: 782193800,
    node_id: "R_kgDOLp9UiA",
    name: "YankaWordpress",
    full_name: "Ynk33/YankaWordpress",
    private: true,
    owner: {
      name: "Ynk33",
      email: "ytirand@gmail.com",
      login: "Ynk33",
      id: 6736706,
      node_id: "MDQ6VXNlcjY3MzY3MDY=",
      avatar_url: "https://avatars.githubusercontent.com/u/6736706?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Ynk33",
      html_url: "https://github.com/Ynk33",
      followers_url: "https://api.github.com/users/Ynk33/followers",
      following_url:
        "https://api.github.com/users/Ynk33/following{/other_user}",
      gists_url: "https://api.github.com/users/Ynk33/gists{/gist_id}",
      starred_url: "https://api.github.com/users/Ynk33/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/Ynk33/subscriptions",
      organizations_url: "https://api.github.com/users/Ynk33/orgs",
      repos_url: "https://api.github.com/users/Ynk33/repos",
      events_url: "https://api.github.com/users/Ynk33/events{/privacy}",
      received_events_url: "https://api.github.com/users/Ynk33/received_events",
      type: "User",
      site_admin: false,
    },
    html_url: "https://github.com/Ynk33/YankaWordpress",
    description:
      "Wordpress template project with YankaForge themes and plugins all set up",
    fork: false,
    url: "https://github.com/Ynk33/YankaWordpress",
    forks_url: "https://api.github.com/repos/Ynk33/YankaWordpress/forks",
    keys_url: "https://api.github.com/repos/Ynk33/YankaWordpress/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/Ynk33/YankaWordpress/teams",
    hooks_url: "https://api.github.com/repos/Ynk33/YankaWordpress/hooks",
    issue_events_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/issues/events{/number}",
    events_url: "https://api.github.com/repos/Ynk33/YankaWordpress/events",
    assignees_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/branches{/branch}",
    tags_url: "https://api.github.com/repos/Ynk33/YankaWordpress/tags",
    blobs_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/languages",
    stargazers_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/stargazers",
    contributors_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/contributors",
    subscribers_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/subscribers",
    subscription_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/subscription",
    commits_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/Ynk33/YankaWordpress/merges",
    archive_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/downloads",
    issues_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/labels{/name}",
    releases_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/Ynk33/YankaWordpress/deployments",
    created_at: 1712262063,
    updated_at: "2024-04-05T00:31:46Z",
    pushed_at: 1712443749,
    git_url: "git://github.com/Ynk33/YankaWordpress.git",
    ssh_url: "git@github.com:Ynk33/YankaWordpress.git",
    clone_url: "https://github.com/Ynk33/YankaWordpress.git",
    svn_url: "https://github.com/Ynk33/YankaWordpress",
    homepage: null,
    size: 39910,
    stargazers_count: 0,
    watchers_count: 0,
    language: "PHP",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: false,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: {
      key: "other",
      name: "Other",
      spdx_id: "NOASSERTION",
      url: null,
      node_id: "MDc6TGljZW5zZTA=",
    },
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "private",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "main",
    stargazers: 0,
    master_branch: "main",
  },
  pusher: { name: "Ynk33", email: "ytirand@gmail.com" },
  sender: {
    login: "Ynk33",
    id: 6736706,
    node_id: "MDQ6VXNlcjY3MzY3MDY=",
    avatar_url: "https://avatars.githubusercontent.com/u/6736706?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Ynk33",
    html_url: "https://github.com/Ynk33",
    followers_url: "https://api.github.com/users/Ynk33/followers",
    following_url: "https://api.github.com/users/Ynk33/following{/other_user}",
    gists_url: "https://api.github.com/users/Ynk33/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Ynk33/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Ynk33/subscriptions",
    organizations_url: "https://api.github.com/users/Ynk33/orgs",
    repos_url: "https://api.github.com/users/Ynk33/repos",
    events_url: "https://api.github.com/users/Ynk33/events{/privacy}",
    received_events_url: "https://api.github.com/users/Ynk33/received_events",
    type: "User",
    site_admin: false,
  },
  created: false,
  deleted: false,
  forced: false,
  base_ref: null,
  compare:
    "https://github.com/Ynk33/YankaWordpress/compare/06ec559c4227...56d98eea5224",
  commits: [
    {
      id: "56d98eea5224157be3138f439ac342efb016103e",
      tree_id: "a1952eb65eb23a579d5091fd6a9d8b4974450949",
      distinct: true,
      message: "Test commit for webhooks",
      timestamp: "2024-04-07T10:47:24+12:00",
      url: "https://github.com/Ynk33/YankaWordpress/commit/56d98eea5224157be3138f439ac342efb016103e",
      author: [Object],
      committer: [Object],
      added: [],
      removed: [],
      modified: [Array],
    },
  ],
  head_commit: {
    id: "56d98eea5224157be3138f439ac342efb016103e",
    tree_id: "a1952eb65eb23a579d5091fd6a9d8b4974450949",
    distinct: true,
    message: "Test commit for webhooks",
    timestamp: "2024-04-07T10:47:24+12:00",
    url: "https://github.com/Ynk33/YankaWordpress/commit/56d98eea5224157be3138f439ac342efb016103e",
    author: { name: "Yannick Tirand", email: "yannick.tirand@gravitygoat.com" },
    committer: {
      name: "Yannick Tirand",
      email: "yannick.tirand@gravitygoat.com",
    },
    added: [],
    removed: [],
    modified: ["setup.sh"],
  },
};

const developBranch = "develop";
const mainBranch = "main";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  handleRequest(req, res);
});

app.post("/", (req, res) => {
  handleRequest(req, res);
});

app.listen(port, () => {
  console.log(`Webhooks app listening on port ${port}`);
});

function handleRequest(req, res) {
  // TODO
  // - Parse the body
  let data = req.body;
  let env = "";

  // - Find out branch has been pushed
  // --- If it is not main or develop, ignore and do nothing
  if (data.ref.includes(mainBranch)) {
    console.log("This is a push on main branch: deploy");
    env = "prod";
  }
  else if (data.ref.includes(developBranch)) {
    console.log("This is a push on develop branch: deploy-preprod");
    env = "preprod";
  }
  else {
    console.log("This is a push on another branch: ignore.")
    res.send("Ignore");
  }

  // - Find out which project is concerned
  let project = data.repository.name;

  console.log(`[${project}] deploy-${env}`);

  // - Launch the appropriate script according to the information above
  // --- deploy.sh if it is on main
  // --- deploy-preprod.sh if it is on develop

  res.send("Received!");
}
