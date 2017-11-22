const User = require('../models/user_model').User;
var jwt = require('../commons/jwt');
var awsUpload = require('../commons/awsUpload');
const awspath = "https://s3.amazonaws.com/musicapp-bucket/";
var logging  = require('../commons/logging');


function UserService() {
   
this.getUserDetailsById = function(id,token,callback) {
        // let response = {};
        const userModel = new User();
     db.getConnection(function (err, con) {
            if (err) {
                    logging.LoggingFunction('getUserDetailsById','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                 }
         else{
              con.query('Select * from user where Id = ?', id, function (err, result) {
                if (err) {
                    logging.LoggingFunction('getUserDetailsById','could not get details of current user'+err);
                    callback(new Error("could not get details of current user"));
                }
                else{
                    if(result.length>0){
                       console.log('data is present ') 
                       con.query('Select Id,Name,PhoneNumber,MailID,Password,DeviceId,ProfileUrl,ApprovalStatus from user where Id=?', id, function (err, Userresult) {
                              if (err) {
                                logging.LoggingFunction('getUserDetailsById','could not get details of current user'+err);
                                callback(new Error("could not get details of current user"));
                               }
                         else{
                            console.log('retreiving details')
                            var response = userModel.getUserDetailsByIdResponse(Userresult,mail_id);
                            logging.LoggingFunction('getUserDetailsById', 'retreived rows from database');
                            callback(null, response);
                            }
                         });
                     }
                   else{
                        logging.LoggingFunction('getUserDetailsById','no rows present');
                        callback(new Error("no rows present"));
                   }
                }
             });
         }
    });
 }
 
 this.getUserDetails = function(callback) {
    //     let response = {};
     db.getConnection(function (err, con) {
            if (err) {
                    logging.LoggingFunction('getUserDetails','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                 }
         else{
              con.query('Select * from user where RoleId = 2', function (err, result) {
                if (err) {
                    logging.LoggingFunction('getUserDetails','could not get details of current user'+err);
                    callback(new Error("could not get details of current user"));
                }
                else{
                    if(result.length>0){
                       console.log('data is present ') 
                       logging.LoggingFunction('getUserDetails', 'retreived rows from database');
                       callback(null, result);
                    }
                    else{
                        logging.LoggingFunction('getUserDetails','no rows present');
                        callback(new Error("no rows present"));
                     }
                  }
            });
        }
    });
}

this.userUpdate = function(tokenresult,request, callback) {
    // var profile_url=awspath+profile_url
       var profile_url=request.profile_url
        // let response = {};
        const userModel = new User();
        db.getConnection(function (err, con) {
                if (err) {
                    logging.LoggingFunction('userUpdate','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                }
         else{
        con.query('Select * from user where Id=?', [tokenresult.user_id], function (err, result) {
             if (err) {
                    logging.LoggingFunction('userUpdate','could not get details of current user'+err);
                    callback(new Error("could not get details of current user"));
                 }
                else{
                if(result.length>0){
                let ans = userModel.updateUser(request,result,profile_url) 
                    console.log('data is present '+ans.name) 
                       con.query('update user set Name =?,PhoneNumber=?,Password=?,DeviceId = ?,ProfileUrl=?,FcmToken = ?,ModifiedBy=?,ModifiedDate=? where MailId=?', [ans.name,ans.phonenumber,ans.password,ans.device_id,ans.profileUrl,ans.fcm_token,result[0].Id,ans.ModifiedDate,tokenresult.mail_id], function (err, result) {
                     if (err) {
                            logging.LoggingFunction('userUpdate','err while updating'+err);
                            callback(new Error("err while updating"));
                        }
                     else{
                        console.log('updated')
                        con.query('select * from user where MailId = ? ',[tokenresult.mail_id], function (err, result) {
                                if (err) {
                                    logging.LoggingFunction('UpdateUser','could not get details of current user'+err);
                                    callback(new Error("could not get details of current user"));
                                    }
                                else {
                                    if(result.length>0){
                                     console.log('updated details')
                                    var response = userModel.userUpdateResponse(result);
                                    logging.LoggingFunction('UpdateUser', 'rows updated in database');
                                    callback(null, response);
                                     }
                                else{
                                    logging.LoggingFunction('UpdateUser','data is not present');
                                    callback(new Error("data is not present"));
                                    }
                                }
                          });
                        }
                     });
                }
            else{
                logging.LoggingFunction('userUpdate','data is not present to update');
                callback(new Error("data is not present to update"));
               }
            }
        });
      }
   });
 }  
 
}
module.exports = new UserService();
