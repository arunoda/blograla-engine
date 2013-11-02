function HubBuh(app, db) {
  var itemCollection = db.collection('items');
  var feedCollection = db.collection('feeds');

  app.post('/hubbub/callback/:feedId', function(req, res) {
    var feedId = req.params.feedId;
    var feed;
    
    console.info('receiving new feed Info: ', feedId);
    res.send(200);

    var hubBubJson = req.body;
    if(!hubBubJson || !hubBubJson.items) {
      console.warn('invalid hubBubJson: ', hubBubJson);
      return;
    }

    feedCollection.findOne({_id: feedId}, function(err, f) {
      if(err) {
        console.error('error getting feed: ', feedId);
      } else if(!f) {
        console.warn('so such feed exists: ', feedId);
      } else {
        feed = f;
        hubBubJson.items.forEach(function(item) {
          insertItem(item);
        }); 
      }
    });

    function insertItem(item) {
      var item = {
        feed: {name: feed.name, url: feed.url}, 
        atom: item,
        timestamp: Date.now()
      };

      itemCollection.insert(item, function(err) {
        if(err) {
          console.error('item insertion failed: ', err.message);
        }
      });
    }
  });
}

module.exports = HubBuh;