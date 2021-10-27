var mongoose = require('../routes/bdd.js')

var citySchema = mongoose.Schema({
    name: String,
    description: String,
    url: String,
    minTemp: Number,
    maxTemp: Number,
 });

 var cityModel = mongoose.model('cities', citySchema);

module.exports = {citySchema, cityModel}

