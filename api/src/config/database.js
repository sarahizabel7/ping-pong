const mongoose = require('mongoose');
const environment = require('./environment');
mongoose.connect(environment.db.url, {
  useNewUrlParser: true
});
const db = mongoose.connection;

module.exports = db;