var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: {type: String, index: true},
  'owner.login': String,
  full_name: String,
  html_url: String
});

var Repo = mongoose.model('Repo', repoSchema);

// Repo.collection.drop();

module.exports = Repo;
