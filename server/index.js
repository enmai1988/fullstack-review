const bodyParser = require('body-parser');
const helper = require('./fetcher');


var express = require('express');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', function (req, res) {
  // retrieves top 25 repos from db and response it to the client
  helper.dbLookup(req, res);
});

app.post('/repos/import', function (req, res) {
  // request from client to fetch new repos
  let query = req.body.query;
  helper.fetchGithub(req, res, query);
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
