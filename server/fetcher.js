const request = require('request');
const Repo = require('../database');

module.exports = fetchGithub = (req, res, query) => {
  let host = `https://api.github.com/search/repositories?q=user:${query}`;

  let options = {
    url: host,
    headers: {
      'User-Agent': 'fetcher'
    }
  }

  request(options, (err, response, body) => {
    if (err) { console.log(err); }
    let repos = JSON.parse(body).items;
    repos.forEach(value => {
      let repo = new Repo(value);
      repo.save((err, repo) => {
        if (err) { return console.error(err); }
      });
    });
    res.send(body);
  });
}
