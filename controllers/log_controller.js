const LogInfo = require('../models/log_model').Logs;
var jwt = require('../commons/jwt');
var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function LogService() {

this.InsertLog = function(request,user_id,callback) {
   const logModel = new LogInfo();

 let logInstance = logModel.insertLogs(user_id,request);
    db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('InsertLog','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
    else{  
        con.query('insert into logs set ?', logInstance, function (err, result) {
        if (err) {
                logging.LoggingFunction('InsertLog','err while inserting'+err);
                callback(new Error("err while inserting"));
                 }
            else{
                logging.LoggingFunction('InsertLog', 'rows inserted in database');
                callback(null, true);
                }
             });
           }
        });
     },

this.GetLogs = function(callback) {
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('GetLogs','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select * from logs ', function (err, result) {
            if (err) {
                    logging.LoggingFunction('GetLogs','could not get details of current log'+err);
                    callback(new Error("could not get details of current log"));
                  }
            else{
            if(result.length>0){
                logging.LoggingFunction('GetLogs', 'retrieved rows from database');
                callback(null, result); 
            }
            else{
                logging.LoggingFunction('GetLogs','data is not present');
                callback(new Error("data is not present"));
               }
             }
          });
        }
     });
   }
}
module.exports = new LogService();
