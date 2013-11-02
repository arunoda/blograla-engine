var express = require('express');
var hubBubRoute = require('./lib/routes/hubBub');
var MongoClient = require('mongodb').MongoClient;

var MONGO_URL = process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/blograla';
MongoClient.connect(MONGO_URL, afterConnected);

var app = express();
app.use(express.json());

var port = process.env.PORT || 2448;
console.info('starting blog-rala engine on port: ', port);
app.listen(port);

function afterConnected(err, db) {
  if(err) {
    throw err;
  } else {
    //add hubBub routes
    hubBubRoute(app, db);
  }
}
