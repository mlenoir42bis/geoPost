var express = require('express');
var app = express();
var path = require('path');

var port = 5000;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.listen(port);
