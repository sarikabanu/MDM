const Admin = require('../models/admin_model').Admin;
var awsUpload = require('../commons/awsUpload');
const awspath = "https://s3.amazonaws.com/musicapp-bucket/";
var logging  = require('../commons/logging');


function AdminService() {
   
this.getAdminDetailsByMailId = function(mail_id,token,callback) {
        let response = {};
        const adminModel = new Admin();
     db.getConnection(function (err, con) {
            if (err) {
                    logging.LoggingFunction('getAdminDetailsByMailId','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                 }
         else{
              con.query('Select * from user where MailId = ?', mail_id, function (err, result) {
                if (err) {
                    logging.LoggingFunction('getAdminDetailsByMailId','could not get details of current admin'+err);
                    callback(new Error("could not get details of current admin"));
                }
                else{
                    if(result.length>0){
                       console.log('data is present ') 
                       con.query('Select Id,Name,PhoneNumber,Password,ProfileUrl from user where MailId = ?', mail_id, function (err, Userresult) {
                              if (err) {
                                logging.LoggingFunction('getAdminDetailsByMailId','could not get details of current admin'+err);
                                callback(new Error("could not get details of current admin"));
                               }
                         else{
                            console.log('retreiving details')
                            var response = adminModel.getAdminDetailsByMailIdResponse(Userresult,mail_id,token);
                            logging.LoggingFunction('getAdminDetailsByMailId', 'retreived rows from database');
                            callback(null, response);
                            }
                         });
                     }
                   else{
                        logging.LoggingFunction('getAdminDetailsByMailId','no rows present');
                        callback(new Error("no rows present"));
                   }
                }
             });
         }
    });
 }
 
 this.approveUser = function(mail_id,approval_status,callback) {
        let response = {};
        const adminModel = new Admin();
         let adminInstance = adminModel.approveByAdmin();
     db.getConnection(function (err, con) {
            if (err) {
                    logging.LoggingFunction('approveUser','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                }
         else{
              con.query('Select * from user where MailId = ? and RoleId = 2', mail_id, function (err, result) {
                if (err) {
                    logging.LoggingFunction('approveUser','could not get details of current user'+err);
                    callback(new Error("could not get details of current user"));
                }
                else{
                    if(result.length>0){
                       console.log('data is present ') 
                       con.query('update user set ApprovalStatus = ?,ModifiedDate=? where MailId=?', [approval_status,adminInstance.ModifiedDate,mail_id] ,function (err, Userresult) {
                              if (err) {
                                logging.LoggingFunction('approveUser','could not get details of current user'+err);
                                callback(new Error("could not get details of current user"));
                               }
                         else{
                            console.log('retreiving details')
                            logging.LoggingFunction('approveUser', 'retreived rows from database');
                            callback(null, true);
                            }
                         });
                     }
                   else{
                        logging.LoggingFunction('approveUser','no rows present');
                        callback(new Error("no rows present"));
                   }
                }
             });
         }
    });
 }

 this.listOfuser = function(page,reqitem,callback) {
        let response = {};
        const adminModel = new Admin();
     db.getConnection(function (err, con) {
            if (err) {
                    logging.LoggingFunction('listOfuser','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                 }
         else{
                current_page = page || 1
                items_per_page = reqitem
                start_index = (current_page - 1) * items_per_page
                console.log('start_index  '+[start_index]);
                con.query('SELECT count(id) as count FROM user', (err, rows) => {
             if (err) {
                    logging.LoggingFunction('listOfuser','could not get count of  user'+err);
                    callback(new Error("could not get count of  user"));
                }
            else{
                 const total_items = rows[0].count;
                console.log("total_items  "+total_items);
                total_pages = Math.ceil(total_items / items_per_page)
                con.query('SELECT Id, RoleId, Name, PhoneNumber, MailId, Password, ProfileUrl, CreatedDate, ModifiedDate,Status,ApprovalStatus,FcmToken from user  ORDER BY ApprovalStatus Desc LIMIT '+ [start_index, items_per_page], function (err, result) {
            if (err) {
                    logging.LoggingFunction('listOfuser','could not get details of current user'+err);
                    callback(new Error("could not get details of current user"));
                }
                
            else{
                if(result.length>0){
                let response = {
                 total_items,
                 result
                }
                logging.LoggingFunction('listOfuser', 'retreived rows from database');
                callback(null, response);
                }
                else{
                    logging.LoggingFunction('listOfuser','data is not present');
                    callback(new Error("data is not present"));
                    }
                  }
               });
             }
           });
         }
    });
 }


 this.getAdminDetails = function(callback) {
        let response = {};
     db.getConnection(function (err, con) {
            if (err) {
                    logging.LoggingFunction('getAdminDetails','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                 }
         else{
              con.query('Select * from user where RoleId = 1', function (err, result) {
                if (err) {
                    logging.LoggingFunction('getAdminDetails','could not get details of current admin');
                    callback(new Error("could not get details of current admin"));
                }
                else{
                    if(result.length>0){
                       console.log('data is present ') 
                       logging.LoggingFunction('getAdminDetails', 'retreived rows from database');
                       callback(null, result);
                    }
                    else{
                        logging.LoggingFunction('getAdminDetails','no rows present');
                        callback(new Error("no rows present"));
                     }
                  }
            });
        }
    });
}

this.adminUpdate = function(tokenresult,request, callback) {
     var profile_url=request.profileUrl
    //    var profile_url=awspath+profileUrl
        let response = {};
        const adminModel = new Admin();
        db.getConnection(function (err, con) {
                if (err) {
                    logging.LoggingFunction('adminUpdate','error in connecting to database');
                    callback(new Error("error in connecting to database"));
                }
         else{
        con.query('Select * from user where MailId = ?', [tokenresult.mail_id], function (err, result) {
             if (err) {
                    logging.LoggingFunction('adminUpdate','could not get details of current admin');
                    callback(new Error("could not get details of current admin"));
                 }
                else{
                if(result.length>0){
                let ans = adminModel.updateAdmin(request,result,profile_url) 
                    console.log('data is present '+ans.name) 
                       con.query('update user set Name = ?,PhoneNumber = ?,Password = ?,ProfileUrl = ?,ModifiedDate = ? where MailId= ? ', [ans.name,ans.phonenumber,ans.password,ans.profileUrl,ans.ModifiedDate,tokenresult.mail_id], function (err, result) {
                     if (err) {
                            console.log('err '+err) 
                            logging.LoggingFunction('adminUpdate','err while updating'+err);
                            callback(new Error("err while updating"));
                        }
                     else{
                        logging.LoggingFunction('adminUpdate', 'rows updated in database');
                        callback(null, true);
                        }
                     });
                }
            else{
                logging.LoggingFunction('adminUpdate','data is not present to update');
                callback(new Error("data is not present to update"));
               }
            }
        });
      }
   });
 }  
 
}
module.exports = new AdminService();
