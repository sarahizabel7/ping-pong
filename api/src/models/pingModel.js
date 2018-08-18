const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const pingSchema = new Schema({
  title: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Ping', pingSchema);