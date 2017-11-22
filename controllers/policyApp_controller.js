const PolicyApp = require('../models/policyApp_model').PolicyApp;
var jwt = require('../commons/jwt');
// const awspath = "https://s3.amazonaws.com/musicapp-bucket/";
var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function PolicyAppService() {

this.PolicyAppInsert = function(request,user_id,callback) {
   const policyAppModel = new PolicyApp();

 let policyAppInstance = policyAppModel.insertPolicyApp(user_id,request);
    db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('PolicyAppInsert','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
    else{  
        con.query('insert into policy_app set ?', policyAppInstance, function (err, result) {
        if (err) {
                logging.LoggingFunction('PolicyAppInsert','err while inserting'+err);
                callback(new Error("err while inserting"));
                 }
            else{
                logging.LoggingFunction('PolicyAppInsert', 'rows inserted in database');
                callback(null, true);
                }
             });
           }
        });
     },
     
this.PolicyAppUpdate = function(request,user_id,callback) {
        let response = {};
   const policyAppModel = new PolicyApp();
db.getConnection(function (err, con) {
      if (err) {
            logging.LoggingFunction('PolicyAppUpdate','error in connecting to database');
            callback(new Error("error in connecting to database"));
        } 
        else{   
            con.query('Select * from policy_app where Id=?', [request.id], function (err, result) {
                if (err) {
                    logging.LoggingFunction('PolicyAppUpdate','could not get details of current policy'+err);
                    callback(new Error("could not get details of current policy"));
                }else{
                if(result.length>0){
                    let ans = policyAppModel.upadtePolicyApp(request,result);
                       con.query('update policy_app set AppId = ?,PolicyId=?,Duration = ?,Description = ?,ModifiedBy = ?,ModifiedDate=? where Id=?', [ans.app_id,ans.policy_id,ans.duration,ans.description,user_id,ans.ModifiedDate,request.id], function (err, result) {
                        if (err) {
                                logging.LoggingFunction('PolicyAppUpdate','err while updating'+err);
                                callback(new Error("err while updating"));
                            }
                        else{
                            logging.LoggingFunction('PolicyAppUpdate', 'rows updated in database');
                            callback(null, true);
                           }
                        });
                     }
                    else{
                    logging.LoggingFunction('PolicyAppUpdate','data is not present to update');
                    callback(new Error("data is not present to update"));
                 }
               }
            });
          } 
       });
    },
 
 this.getPolicyAppById = function(id,callback) {
   const policyAppModel = new PolicyApp();
db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('getPolicyAppById','error in connecting to database');
            callback(new Error("error in connecting to database"));
            }
            con.query('select AppId,PolicyId,Duration, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, Status from  policy_app where Id = ?  ',id, function (err, result) {
            if (err) {
                    logging.LoggingFunction('getPolicyAppById','could not get details of current policy'+err);
                    callback(new Error("could not get details of current policy"));
            }
            else{
                if(result.length>0){
                var response = policyAppModel.getPolicyAppByIdResponse(result);
                logging.LoggingFunction('getPolicyAppById', 'retrieved rows from database');
                callback(null, response); 
            }
            else{
                logging.LoggingFunction('getPolicyAppById','data is not present');
                callback(new Error("data is not present"));
            }
         }
      });
    });
 },
    
this.getPolicyApp = function(callback) {
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getPolicyApp','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select * from policy_app ', function (err, result) {
            if (err) {
                    logging.LoggingFunction('getPolicyApp','could not get details of current policyapp'+err);
                    callback(new Error("could not get details of current policyapp"));
                  }
            else{
            if(result.length>0){
                logging.LoggingFunction('getPolicyApp', 'retrieved rows from database');
                callback(null, result); 
            }
            else{
                logging.LoggingFunction('getPolicyApp','data is not present');
                callback(new Error("data is not present"));
               }
             }
          });
        }
     });
   }
}
module.exports = new PolicyAppService();
