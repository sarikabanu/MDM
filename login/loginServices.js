var loginService = require('./loginController'); 
var logging  = require('../commons/logging');

function Services() {

  this.adminlogin = function (req, res) {
       let mail_id = req.body.mail_id
        let password = req.body.password
//         let role_id = req.body.role_id
         if (!mail_id&&!password&&!role_id) {
            res.send({ status: 0, message: 'mail_id , password and role_id is required', content: '' })
          }else {
//             if(role_id==1||role_id==0){
            console.log('as admin ')
             loginService.loginAdmin(req.body,function(error,response) {
                console.log('response  ' + response)
                if (response) {
                res.send({ status: 1, message: 'login successfull', content: response });
                }else {
                    res.send({ status: 0, message:error.toString(), content: '' })
                }
            });
//          } else{
//              logging.LoggingFunction('adminlogin','sorry you cannot login');
//              res.send({ status: 0, message:'sorry you cannot login', content: '' }) 
//          }
    }
},

 this.userLogin = function (req, res) {
        console.log('req  ' + req.body.device_id)
        let mail_id = req.body.mail_id
        if (!mail_id) {
            res.send({ status: 0, message: 'mail_id is required', content: '' })
        }else {
            // req.profile_url has to pass in contoller if using aws
            loginService.loginUser(req.body,function(error,response) {
                console.log('response  ' + response)
                if (response) {
                  res.send({ status: 1, message: 'login successfull', content: response });
                }else {
                    res.send({ status: 0, message:error.toString(), content: '' })
                   }
              });
          }
    }
}

module.exports = new Services();
