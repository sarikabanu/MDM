const deviceinfoservice = require('../controllers/deviceInfo_controller');
var jwt = require('../commons/jwt');
var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function deviceInfoServices(){

this.deviceInfoInsert=function(req, res){
      let token = req.headers['x-access-token']
      console.log("token  " +token)
      if(req.jwtToken.role_id==1){
         if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
           } else{
            console.log('inserting in deviceInfo ')
            let user_id=req.jwtToken.user_id
            deviceinfoservice.InsertDeviceInfo(req.body,user_id,function(error,result){
          if(error){
                     res.send({status:0,message:error.toString(),content:''})
              }else{
                    res.send({status:1,message:'insertion successfull',content:''})
               }
           });
         }  
       }else{
            logging.LoggingFunction('deviceInfoInsert','sorry you dont have permission to insert');
            res.send({ status: 0, message:'sorry you dont have permission to insert', content: '' })
       }
    },

this.deviceInfoUpdate=function (req, res){
    let token = req.headers['x-access-token']
    console.log("token" +token)
      if(req.jwtToken.role_id==1){
        if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
        } else{
       let user_id=req.jwtToken.user_id
        deviceinfoservice.UpadteDeviceInfo(req.body,user_id,function(error,result){
        if(error){
             res.send({status:0,message:error.toString(),content:''})
        } else{
             res.send({status:1,message:'updation successfull',content:''})
            }
          });  
        }
      }else{
        logging.LoggingFunction('deviceInfoUpdate','sorry you dont have permission to update');
        res.send({ status: 0, message:'sorry you dont have permission to update', content: '' })
      }
  },

this.getDeviceInfoById =function(req, res){
        let token = req.headers['x-access-token']
        console.log("token" +token)
     if(req.jwtToken.role_id==1||req.jwtToken.role_id==2){
         if (!req.body.id) {
          res.send({status:0,message:'Missing id in request',content:''})
        }else{
            let id = req.body.id;
            console.log('from user '+id)
            deviceinfoservice.getDeviceInfoById(id,function(error,result){
        if(error){
                res.send({ status: 0, message:error.toString(), content: '' })
         }else{
             res.send({status:1,message:'details of device',content:result})
             }
           });  
         }
      }
     else{
          logging.LoggingFunction('getDeviceInfoById','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
},

this.getDeviceInfo = function(req, res){
      let token = req.headers['x-access-token']
if(req.jwtToken.role_id==1){
  deviceinfoservice.getDeviceInfo(function(error,result){
       if(error){
             res.send({status:0,message:error.toString(),content:''})
       } else{
             res.send({status:1,message:'list of devices',content:result})
             }
           });  
        }else{
            logging.LoggingFunction('getDeviceInfo','sorry you dont have permission to retrieve details');
            res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
        }
    }

}

module.exports = new deviceInfoServices();
  