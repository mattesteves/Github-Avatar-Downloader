var request = require('request');
var token = require('./secrets.js')

console.log('Welcome to Matt\'s Github Avatar Downloader\: ' )

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result, obj) {
  console.log("Errors:", err);
  var obj = JSON.parse(result)
});

