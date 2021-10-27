var express = require('express');
var router = express.Router();
var request = require('sync-request');
require('./bdd.js');
var allData = require('../modules/city.js');


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/weather', async function(req,res) {  //recouperer des informations transmettent par un lien d'une template et avec ces informations, render un nouveau page
  var cities = await allData.cityModel.find();
  res.render('weather', {cities});
})

router.post('/add-city', async function(req,res) { //recouperer des information des champs de saisies, et les utilisent pour faire render un nouveau page
//declare current cities 
var cities = await allData.cityModel.find();
var requete = await request("POST", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&units=metric&APPID=21fa30595368a1ee0952908786f0eed3`);
var resultWS = await JSON.parse(requete.body);
var duplicate = false;

var duplicate = false 
//check for duplicates and update database with non duplicate post requests  
  for (var i=0; i<cities.length; i++) {
    if (await allData.cityModel.find({'name': req.body.name})) {
      duplicate = true
    }}
  if (duplicate === false) {
    var newCity = await new allData.cityModel({
      name: resultWS.name,
        description: resultWS.weather[0].main,
        url: resultWS.weather[0].icon,
        minTemp: resultWS.main.temp_min,
        maxTemp:resultWS.main.temp_max
    });
    
    await newCity.save();
  }
// call updated cities 
var cities = await allData.cityModel.find();

console.log(cities)
// render page with the list of cities
res.render('weather', {cities});
})


router.get('/delete-item', async function(req,res) {
 
await allData.cityModel.deleteOne({ "name" : req.query.name});

  var cities = await allData.cityModel.find();

  res.render('weather', {cities})
})

router.get('/update-data', async function(req,res) {

  var cities = await allData.cityModel.find();

    for (let i=0; i<cities.length; i++)  {
      var requete =  await request("POST", `https://api.openweathermap.org/data/2.5/weather?q=${cities[i].name}&units=metric&APPID=21fa30595368a1ee0952908786f0eed3`);
      var resultWS = await JSON.parse(requete.body);
  
      console.log(JSON.parse(requete.body))
  
      await allData.cityModel.updateOne({
        _id : cities[i].id}, {
        name: resultWS.name,
        description: resultWS.weather[0].main,
        url: resultWS.weather[0].icon,
        minTemp: resultWS.main.temp_min,
        maxTemp:resultWS.main.temp_max
        })

    }

  
  var cities = await allData.cityModel.find();

  res.render('weather', {cities})
})
module.exports = router;
