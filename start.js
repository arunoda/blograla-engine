var express = require('express');
var hubBubRoute = require('./lib/routes/hubBub');

var app = express();
app.use(express.json());

//add hubBub routes
hubBubRoute(app);

var port = process.env.PORT || 2448;
console.info('starting blog-rala engine on port: ', port);
app.listen(port);