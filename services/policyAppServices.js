const policyappservice = require('../controllers/policyApp_controller');
var jwt = require('../commons/jwt');
// var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function policyAppServices(){

this.policyAppInsert=function(req, res){
      let token = req.headers['x-access-token']
      console.log("token  " +token)
      if(req.jwtToken.role_id==1){
         if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
           } else{
            console.log('inserting in policy ')
            let user_id=req.jwtToken.user_id
            policyappservice.PolicyAppInsert(req.body,user_id,function(error,result){
          if(error){
                     res.send({status:0,message:error.toString(),content:''})
              }else{
                    res.send({status:1,message:'insertion successfull',content:''})
               }
           });
         }  
       }else{
            logging.LoggingFunction('policyAppInsert','sorry you dont have permission to insert');
            res.send({ status: 0, message:'sorry you dont have permission to insert', content: '' })
       }
    },

this.policyAppUpdate=function (req, res){
    let token = req.headers['x-access-token']
    console.log("token" +token)
      if(req.jwtToken.role_id==1){
        if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
        } else{
       let user_id=req.jwtToken.user_id
        policyappservice.PolicyAppUpdate(req.body,user_id,function(error,result){
        if(error){
             res.send({status:0,message:error.toString(),content:''})
        } else{
             res.send({status:1,message:'updation successfull',content:''})
            }
          });  
        }
      }else{
        logging.LoggingFunction('policyAppUpdate','sorry you dont have permission to update');
        res.send({ status: 0, message:'sorry you dont have permission to update', content: '' })
      }
  },

this.getPolicyAppById =function(req, res){
        let token = req.headers['x-access-token']
        console.log("token" +token)
if(req.jwtToken.role_id==1||req.jwtToken.role_id==2){
         if (!req.body.id) {
          res.send({status:0,message:'Missing id in request',content:''})
        }else{
            let id = req.body.id;
            console.log('from user '+id)
            policyappservice.getPolicyAppById(id,function(error,result){
        if(error){
                res.send({ status: 0, message:error.toString(), content: '' })
         }else{
             res.send({status:1,message:'details of apppolicy',content:result})
             }
           });  
         }
      }
     else{
          logging.LoggingFunction('getPolicyAppById','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
},

this.getPolicyApp = function(req, res){
      let token = req.headers['x-access-token']
if(req.jwtToken.role_id==1||req.jwtToken.role_id==2){
  policyappservice.getPolicyApp(function(error,result){
       if(error){
             res.send({status:0,message:error.toString(),content:''})
       } else{
             res.send({status:1,message:'list of apppolicies',content:result})
             }
           });  
        }else{
            logging.LoggingFunction('getPolicyApp','sorry you dont have permission to retrieve details');
            res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
        }
    }

}

module.exports = new policyAppServices();
  