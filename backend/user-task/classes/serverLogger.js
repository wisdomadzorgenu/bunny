/**
 * This class handles the logging of errors/messages
 * All logs will be found at ./logs
 */
// const path = require("path");
// const winston = require('winston');
//   require('winston-daily-rotate-file');
 
// const logFormat =  winston.format.combine(
//    winston.format.colorize(),
//    winston.format.timestamp(),
//    winston.format.align(),
//    winston.format.printf(
//       info=>`${info.timestamp} ${info.level} ${info.message}`
//    )
// );

// //transport for handling error logs
// const errTransport = new (winston.transports.DailyRotateFile)({
//    filename: 'error-%DATE%.log',
//    datePattern: 'YYYY-MM',
//    zippedArchive: true,
//    maxSize: '50m',
//    dirname: path.resolve(__dirname,"..","logs")
// });

// //create error logger
// const errLogger = winston.createLogger({
//    format: logFormat,
//    transports: [
//       errTransport
//    ]
// });

class ServerLogger {
   /**
    * Write error to the log file 
    * @param {string} errorMsg - error message
    * @param {method} stacktrace - error stacktrace
    */
   static writeErrorsToLog(errorMsg, stacktrace) {
      let logMsg = "\tERROR MSG :=> " + errorMsg;
      logMsg += "\n\tSTACKTRACE:" + stacktrace;

     //naming convention: current log file is named log_current
      //ALGORITHM for rotating log files based on time
      // errLogger.log("error",logMsg);
   }
}

//export
module.exports = ServerLogger;
