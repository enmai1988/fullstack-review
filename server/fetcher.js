const request = require('request');
const Repo = require('../database');
const Promise = require('bluebird');

exports.dbLookup = (req, res) => {
  Repo.find().limit(25).sort({'name': 'asc'})
  .then(result => {
    res.send(JSON.stringify(result));
  });
}

exports.fetchGithub = (req, res, query) => {
  let host = `https://api.github.com/search/repositories?q=user:${query}`;

  let options = {
    url: host,
    headers: {
      'User-Agent': 'fetcher'
    }
  }

  request(options, (err, response, body) => {
    let repos = JSON.parse(body).items;
    if (!repos) {
      res.sendStatus(404);
      return;
    }
    Promise.resolve(repos.forEach(repo => {
      new Repo(repo).save((err, result) => {
        if (err) { throw err; }
      });
    })).then(() => {
      exports.dbLookup(req, res);
    }).catch(() => {
      console.log('err');
      res.sendStatus(500);
    });
  });
}
