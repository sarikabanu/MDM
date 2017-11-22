const DeviceInfo = require('../models/deviceInfo_model').DeviceInfo;
var jwt = require('../commons/jwt');
var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function DeviceInfoService() {

this.InsertDeviceInfo = function(request,user_id,callback) {
   const deviceInfoModel = new DeviceInfo();

 let deviceInfoInstance = deviceInfoModel.insertDeviceInfo(user_id,request);
    db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('InsertDeviceInfo','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
    else{  
        con.query('insert into deviceinfo set ?', deviceInfoInstance, function (err, result) {
        if (err) {
                logging.LoggingFunction('InsertDeviceInfo','err while inserting'+err);
                callback(new Error("err while inserting"));
                 }
            else{
                logging.LoggingFunction('InsertDeviceInfo', 'rows inserted in database');
                callback(null, true);
                }
             });
           }
        });
     },
     
this.UpadteDeviceInfo = function(request,user_id,callback) {
        let response = {};
      const deviceInfoModel = new DeviceInfo();

 db.getConnection(function (err, con) {
      if (err) {
            logging.LoggingFunction('UpadteDeviceInfo','error in connecting to database');
            callback(new Error("error in connecting to database"));
        } 
        else{   
            con.query('Select * from deviceinfo where Id=?', [request.id], function (err, result) {
                if (err) {
                    logging.LoggingFunction('UpadteDeviceInfo','could not get details of current device'+err);
                    callback(new Error("could not get details of current device"));
                }else{
                if(result.length>0){
                    let ans = deviceInfoModel.upadteDeviceInfo(request,result);
                       con.query('update deviceinfo set UserId = ?,DeviceId = ?,Lattitude = ?,Longitude = ?,Description=?,ModifiedBy = ?,ModifiedDate=? where Id=?', [ans.user_id,ans.device_id,ans.lattitude,ans.longitude,ans.description,user_id,ans.ModifiedDate,request.id], function (err, result) {
                        if (err) {
                                logging.LoggingFunction('UpadteDeviceInfo','err while updating'+err);
                                callback(new Error("err while updating"));
                            }
                        else{
                            logging.LoggingFunction('UpadteDeviceInfo', 'rows updated in database');
                            callback(null, true);
                           }
                        });
                     }
                    else{
                    logging.LoggingFunction('UpadteDeviceInfo','data is not present to update');
                    callback(new Error("data is not present to update"));
                 }
               }
            });
          } 
       });
    },

    
 this.getDeviceInfoById = function(id,callback) {
      const deviceInfoModel = new DeviceInfo();
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getDeviceInfoById','error in connecting to database');
            callback(new Error("error in connecting to database"));
            }
            con.query('select UserId,DeviceId, Lattitude,Longitude, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, Status from  deviceinfo where Id = ?  ',id, function (err, result) {
            if (err) {
                    logging.LoggingFunction('getDeviceInfoById','could not get details of current device'+err);
                    callback(new Error("could not get details of current device"));
            }
            else{
                if(result.length>0){
                var response = deviceInfoModel.getDeviceInfoByIdResponse(result);
                logging.LoggingFunction('getDeviceInfoById', 'retrieved rows from database');
                callback(null, response); 
            } 
            else{
                logging.LoggingFunction('getDeviceInfoById','data is not present');
                callback(new Error("data is not present"));
            }
         }
      });
    });
 },
    
this.getDeviceInfo = function(callback) {
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getDeviceInfo','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select * from deviceinfo ', function (err, result) {
            if (err) {
                    logging.LoggingFunction('getDeviceInfo','could not get details of current device'+err);
                    callback(new Error("could not get details of current device"));
                  }
            else{
            if(result.length>0){
                logging.LoggingFunction('getDeviceInfo', 'retrieved rows from database');
                callback(null, result); 
            }
            else{
                logging.LoggingFunction('getDeviceInfo','data is not present');
                callback(new Error("data is not present"));
               }
             }
          });
        }
     });
   }
}
module.exports = new DeviceInfoService();
