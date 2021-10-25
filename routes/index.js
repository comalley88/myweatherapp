var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

var cityList = []

router.get('/weather', function(req,res) {
  console.log(cityList)
  res.render('weather', {cityList})
})

router.post('/add-city', function(req,res) {
  
  var duplicate = false 
  
  for (var i=0; i<cityList.length; i++) {
    if (cityList[i].name === req.body.name) {
      duplicate = true
    }}
  if (duplicate === false) {cityList.push(req.body)}
  

  res.render('weather', {cityList})
})

router.get('/delete-item', function(req,res) {
  for (var i=0; i<cityList.length; i++) {
    if (cityList[i].name === req.query.name) {
      cityList.splice(i, 1)
    }
  }
  res.render('weather', {cityList})
})

module.exports = router;
