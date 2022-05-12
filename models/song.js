var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  artist: String,
  top_genre: String,
  year_released: Number,
  added: String,
  dur: Number,
  top_year: Number,
});

module.exports = mongoose.model('songs', songsSchema);