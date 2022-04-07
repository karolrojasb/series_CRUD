const mongoose = require('mongoose')
const serieSchema = mongoose.Schema({
  serie:{
    type: String,
    require: true,
    unique: true
  },
  number_seasons: {
    type: Number,
    require: true
  },
  original_language:{
    type: String,
    require: true
  },
  features_seasons: {
    type: Object,
    require: true,
    season_number: { type: Number, require: true},
    season_name: {typer: String, require: true},
    premier_date: { type: String, require: true},
    cast: {type: Array, require: true}
  }
})

module.exports = mongoose.model('SeriesTV_Collection', serieSchema )
