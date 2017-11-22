const Admin = require('../models/admin_model').Admin;
const User = require('../models/user_model').User;
var jwt = require('../commons/jwt');
var awsUpload = require('../commons/awsUpload');
const awspath = "https://s3.amazonaws.com/musicapp-bucket/";
var logging  = require('../commons/logging');

function AdminService() {

    this.loginAdmin = function(request, callback) {
        let response = {};
        const adminModel = new Admin();
        db.getConnection(function (err, con) {
             if (err) {
                logging.LoggingFunction('login admin', 'error in connecting to database');
                callback(new Error("error in connecting to database"));
                }
           else{
                 con.query('Select Id from user where MailId = ? and Password = ?', [request.mail_id,request.password], function (err, userResult) {
                    if (err) {
                         logging.LoggingFunction('login admin','could not get details of current user');
                         callback(new Error("could not get details of current user"));
                    }
                   else{
                        console.log('userResult.length'+userResult.length)
                        if(userResult.length>0){
                        console.log('data is present')
                        console.log(' [userResult[0].Id]' +userResult[0].Id)
                        console.log('got details') 
                       
                        con.query('select * from user where MailId =? and Password= ? and RoleID = ? ',[request.mail_id,request.password,request.role_id] ,function (err, result) {
                          if (err) {
                            logging.LoggingFunction('login admin','err in retrieving details of user');
                            callback(new Error("err in retrieving details of user"));
                            }
                         else{
                           if(result.length>0){
                                let token =jwt.generate(request.mail_id,request.role_id,userResult[0].Id)
                                response = {
                                      token:token
                                    }
                               
                                logging.LoggingFunction('login admin', 'rows updated in database');
                                callback(null, response);
                             }
                          else{
                            logging.LoggingFunction('login admin','no rows present in database to update');
                            callback(new Error("no rows present in database to update"));
                             }
                            }
                         });                 
                        }
                  else{
                        logging.LoggingFunction('login admin','data is not present');
                         callback(new Error("data is not present"));
                       }
                   }
              });
         }
     });
 }

this.loginUser = function(request, callback) {
//  var profile_url=awspath+profileurl
  var profile_url=request.profile_url
        let response = {};
        const userModel = new User();
  db.getConnection(function (err, con) {
            if (err) {
               logging.LoggingFunction('loginUser','error in connecting to database');
               callback(new Error("error in connecting to database"));
            }
            else {
                con.query('Select Id from user where MailId=?', [request.mail_id], function (err, userResult) {
                 if (err) {
                    logging.LoggingFunction('loginUser','could not get details of current user');
                    callback(new Error("could not get details of current user"));
                    }
                    else {
                        console.log('userResult.length'+userResult.length)
                        if (userResult.length > 0) {
                            console.log('data is present')
                            con.query('Select ProfileUrl from user where Id = ? ', [userResult[0].Id], function (err, result) {
                                if (err) {
                                    logging.LoggingFunction('loginUser','err in retrieving details for updating');
                                    callback(new Error("err in retrieving details for updating"));
                                } 
                                else {
                                    var result1 = result[0].ProfileUrl;
                                    if (result1 == null && profile_url != "" || result1 == null && profile_url == "" || result1 != null && profile_url != "") {
                                        console.log('checking')
                                        con.query('update user set ProfileUrl=? where MailId = ? ', [profile_url,request.mail_id], function (err, result) {
                                            if (err) {
                                                logging.LoggingFunction('loginUser','err while updating user');
                                                callback(new Error("err while updating user"));
                                            }
                                            else {
                                                console.log('updated')
                                                con.query('select * from user where MailId = ? ', [request.mail_id], function (err, result) {
                                                    if (err) {
                                                        logging.LoggingFunction('loginUser','err in retrieving details after update');
                                                        callback(new Error("err in retrieving details after update"));
                                                    }
                                                    else {
                                                        console.log('updated details')
                                                        let token = jwt.generate(result[0].MailId,request.role_id, result[0].Id)
                                                        var response = userModel.userResponse(result, token);
                                                        logging.LoggingFunction('loginUser', 'rows updated in database');
                                                        callback(null, response);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        if(result1 != null && profile_url == ""||result1 != null && profile_url == null){
                                         con.query('select * from user where MailId = ? ', [request.mail_id], function (err, result) {
                                            if (err) {
                                                logging.LoggingFunction('loginUser','err while updating');
                                                callback(new Error("err while updating"));
                                            }
                                            else {
                                                console.log('updated details')
                                                let token = jwt.generate(result[0].MailId, request.role_id,result[0].Id)
                                                var response = userModel.userResponse(result, token);
                                                logging.LoggingFunction('loginUser', 'rows updated in database');
                                                callback(null, response);
                                                 }
                                            });
                                         }
                                     else{
                                         con.query('select * from user where MailId = ? ', [request.mail_id], function (err, result) {
                                            if (err) {
                                                logging.LoggingFunction('loginUser','err while retreiving details to update');
                                                callback(new Error("err while retreiving details to update"));
                                            }
                                            else {
                                            if(result.length>0){
                                                let token = jwt.generate(result[0].MailId, request.role_id,result[0].Id)
                                                var response = userModel.userResponse(result, token);
                                                logging.LoggingFunction('loginUser', 'rows updated in database');
                                                callback(null, response);
                                             } else{
                                                logging.LoggingFunction('loginUser','no rows in database');
                                                callback(new Error("no rows in database"));
                                             }
                                           }
                                        });
                                     }
                                 }
                             }
                         });
                     }
              else {
                  let userInstance = userModel.loginUser(request,profile_url);
                    console.log('inserting'+profile_url)
                    con.query('insert into user set ?', userInstance, function (err, result) {
                                if (err) {
                                     console.log('inserting'+err)
                                    logging.LoggingFunction('loginUser','err while inserting');
                                    callback(new Error("err while inserting"));
                                 }
                                else {
                                    console.log('data is insertion successfull')
                                    con.query('select * from User where MailId = ? ', [request.mail_id], function (err, result) {
                                        if (err) {
                                            logging.LoggingFunction('loginUser','err in retrieving details after insertion');
                                            callback(new Error("err in retrieving details after insertion"));
                                        }
                                        else {
                                            console.log('inserted details')
                                            let token = jwt.generate(result[0].MailId, request.role_id,result[0].Id)
                                            var response = userModel.userResponse(result, token);
                                            logging.LoggingFunction('loginUser', 'rows inserted in database');
                                            callback(null, response);
                                         }

                                     });
                                 }
                            });
                        }
                     }
                });
             }
        });
    }
}

module.exports = new AdminService();
