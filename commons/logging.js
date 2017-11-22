const winston = require('winston');
const env = process.env.NODE_ENV || 'development';
const userLog = require('../models/logObj');


exports.LoggingFunction=function(logKey,Loggingstring)
{
let userErrLog = userLog.logObj(logKey, Loggingstring);

const tsFormat =  (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info'
        }),
        new (winston.transports.File)({
            filename: './logDir/results.log',
            timestamp: tsFormat,
            level: 'info',
            colorize: true
        })
    ]
});

logger.info(userErrLog);
// logger.warn(userErrLog);
// logger.debug(userErrLog);
// logger.log(userErrLog);
 
};

