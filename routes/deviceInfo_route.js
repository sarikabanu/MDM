var deviceInfoservices = require('../services/deviceInfoServices');
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
        app.route('/deviceInfo/:action')
           .post(function (req, res) {
                if (req.params.action == 'deviceInfoInsert') {
                    deviceInfoservices.deviceInfoInsert(req, res)
                }
                 if (req.params.action == 'deviceInfoUpdate') {
                    deviceInfoservices.deviceInfoUpdate(req, res)
                }
                 if (req.params.action == 'getDeviceInfoById') {
                    deviceInfoservices.getDeviceInfoById(req, res)
                }
             })
          .get(function (req, res) {
                if (req.params.action == 'getDeviceInfo') {
                    deviceInfoservices.getDeviceInfo(req, res)
                }
            });
        }
};