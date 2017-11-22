const policyservice = require('../controllers/policy_controller');
var jwt = require('../commons/jwt');
// var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function policyServices(){
console.log('in policy service')

this.policyInsert = function(req, res){
  console.log('in policy service 1')

      let token = req.headers['x-access-token']
      console.log("token  " +token)
      if(req.jwtToken.role_id==1){
         if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
           } else{
            // console.log('inserting in policy '+req.body.data[0].name)
            //  console.log('inserting in policy '+req.body.data[1].model)
            let user_id=req.jwtToken.user_id
            policyservice.PolicyInsert(req.body,user_id,function(error,result){
          if(error){
                     res.send({status:0,message:error.toString(),content:''})
              }else{
                    res.send({status:1,message:'insertion successfull',content:''})
               }
           });
         }  
       }else{
            logging.LoggingFunction('policyInsert','sorry you dont have permission to insert');
            res.send({ status: 0, message:'sorry you dont have permission to insert', content: '' })
       }
    },

this.policyUpdate=function (req, res){
    let token = req.headers['x-access-token']
    console.log("token" +token)
      if(req.jwtToken.role_id==1){
        if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
        } else{
       let user_id=req.jwtToken.user_id
        policyservice.PolicyUpdate(req.body,user_id,function(error,result){
        if(error){
             res.send({status:0,message:error.toString(),content:''})
        } else{
             res.send({status:1,message:'updation successfull',content:''})
            }
          });  
        }
      }else{
        logging.LoggingFunction('policyUpdate','sorry you dont have permission to update');
        res.send({ status: 0, message:'sorry you dont have permission to update', content: '' })
      }
  },

this.getPolicyById =function(req, res){
        let token = req.headers['x-access-token']
        console.log("token" +token)
if(req.jwtToken.role_id==1||req.jwtToken.role_id==2){
         if (!req.body.id) {
          res.send({status:0,message:'Missing id in request',content:''})
        }else{
            let id = req.body.id;
            console.log('from user '+id)
            policyservice.getPolicyById(id,function(error,result){
        if(error){
                res.send({ status: 0, message:error.toString(), content: '' })
         }else{
             res.send({status:1,message:'details of policy',content:result})
             }
           });  
         }
      }
     else{
          logging.LoggingFunction('getPolicyById','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
},

this.getPolicy = function(req, res){
      let token = req.headers['x-access-token']
if(req.jwtToken.role_id==1||req.jwtToken.role_id==2){
  policyservice.getPolicy(function(error,result){
       if(error){
             res.send({status:0,message:error.toString(),content:''})
       } else{
             res.send({status:1,message:'list of policies',content:result})
             }
           });  
        }else{
            logging.LoggingFunction('getPolicy','sorry you dont have permission to retrieve details');
            res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
        }
    }

}

module.exports = new policyServices();
  