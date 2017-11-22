var adminservice = require('../services/adminServices');
// var upload = require('../commons/awsUpload').uploadProfilePic
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
        app.route('/admin/:action')
           .post(function (req, res) {
                if (req.params.action == 'getAdminDetailsByMailId') {
                    adminservice.getAdminDetailsByMailId(req, res)
                }
                if (req.params.action == 'adminUpdate') {
                    adminservice.adminUpdate(req, res)
                }
                if (req.params.action == 'approveUser') {//approve ,reject
                    adminservice.approveUser(req, res)
                }
                if (req.params.action == 'listOfuser') {//approved,rejected,requested
                    adminservice.listOfuser(req, res)
                }
              })
         .get(function (req, res) {
                if (req.params.action == 'getAdminDetails') {
                    adminservice.getAdminDetails(req, res)
                }
            });
        // app.post('/adminUpdate', function (req, res) {
        //      upload(req, res, function (err) {
        //         if (err) {
        //             logging.LoggingFunction('adminUpdate','error in uploading to aws');
        //             res.send({ status: 0, message: 'An error occurred when uploading', content: '' })
        //         }
        //         else {
        //             adminservice.adminUpdate(req, res)
        //         }
        //      })
        //  });
      }
};