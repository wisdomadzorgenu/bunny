const ServerLogger = require("../classes/serverLogger");

const errorHandler = (err,res)=>{
   //WRITE ERROR TO LOGS
   ServerLogger.writeErrorsToLog(err.message,err.stack);

   //send response
   res.status(500).send('A problem occurred on the server. Please try again');
}

//handle errors to be used by routes
exports.handleError = errorHandler;

//general routes error handler
exports.errorRouteHandler = (err,req,res,next) => {
   //handle error
   errorHandler(err,res);
}