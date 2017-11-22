const Policy = require('../models/policy_model').Policy;
var jwt = require('../commons/jwt');
var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function PolicyService() {

this.PolicyInsert = function(request,user_id,callback) {
   const policyModel = new Policy();

 let policyInstance = policyModel.insertPolicy(user_id,request);
    db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('PolicyInsert','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
    else{  
        con.query('insert into policies set ?', policyInstance, function (err, result) {
        if (err) {
                console.log(err)
                logging.LoggingFunction('PolicyInsert','err while inserting'+err);
                callback(new Error("err while inserting"));
                 }
            else{
            con.query('select FcmToken from user', function (err, result) {
              if (err) {
                    logging.LoggingFunction('PolicyInsert','could not get details of current user'+err);
                    callback(new Error("could not get details of current user"));
                    }
                else{
                    console.log(' fcm token  '+result[0].FcmToken) 
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
                logging.LoggingFunction('PolicyInsert', 'rows inserted in database');
                callback(null, true);
                    }
                 });
               
                }
             });
           }
        });
     },
     
this.PolicyUpdate = function(request,user_id,callback) {
        let response = {};
       const policyModel = new Policy();
db.getConnection(function (err, con) {
      if (err) {
            logging.LoggingFunction('PolicyUpdate','error in connecting to database');
            callback(new Error("error in connecting to database"));
        } 
        else{   
            con.query('Select * from policies where Id=?', [request.id], function (err, result) {
                if (err) {
                    logging.LoggingFunction('PolicyUpdate','could not get details of current policy'+err);
                    callback(new Error("could not get details of current policy"));
                }else{
                if(result.length>0){
                    let ans = policyModel.upadtePolicy(request,result);
                       con.query('update policies set Name = ?,Description=?,ModifiedBy = ?,ModifiedDate=? where Id=?', [ans.name,ans.description,user_id,ans.ModifiedDate,request.id], function (err, result) {
                        if (err) {
                                logging.LoggingFunction('PolicyUpdate','err while updating'+err);
                                callback(new Error("err while updating"));
                            }
                        else{
                            logging.LoggingFunction('PolicyUpdate', 'rows updated in database');
                            callback(null, true);
                           }
                        });
                     }
                    else{
                    logging.LoggingFunction('PolicyUpdate','data is not present to update');
                    callback(new Error("data is not present to update"));
                 }
               }
            });
          } 
       });
    },

    
 this.getPolicyById = function(id,callback) {
       const policyModel = new Policy();
db.getConnection(function (err, con) {
    if (err) {
            logging.LoggingFunction('getPolicyById','error in connecting to database');
            callback(new Error("error in connecting to database"));
            }
            con.query('select Name, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, Status from  policies where Id = ?  ',id, function (err, result) {
            if (err) {
                    logging.LoggingFunction('getPolicyById','could not get details of current policy'+err);
                    callback(new Error("could not get details of current policy"));
            }
            else{
                if(result.length>0){
                var response = policyModel.getPolicyByIdResponse(result);
                logging.LoggingFunction('getPolicyById', 'retrieved rows from database');
                callback(null, response); 
            }
            else{
                logging.LoggingFunction('getPolicyById','data is not present');
                callback(new Error("data is not present"));
            }
         }
      });
    });
 },
    
this.getPolicy = function(callback) {
     db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getPolicy','error in connecting to database');
            callback(new Error("error in connecting to database"));
        }
      else{
     con.query('Select * from policies ', function (err, result) {
            if (err) {
                    logging.LoggingFunction('getPolicy','could not get details of current policy'+err);
                    callback(new Error("could not get details of current policy"));
                  }
            else{
            if(result.length>0){
                logging.LoggingFunction('getPolicy', 'retrieved rows from database');
                callback(null, result); 
            }
            else{
                logging.LoggingFunction('getPolicy','data is not present');
                callback(new Error("data is not present"));
               }
             }
          });
        }
     });
   }
}
module.exports = new PolicyService();
