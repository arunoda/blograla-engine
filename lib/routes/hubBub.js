function HubBuh(app, db) {
  app.post('/hubbub/callback/:id', function(req, res) {
    console.log(req.body);
    res.send(200);
  });
}

module.exports = HubBuh;