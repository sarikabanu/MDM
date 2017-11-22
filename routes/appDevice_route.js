var appDeviceService = require('../services/appDeviceServices');
// var upload = require('../commons/awsUpload').uploadProfilePic
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
        app.route('/appDevice/:action')
           .post(function (req, res) {
                if (req.params.action == 'appLock') {//lock,unlock,install,unistall
                    appDeviceService.appLock(req, res)
                }
            //    if (req.params.action == 'appInstall') {
            //         appDeviceService.appInstall(req, res)
            //     }
                if (req.params.action == 'appDeviceUpdate') {
                    appDeviceService.appDeviceUpdate(req, res)
                }
                if (req.params.action == 'getAppDeviceById') {
                    appDeviceService.getAppDeviceById(req, res)
                }
                 if (req.params.action == 'TimeUsageOnApp') {
                    appDeviceService.TimeUsageOnApp(req, res)
                }
                if (req.params.action == 'getTimeUsageOnAppById') { //appId,deviceid
                    appDeviceService.getTimeUsageOnAppById(req, res)
                }
             })
          .get(function (req, res) {
                if (req.params.action == 'listOfAppsTracked') {//get info of all apps tracked in devices
                    appDeviceService.listOfAppsTracked(req, res)
                }
                 if (req.params.action == 'appLockList') {
                    appDeviceService.appLockList(req, res)
                }
            });
        }
};