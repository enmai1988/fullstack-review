const request = require('request');
const Repo = require('../database');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

exports.fetchGithub = (req, res, query) => {
  let host = `https://api.github.com/search/repositories?q=user:${query}`;

  let options = {
    url: host,
    headers: {
      'User-Agent': 'fetcher'
    }
  }

  request(options, (err, response, body) => {
    Repo.create(JSON.parse(body).items, (err, repos) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }
    })
    .then(() => exports.dbLookup(req, res));
  });
}

exports.dbLookup = (req, res) => {
  Repo.find().limit(25).sort({'name': 'asc'})
  .exec((err, result) => {
    if (err) { res.sendStatus(404); }
    res.send(JSON.stringify(result));
  });
}
