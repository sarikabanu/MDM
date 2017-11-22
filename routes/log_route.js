var logservices = require('../services/logServices');
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
        app.route('/logs/:action')
           .post(function (req, res) {
                if (req.params.action == 'logInsert') {
                    logservices.logInsert(req, res)
                }
                //  if (req.params.action == 'logUpdate') {
                //     logservices.logUpdate(req, res)
                // }
                //  if (req.params.action == 'getDeviceInfoById') {
                //     logservices.getDeviceInfoById(req, res)
                // }
             })
          .get(function (req, res) {
                if (req.params.action == 'getlogs') {
                    logservices.getlogs(req, res)
                }
            });
        }
};