const appinfoservice = require('../controllers/appInfo_controller');
var jwt = require('../commons/jwt');
 var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function appInfoServices(){

this.appInfoInsert=function(req, res){
      let token = req.headers['x-access-token']
      console.log("token  " +token)
      if(req.jwtToken.role_id==1){
         if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
           } else{
            console.log('inserting in appInfo ')
            let user_id=req.jwtToken.user_id
            // console.log('Icon @@@@@@@@@ '+req.iconFileName)
            // req.iconFileName
            appinfoservice.InsertAppInfo(req.body,user_id,function(error,result){
          if(error){
                     res.send({status:0,message:error.toString(),content:''})
              }else{
                    res.send({status:1,message:'insertion successfull',content:''})
               }
          });
        }  
      }else{
            logging.LoggingFunction('appInfoInsert','sorry you dont have permission to insert');
            res.send({ status: 0, message:'sorry you dont have permission to insert', content: '' })
       }
    },

this.appInfoUpdate=function (req, res){
    let token = req.headers['x-access-token']
    console.log("token" +token)
      if(req.jwtToken.role_id==1){
        if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
        } else{
    let user_id=req.jwtToken.user_id
    // req.iconFileName
        appinfoservice.UpadteAppInfo(req.body,user_id,function(error,result){
        if(error){
             res.send({status:0,message:error.toString(),content:''})
        } else{
             res.send({status:1,message:'updation successfull',content:''})
            }
          });  
        }
      }else{
        logging.LoggingFunction('appInfoUpdate','sorry you dont have permission to update');
        res.send({ status: 0, message:'sorry you dont have permission to update', content: '' })
      }
  },
  
this.getAppInfoById =function(req, res){
        let token = req.headers['x-access-token']
        console.log("token" +token)
     if(req.jwtToken.role_id==1||req.jwtToken.role_id==2){
         if (!req.body.id) {
          res.send({status:0,message:'Missing id in request',content:''})
        }else{
            let id = req.body.id;
            console.log('from user '+id)
            appinfoservice.getAppInfoById(id,function(error,result){
        if(error){
                res.send({ status: 0, message:error.toString(), content: '' })
         }else{
             res.send({status:1,message:'details of app',content:result})
             }
           });  
         }
      }
     else{
          logging.LoggingFunction('getAppInfoById','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
},

 this.getAppInfo = function(req, res){
      let token = req.headers['x-access-token']
if(req.jwtToken.role_id==1||req.jwtToken.role_id==2){
  appinfoservice.getAppInfo(function(error,result){
       if(error){
             res.send({status:0,message:error.toString(),content:''})
       } else{
             res.send({status:1,message:'list of app',content:result})
             }
           });  
        }else{
            logging.LoggingFunction('getAppInfo','sorry you dont have permission to retrieve details');
            res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
        }
    }

}

module.exports = new appInfoServices();