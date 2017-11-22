var policyAppService = require('../services/policyAppServices');
// var upload = require('../commons/awsUpload').uploadProfilePic
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
        app.route('/policyApp/:action')
           .post(function (req, res) {
                if (req.params.action == 'policyAppInsert') {
                    policyAppService.policyAppInsert(req, res)
                }
                 if (req.params.action == 'policyAppUpdate') {
                    policyAppService.policyAppUpdate(req, res)
                }
                 if (req.params.action == 'getPolicyAppById') {
                    policyAppService.getPolicyAppById(req, res)
                }
             })
          .get(function (req, res) {
                if (req.params.action == 'getPolicyApp') {
                    policyAppService.getPolicyApp(req, res)
                }
            });
        }
};