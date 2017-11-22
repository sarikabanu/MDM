var service = require('./loginServices');
var upload = require('../commons/awsUpload').uploadProfilePic
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
         app.route('/login/:action')
             .post(function (req, res) {
                if (req.params.action == 'adminlogin') {
                    service.adminlogin(req, res)
                }
               if (req.params.action == 'userLogin') {
                    service.userLogin(req, res)
                }
         });
        // app.post('/userLogin', function (req, res) {
        //      upload(req, res, function (err) {
        //         if (err) {
        //             logging.LoggingFunction('userLogin','error in uploading to aws');
        //             res.send({ status: 0, message: 'An error occurred when uploading', content: '' })
        //         }
        //         else {
        //             service.userLogin(req, res)
        //         }
        //      })
        //  });
    }
}
