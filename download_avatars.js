var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');


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

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on ('error', function (err){
  	console.log("Error: ", err )
  })
  .pipe(fs.createWriteStream(filePath))
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result, obj) {
  console.log("Errors:", err);
  var obj = JSON.parse(result);
  var avatarsArr=[]
  for (i=0; i < obj.length; i++){
  	downloadImageByURL(obj[i].avatar_url,"./avatars/"+ obj[i].login + ".jpg")
  }
});




//"https://api.github.com/repos/"
///contributors"

///"jquery"