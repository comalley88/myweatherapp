var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

var cityList = [
  {name: 'Paris',
  currentWeather: {
    description: 'nuageaux',
    url: '/images/picto-1.png',
    maxTemp: 6,
    MinTemp: 14
  }
},
{name: 'London',
  currentWeather: {
    description: 'ciel degage',
    url: '/images/picto-1.png',
    maxTemp: 4,
    MinTemp: 18
  }
},
{name: 'Madrid',
  currentWeather: {
    description: 'soleil',
    url: '/images/picto-1.png',
    maxTemp: 2,
    MinTemp: 20
  }
}
]

router.get('/weather', function(req,res) {
  cityList = req.query
  res.render('weather', {cityList})
})

module.exports = router;
