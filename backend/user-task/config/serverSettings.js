const express =  require("express");
const bodyParser = require("body-parser");

module.exports =  () => {
   //define router
   let router = express.Router();     

   //body parser
   router.use(bodyParser.urlencoded({ extended:true}));
   router.use(bodyParser.json());

   let cors = require('cors');

    // after the code that uses bodyParser and other cool stuff
    // this is my front-end url for development
    //origins to be allowed
    const originsWhitelist = [
      'http://localhost:4200','https://bunny-studio.web.app','https://bunny-studio.firebaseapp.com'
   ];

    let corsOptions = {
         origin: function(origin, callback){
             var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
             callback(null, isWhitelisted);
        },
        credentials:true
    };

   //use cors
   router.use(cors(corsOptions));

   //ENABLE CORS and other settings
   router.use(function(req, res, next) {     
      //allow credentials(cookies)
      res.header("Access-Control-Allow-Credentials", "true");

      //control methods to be allowed
      res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");

      //allow headers
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");

      next();
   });
    
   return router;
}
