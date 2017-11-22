var adminservice = require('../controllers/admin_controller');
var jwt = require('../commons/jwt');
var logging  = require('../commons/logging');

function adminServices() {

 this.getAdminDetailsByMailId=function(req, res){
      let mail_id = req.body.mail_id
      let token = req.headers['x-access-token']
      console.log("token" + token)
      if(req.jwtToken.role_id==1){
          if (!mail_id) {
            res.send({status:0,message:'Missing mail_id in request',content:''})
            }else{
            adminservice.getAdminDetailsByMailId(mail_id,token,function(error,response){
            console.log('response  '+response)
            if(error){
               res.send({status:0,message:error.toString(),content:''})
            }
            else{
              res.send({status:1,message:'details of admin',content:response})
            }
        });  
       }
    }else{
          logging.LoggingFunction('getAdminDetailsByMailId','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
  },
  
 this.approveUser=function(req, res){
      let mail_id = req.body.mail_id
      let approval_status = req.body.approval_status
      let token = req.headers['x-access-token']
      console.log("token" + token)
      if(req.jwtToken.role_id==1){
          if (!req.body) {
            res.send({status:0,message:'Missing fields in request',content:''})
            }else{
            adminservice.approveUser(mail_id,approval_status,function(error,response){
            console.log('response  '+response)
            if(error){
                 res.send({status:0,message:error.toString(),content:''})
                }
            else{
               if(approval_status==-1){
                 res.send({status:1,message:'your request has been rejected',content:''})
               }else{
                 res.send({status:1,message:'your request has been approved',content:''})
               }
             }
          });  
        }
      }else{
          logging.LoggingFunction('approveUser','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
  },

this.listOfuser=function(req, res){
    let page = req.params.page;
     let reqitem = req.params.numOfItem;
    let token = req.headers['x-access-token']
      console.log("token" + token)
      if(req.jwtToken.role_id==1){
          if (!page || !reqitem) {
            res.send({status:0,message:'please specify page and numOfItem as request',content:''})
            }else{
            adminservice.listOfuser(page,reqitem,function(error,response){
            console.log('response  '+response)
            if(error){
                 res.send({status:0,message:error.toString(),content:''})
               }
          else{
                res.send({status:1,message:'details of user',content:response})
            }
         });  
       }
    }else{
          logging.LoggingFunction('listOfuser','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
  },

this.getAdminDetails=function(req, res){
      let token = req.headers['x-access-token']
      console.log("token" + token)
      if(req.jwtToken.role_id==1){
            adminservice.getAdminDetails(function(error,response){
            console.log('response  '+response)
            if(error){
              res.send({status:0,message:error.toString(),content:''})
            }
            else{
              res.send({status:1,message:'details of admin',content:response})
            }
        });  
    }else{
          logging.LoggingFunction('getAdminDetails','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
  }

this.adminUpdate=function(req, res){
      console.log("token")
      let token = req.headers['x-access-token']
      console.log("token" + token)
        if(req.jwtToken.role_id==1){
         if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
           } else{
            let user_id = req.jwtToken.user_id
            console.log('##########user_id'+user_id)
            // req.profile_url
            adminservice.adminUpdate(req.jwtToken,req.body,function(error,response){
            console.log('response  '+response)
            if(error){
                 res.send({status:0,message:error.toString(),content:''})
            }
            else{
                res.send({status:1,message:'updation successfull',content:''})
           }
        });  
      }
    }else{
          logging.LoggingFunction('adminUpdate','sorry you dont have permission to update');
          res.send({ status: 0, message:'sorry you dont have permission to update', content: '' })
     }
  }
}

module.exports = new adminServices();
