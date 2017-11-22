const appdeviceservice = require('../controllers/appDevice_controller');
var jwt = require('../commons/jwt');
// var notify = require('../commons/notification');
var logging  = require('../commons/logging');

function appDeviceServices(){

this.appLock =function(req, res){
  let token = req.headers['x-access-token']
  console.log("token" +token)
     if(req.jwtToken.role_id==1){
         if (!req.body) {
          res.send({status:0,message:'fields are required',content:''})
        }else{
           let user_id=req.jwtToken.user_id
           console.log('from user '+user_id)
       appdeviceservice.appLock(req.body,user_id,function(error,result){
        if(error){
              res.send({ status: 0, message:error.toString(), content: '' })
          }else{
          if(req.body.status == -2){
            res.send({status:0,message:'this app is locked',content:''})
            }
          else if(req.body.status == 2){
              res.send({status:1,message:'this app is Unlocked',content:''})
            }
          else if(req.body.status == 3){
              res.send({status:1,message:'this app is Installed',content:''})
            }
          else if(req.body.status == -3){
              res.send({status:0,message:'this app is Uninstalled',content:''})
            }
            else{
                res.send({status:0,message:'no action performed on app',content:''})
              }
             }
           });  
         }
      }
     else{
          logging.LoggingFunction('appLock','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
      }
   },

//  this.appInstall =function(req, res){
//         let token = req.headers['x-access-token']
//         console.log("token" +token)
//      if(req.jwtToken.role_id==1){
//          if (!req.body) {
//           res.send({status:0,message:'fields are required',content:''})
//         }else{
//            let user_id=req.jwtToken.user_id
//            console.log('from user '+user_id)
//        appdeviceservice.appInstall(req.body,user_id,function(error,result){
//          if(error){
//                 res.send({ status: 0, message:error.toString(), content: '' })
//          }else{
//            if(req.body.status == 3){
//              res.send({status:1,message:'this app is installed',content:result})
//             }
//             else{
//                res.send({status:0,message:'this app is Uninstalled',content:result})
//               }
//              }
//            });  
//          }
//       }
//      else{
//           logging.LoggingFunction('appInstall','sorry you dont have permission to retrieve details');
//           res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
//       }
//    },

this.appDeviceUpdate=function (req, res){
    let token = req.headers['x-access-token']
    console.log("token" +token)
      if(req.jwtToken.role_id==1){
        if(!req.body){
            res.send({status:0,message:'fields are required',content:""})
        } else{
       let user_id=req.jwtToken.user_id
        appdeviceservice.UpadteAppDevice(req.body,user_id,function(error,result){
        if(error){
             res.send({status:0,message:error.toString(),content:''})
        } else{
             res.send({status:1,message:'updation successfull',content:''})
            }
          });  
        }
      }else{
        logging.LoggingFunction('appDeviceUpdate','sorry you dont have permission to update');
        res.send({ status: 0, message:'sorry you dont have permission to update', content: '' })
      }
  },

this.getAppDeviceById =function(req, res){
        let token = req.headers['x-access-token']
        console.log("token" +token)
     if(req.jwtToken.role_id==1){
         if (!req.body.id) {
          res.send({status:0,message:'Missing id in request',content:''})
        }else{
            let id = req.body.id;
            console.log('from user '+id)
            appdeviceservice.getAppDeviceById(id,function(error,result){
        if(error){
                res.send({ status: 0, message:error.toString(), content: '' })
         }else{
             res.send({status:1,message:'details of appdevice',content:result})
             }
           });  
         }
      }
     else{
          logging.LoggingFunction('getAppDeviceById','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
},

this.listOfAppsTracked = function(req, res){
      let token = req.headers['x-access-token']
if(req.jwtToken.role_id==1){
  appdeviceservice.listOfAppsTracked(function(error,result){
       if(error){
             res.send({status:0,message:error.toString(),content:''})
       } else{
             res.send({status:1,message:'list Of AppsTracked',content:result})
             }
           });  
      }else{
          logging.LoggingFunction('listOfAppsTracked','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
      }
},

this.appLockList = function(req, res){
      let token = req.headers['x-access-token']
if(req.jwtToken.role_id==1){
  appdeviceservice.appLockList(function(error,result){
       if(error){
             res.send({status:0,message:error.toString(),content:''})
       } else{
             res.send({status:1,message:'list of locked app',content:result})
             }
           });  
        }else{
            logging.LoggingFunction('appLockList','sorry you dont have permission to retrieve details');
            res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
        }
 },
 
 this.TimeUsageOnApp =function(req, res){
      let token = req.headers['x-access-token']
        console.log("token" +token)
     if(req.jwtToken.role_id==1){
         if (!req.body) {
          res.send({status:0,message:'fields are required',content:''})
        }else{
           let user_id=req.jwtToken.user_id
           console.log('from user '+user_id)
       appdeviceservice.TimeUsageOnApp(req.body,user_id,function(error,result){
         if(error){
               res.send({ status: 0, message:error.toString(), content: '' })
         }else{
               res.send({status:1,message:'usagetime of app is saved',content:''}) 
             }
           });  
         }
      }
     else{
          logging.LoggingFunction('TimeUsageOnApp','sorry you dont have permission to retrieve details');
          res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
     }
},

 this.getTimeUsageOnAppById = function(req, res){
   let token = req.headers['x-access-token']
     if(req.jwtToken.role_id==1){
       if (!req.body) {
            res.send({status:0,message:'Missing fields in request',content:''})
      }else{
          appdeviceservice.getTimeUsageOnAppById(req.body,function(error,result){
        if(error){
              res.send({status:0,message:error.toString(),content:''})
        } else{
              res.send({status:1,message:'time usage on app',content:result})
              }
           });  
        }
      }else{
            logging.LoggingFunction('getTimeUsageOnAppById','sorry you dont have permission to retrieve details');
            res.send({ status: 0, message:'sorry you dont have permission to retrieve details', content: '' })
        }
    }
}

module.exports = new appDeviceServices();
  