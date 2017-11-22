var userservice = require('../services/userServices');
// var upload = require('../commons/awsUpload').uploadProfilePic
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
        app.route('/user/:action')
           .post(function (req, res) {
                if (req.params.action == 'getUserDetailsById') {
                    userservice.getUserDetailsById(req, res)
                }
                if (req.params.action == 'userUpdate') {
                    userservice.userUpdate(req, res)
                }
             })
         .get(function (req, res) {
                if (req.params.action == 'getUserDetails') {
                    userservice.getUserDetails(req, res)
                }
            });
        // app.post('/userUpdate', function (req, res) {
        //      upload(req, res, function (err) {
        //         if (err) {
        //             logging.LoggingFunction('userUpdate','error in uploading to aws');
        //             res.send({ status: 0, message: 'An error occurred when uploading', content: '' })
        //         }
        //         else {
        //             userservice.userUpdate(req, res)
        //         }
        //      })
        //  });
     }
};