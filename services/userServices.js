var userservice = require('../controllers/user_controller');
var jwt = require('../commons/jwt');
var logging  = require('../commons/logging');

function userServices() {

 this.getUserDetailsById=function(req, res){
      let id = req.body.id
      let token = req.headers['x-access-token']
      console.log("token" + token)
      if(req.jwtToken.role_id==1 || req.jwtToken.role_id==2 ){
          if (!req.body) {
            res.send({status:0,message:'Missing id in request',content:''})
            }else{
            userservice.getUserDetailsById(id,function(error,response){
            console.log('response  '+response)
            if(response){
            res.send({status:1,message:'details of user',content:response})
            }
            else{
            res.send({status:0,message:error.toString(),content:''})
            }
          });  
        }
      }else{
          logging.LoggingFunction('getUserDetailsById','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
  },
  
this.getUserDetails=function(req, res){
      let token = req.headers['x-access-token']
      console.log("token" + token)
      if(req.jwtToken.role_id==1|| req.jwtToken.role_id==2 ){
            userservice.getUserDetails(function(error,response){
            console.log('response  '+response)
            if(response){
            res.send({status:1,message:'details of user',content:response})
            }
            else{
            res.send({status:0,message:error.toString(),content:''})
            }
        });  
    }else{
          logging.LoggingFunction('getUserDetails','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
  }

this.userUpdate=function(req, res){
        console.log("token")
        let token = req.headers['x-access-token']
        console.log("token" + token)
        if(req.jwtToken.role_id==2){
         if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
           } else{
            let user_id = req.jwtToken.user_id
            console.log('##########user_id'+user_id)
            // req.profile_url
            userservice.userUpdate(req.jwtToken,req.body,function(error,response){
            console.log('response  '+response)
            if(response){
            res.send({status:1,message:'updation successfull',content:''})
            }
            else{
          res.send({status:0,message:error.toString(),content:''})
          }
        });  
      }
    }else{
          logging.LoggingFunction('userUpdate','sorry you dont have permission to update');
          res.send({ status: 0, message:'sorry you dont have permission to update', content: '' })
     }
 }
}

module.exports = new userServices();