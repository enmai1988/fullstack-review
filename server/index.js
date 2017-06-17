const bodyParser = require('body-parser');
const fetcher = require('./fetcher');
const Repo = require('../database');

var express = require('express');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', function (req, res) {
  // retrieves top 25 repos from db and response it to the client
  Repo.find().sort({'name': 'asc'}).then(result => {
    res.send(result.slice(0, 25));
  });
});

app.post('/repos/import', function (req, res) {
  // request from client to fetch new repos
  let query = req.body.query;
  fetcher(req, res, query);
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
