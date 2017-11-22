const AppInfo = require('../models/appInfo_model').AppInfo;
var jwt = require('../commons/jwt');
const awspath = "https://s3.amazonaws.com/musicapp-bucket/";
var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function AppInfoService() {

this.InsertAppInfo = function(request,user_id,callback) {
   const appInfoModel = new AppInfo();
//    var icon_url=awspath+iconFileName
   var icon_url=request.icon_url

 let appInfoInstance = appInfoModel.insertAppInfo(user_id,request,icon_url);
    db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('InsertAppInfo','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
    else{  
        con.query('insert into appinfo set ?', appInfoInstance, function (err, result) {
        if (err) {
                logging.LoggingFunction('InsertAppInfo','err while inserting'+err);
                callback(new Error("err while inserting"));
                 }
        else{
            con.query('select FcmToken from user', function (err, result) {
              if (err) {
                    logging.LoggingFunction('InsertAppInfo','could not get details of current app'+err);
                    callback(new Error("could not get details of current app"));
                    }
                else{
                    const fcm_token = result.length
                     for(i=0;i<fcm_token;i++){
                         console.log('count ===  '+i) 
                         let fcmtoken = result[i].FcmToken
                          if(fcmtoken!=null)
                          {
                            console.log('not null fcm token  '+fcmtoken) 
                            notify.sendNotification(fcmtoken);
                          }
                        }
                    logging.LoggingFunction('InsertAppInfo', 'rows inserted in database');
                    callback(null, true);
                    }
                 });
                }
             });
           }
        });
     },

this.UpadteAppInfo = function(request,user_id,callback) {
        let response = {};
        const appInfoModel = new AppInfo();
           var icon_url=request.icon_url
        // var icon_url=awspath+iconFileName

 db.getConnection(function (err, con) {
      if (err) {
            logging.LoggingFunction('UpadteAppInfo','error in connecting to database');
            callback(new Error("error in connecting to database"));
        } 
        else{   
            con.query('Select * from appinfo where Id=?', [request.id], function (err, result) {
                if (err) {
                    logging.LoggingFunction('UpadteAppInfo','could not get details of current app'+err);
                    callback(new Error("could not get details of current app"));
                }else{
                if(result.length>0){
                    let ans = appInfoModel.upadteAppInfo(request,result,icon_url);
                       con.query('update appinfo set Name=?,Icon =?,Description=?,ModifiedBy = ?,ModifiedDate=? where Id=?', [ans.name,ans.iconUrl,ans.description,user_id,ans.ModifiedDate,request.id], function (err, result) {
                        if (err) {
                                logging.LoggingFunction('UpadteAppInfo','err while updating'+err);
                                callback(new Error("err while updating"));
                            }
                        else{
                            logging.LoggingFunction('UpadteAppInfo', 'rows updated in database');
                            callback(null, true);
                           }
                        });
                     }
                    else{
                    logging.LoggingFunction('UpadteAppInfo','data is not present to update');
                    callback(new Error("data is not present to update"));
                 }
               }
            });
          } 
       });
    },

 this.getAppInfoById = function(id,callback) {
   const appInfoModel = new AppInfo();
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getAppInfoById','error in connecting to database');
            callback(new Error("error in connecting to database"));
            }
            con.query('select Name, Icon , Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, Status from  appinfo where Id = ?  ',id, function (err, result) {
            if (err) {
                    logging.LoggingFunction('getAppInfoById','could not get details of current app'+err);
                    callback(new Error("could not get details of current app"));
            }
            else{
                if(result.length>0){
                var response = appInfoModel.getAppInfoByIdResponse(result);
                logging.LoggingFunction('getAppInfoById', 'retrieved rows from database');
                callback(null, response); 
            }
            else{
                logging.LoggingFunction('getAppInfoById','data is not present');
                callback(new Error("data is not present"));
            }
         }
      });
    });
 },
    
this.getAppInfo = function(callback) {
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getAppInfo','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select * from appinfo ', function (err, result) {
            if (err) {
                    logging.LoggingFunction('getAppInfo','could not get details of current app'+err);
                    callback(new Error("could not get details of current app"));
                  }
            else{
            if(result.length>0){
                logging.LoggingFunction('getAppInfo', 'retrieved rows from database');
                callback(null, result); 
            }
            else{
                logging.LoggingFunction('getAppInfo','data is not present');
                callback(new Error("data is not present"));
               }
             }
          });
        }
     });
   }

 }

module.exports = new AppInfoService();
