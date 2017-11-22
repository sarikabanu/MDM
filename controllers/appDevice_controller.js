const AppDevice = require('../models/appDevice_model').AppDevice;
var jwt = require('../commons/jwt');
var logging  = require('../commons/logging');

function AppDeviceService() {

this.appLock = function(request,user_id,callback) {
const appDeviceModel = new AppDevice();
let appDeviceInstance = appDeviceModel.insertAppDevice(request,user_id);
 db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('appLock','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
    else{  
        con.query('insert into app_device set ?', appDeviceInstance, function (err, result) {
        if (err) {
                logging.LoggingFunction('appLock','err while inserting'+err);
                callback(new Error("err while inserting"));
                 }
         else{
            logging.LoggingFunction('appLock', 'rows inserted in database');
            callback(null, true);
             }
          });
        }
    });
},

// this.appInstall = function(request,user_id,callback) {
// const appDeviceModel = new AppDevice();
// let appDeviceInstance = appDeviceModel.insertAppDevice(request,user_id);
//  db.getConnection(function (err, con) {
//     if (err) {
//             logging.LoggingFunction('appInstall','error in connecting to database');
//             callback(new Error("error in connecting to database"));
//         }
//     else{  
//         con.query('insert into app_device set ?', appDeviceInstance, function (err, result) {
//         if (err) {
//                 logging.LoggingFunction('appInstall','err while inserting'+err);
//                 callback(new Error("err while inserting"));
//                  }
//          else{
//             logging.LoggingFunction('appInstall', 'rows inserted in database');
//             callback(null, true);
//              }
//           });
//         }
//     });
// },   

this.UpadteAppDevice = function(request,user_id,callback) {
        let response = {};
      const appDeviceModel = new AppDevice();
db.getConnection(function (err, con) {
      if (err) {
            logging.LoggingFunction('UpadteAppDevice','error in connecting to database');
            callback(new Error("error in connecting to database"));
        } 
        else{   
            con.query('Select * from app_device where Id=?', [request.id], function (err, result) {
                if (err) {
                    logging.LoggingFunction('UpadteAppDevice','could not get details of current appdevice'+err);
                    callback(new Error("could not get details of current appdevice"));
                }else{
                if(result.length>0){
                    let ans = appDeviceModel.upadteAppDevice(request,result);
                       con.query('update app_device set AppId = ?,DeviceId = ?,Duration = ?,ModifiedBy = ?,ModifiedDate=? where Id=?', [ans.app_id,ans.device_id,ans.duration,user_id,ans.ModifiedDate,request.id], function (err, result) {
                        if (err) {
                                logging.LoggingFunction('UpadteAppDevice','err while updating'+err);
                                callback(new Error("err while updating"));
                            }
                        else{
                            logging.LoggingFunction('UpadteAppDevice', 'rows updated in database');
                            callback(null, true);
                           }
                        });
                     }
                    else{
                    logging.LoggingFunction('UpadteAppDevice','data is not present to update');
                    callback(new Error("data is not present to update"));
                 }
               }
            });
          } 
       });
    },

    
 this.getAppDeviceById = function(id,callback) {
      const appDeviceModel = new AppDevice();
db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('getAppDeviceById','error in connecting to database');
            callback(new Error("error in connecting to database"));
            }
            con.query('select AppId, DeviceId,Duration, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, Status from  app_device where Id = ?  ',id, function (err, result) {
            if (err) {
                    logging.LoggingFunction('getAppDeviceById','could not get details of current appdevice'+err);
                    callback(new Error("could not get details of current appdevice"));
            }
            else{
                if(result.length>0){
                var response = appDeviceModel.getAppDeviceByIdResponse(result);
                logging.LoggingFunction('getAppDeviceById', 'retrieved rows from database');
                callback(null, response); 
            }
            else{
                logging.LoggingFunction('getAppDeviceById','data is not present');
                callback(new Error("data is not present"));
            }
         }
      });
    });
 },
    
this.listOfAppsTracked = function(callback) {
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('listOfAppsTracked','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select * from app_device ', function (err, result) {
            if (err) {
                    logging.LoggingFunction('listOfAppsTracked','could not get details of current apps tracked'+err);
                    callback(new Error("could not get details of current apps tracked"));
                  }
            else{
            if(result.length>0){
                logging.LoggingFunction('listOfAppsTracked', 'retrieved rows from database');
                callback(null, result); 
            }
            else{
                logging.LoggingFunction('listOfAppsTracked','data is not present');
                callback(new Error("data is not present"));
               }
             }
          });
        }
     });
   }
   
 this.appLockList = function(callback) {
    db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('appLockList','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select * from app_device where Status = -2 ', function (err, result) {
            if (err) {
                    logging.LoggingFunction('appLockList','could not get details of current lockedapp'+err);
                    callback(new Error("could not get details of current lockedapp"));
                  }
            else{
            if(result.length>0){
                logging.LoggingFunction('appLockList', 'retrieved rows from database');
                callback(null, result); 
            }
            else{
                logging.LoggingFunction('appLockList','data is not present');
                callback(new Error("data is not present"));
               }
             }
          });
        }
     });
 }

this.TimeUsageOnApp = function(request,user_id,callback) {
const appDeviceModel = new AppDevice();
console.log('userid'+user_id)
let appDeviceInstance = appDeviceModel.timeUsageOnApp(request,user_id);
 db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('TimeUsageOnApp','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
    else{  
        con.query('insert into app_device set ?', appDeviceInstance, function (err, result) {
        if (err) {
                logging.LoggingFunction('TimeUsageOnApp','err while inserting'+err);
                callback(new Error("err while inserting"));
                 }
         else{
            logging.LoggingFunction('TimeUsageOnApp', 'rows inserted in database');
            callback(null, true);
             }
          });
        }
    });
},

this.getTimeUsageOnAppById = function(request,callback) {
    db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getTimeUsageOnAppById','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select Duration from app_device where AppId = ? and DeviceId = ? ',[request.app_id,request.device_id], function (err, result) {
            if (err) {
                    logging.LoggingFunction('getTimeUsageOnAppById','could not get details of current app'+err);
                    callback(new Error("could not get details of current app"));
                  }
            else{
            if(result.length>0){
                let response = {
                    Duration:result[0].Duration
                }
                logging.LoggingFunction('getTimeUsageOnAppById', 'retrieved rows from database');
                callback(null, response); 
            }
            else{
                logging.LoggingFunction('getTimeUsageOnAppById','data is not present');
                callback(new Error("data is not present"));
                }
              }
           });
        }
     });
   }
}
module.exports = new AppDeviceService();
