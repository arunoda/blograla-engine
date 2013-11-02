var url = require('url');
var ObjectID = require('mongodb').ObjectID;

function MobileApi(app, db) {
  var itemCollection = db.collection('items');

  app.get('/api/items', function(req, res) {
    var parseUrl = url.parse(req.url, true);
    var from = parseUrl.query.from;
    var to = parseUrl.query.to;
    var limit = parseUrl.query.limit || 20;

    var query = {_id: {}};
    if(from) {
      query._id['$lt'] = ObjectID.createFromHexString(from);
    }

    if(to) {
      query._id['$gt'] = ObjectID.createFromHexString(to);
    }

    if(Object.keys(query._id) == 0) {
      delete query._id;
    }

    var options = {
      sort: {_id: -1},
      limit: limit
    };

    console.log(query, options);
    itemCollection.find(query, options).toArray(acceptResult);
    
    function acceptResult(err, result) {
      if(err) {
        console.error('error when fetching items: ', err.message, query, options);
        res.send(500);
      } else {
        res.json(result);
      }
    }
  });
}

module.exports = MobileApi;