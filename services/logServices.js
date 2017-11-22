const logservice = require('../controllers/log_controller');
var jwt = require('../commons/jwt');
var logging  = require('../commons/logging');

function logServices(){

this.logInsert=function(req, res){
      let token = req.headers['x-access-token']
      console.log("token  " +token)
      if(req.jwtToken.role_id==1){
         if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
           } else{
            console.log('inserting in logs ')
            let user_id=req.jwtToken.user_id
            logservice.InsertLog(req.body,user_id,function(error,result){
          if(error){
                     res.send({status:0,message:error.toString(),content:''})
              }else{
                    res.send({status:1,message:'insertion successfull',content:''})
               }
           });
         }  
       }else{
            logging.LoggingFunction('logInsert','sorry you dont have permission to insert');
            res.send({ status: 0, message:'sorry you dont have permission to insert', content: '' })
       }
    },

this.getlogs = function(req, res){
      let token = req.headers['x-access-token']
if(req.jwtToken.role_id==1){
  logservice.GetLogs(function(error,result){
       if(error){
             res.send({status:0,message:error.toString(),content:''})
       } else{
             res.send({status:1,message:'list of logs',content:result})
             }
           });  
        }else{
            logging.LoggingFunction('getlogs','sorry you dont have permission to retrieve details');
            res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
        }
    }

}

module.exports = new logServices();
  