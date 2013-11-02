/*
  You need to set MONGO_URL as an Env. Variable

  Usage: node add-feed.js <feedUrl> <siteName> <siteUrl>
*/

var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/blograla";
var BLOGRALA_ENGINE = process.env.BLOGRALA_ENGINE || 'http://blograla.herokuapp.com';
var USERNAME = process.env.USERNAME || 'arunoda';
var PASSWORD = process.env.PASSWORD || 'maxapower';

var feedUrl = process.argv[2];
var siteName = process.argv[3];
var siteUrl = process.argv[4];

var feedId = md5(feedUrl);
var db;

MongoClient.connect(MONGO_URL, function(err, _db) {
  if(err) {
    throw err;
  }
  db = _db;

  addFeed(feedUrl, siteName, siteUrl);
});

function addFeed(feedUrl, siteName, siteUrl) {
  var feedId = md5(feedUrl);
  
  db.collection('feeds').save({
    _id: feedId,
    name: siteName,
    url: siteUrl,
    feedUrl: feedUrl
  }, afterSaved);

  function afterSaved(err) {
    if(err) {
      throw err;
    } else {
      request.post('https://superfeedr.com/hubbub', {
        form: {
          'hub.mode': 'subscribe',
          'hub.topic': feedUrl,
          'hub.callback': BLOGRALA_ENGINE + '/hubbub/callback/' + feedId
        },
        auth: {
          user: USERNAME,
          password: PASSWORD
        },
        headers: {
          'Accept': 'application/json'
        }
      }, function(err, response, body) {
        if(err) {
          console.error('Error adding feed: ', err.message);
        } else if(response.statusCode != 204) {
          console.error('Invalid Status Code: ', response.statusCode);
          console.error('Body: ', body);
        } else {
          console.log('feed adding successful');
          process.exit(0);
        }
      });
    }
  }
}


function md5(str) {
  return require('crypto').createHash('md5').update(str).digest('hex');
}