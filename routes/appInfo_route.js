var appInfoService = require('../services/appInfoServices');
 var upload = require('../commons/awsUpload').upload
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
        app.route('/appInfo/:action')
           .post(function (req, res) {
             if (req.params.action == 'appInfoInsert') {
                    appInfoService.appInfoInsert(req, res)
                }
            if (req.params.action == 'appInfoUpdate') {
                    appInfoService.appInfoUpdate(req, res)
                }
             if (req.params.action == 'getAppInfoById') {
                    appInfoService.getAppInfoById(req, res)
                }
             })
          .get(function (req, res) {
                if (req.params.action == 'getAppInfo') {
                    appInfoService.getAppInfo(req, res)
                }
            });
        //  app.post('/appInfoInsert', function (req, res) {
        //      upload(req, res, function (err) {
        //         if (err) {
        //             logging.LoggingFunction('appInfoInsert','error in uploading to aws');
        //             res.send({ status: 0, message: 'An error occurred when uploading', content: '' })
        //         }
        //         else {
        //             appInfoService.appInfoInsert(req, res)
        //         }
        //      })
        //  });
        // app.post('/appInfoUpdate', function (req, res) {
        //      upload(req, res, function (err) {
        //         if (err) {
        //             logging.LoggingFunction('appInfoUpdate','error in uploading to aws');
        //             res.send({ status: 0, message: 'An error occurred when uploading', content: '' })
        //         }
        //         else {
        //             appInfoService.appInfoUpdate(req, res)
        //         }
        //      })
        //  });
      }
};