const express = require('express')
const bodyParser = require("body-parser")

const port = 8008;

const payloadExample = {
  "action": "opened",
  "issue": {
    "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
    "number": 1347
  },
  "repository" : {
    "id": 1296269,
    "full_name": "octocat/Hello-World",
    "owner": {
      "login": "octocat",
      "id": 1
    }
  },
  "sender": {
    "login": "octocat",
    "id": 1
  }
 }

 const developBranch = "develop"
 const mainBranch = "main"

 const app = express()

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {

  // TODO
  // - Parse the body
  let data = req.body;
  console.log(data);

  // - Find out branch has been pushed
  // --- If it is not main or develop, ignore and do nothing
  // - Find out which project is concerned
  // - Launch the appropriate script according to the information above
  // --- deploy.sh if it is on main
  // --- deploy-preprod.sh if it is on develop

  res.send("Received!")
})

app.listen(port, () => {
  console.log(`Webhooks app listening on port ${port}`)
})
