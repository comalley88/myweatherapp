var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }

   const url = 'mongodb+srv://Conor:fvz%23k%40jVWkcrgE9@cluster0.ftzjl.mongodb.net/weatherapp?retryWrites=true&w=majority'

   mongoose.connect(url, options,        
   function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("connected to db")
      }
      
    }
   );

   module.exports = mongoose