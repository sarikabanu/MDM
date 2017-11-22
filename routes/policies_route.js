var policyService = require('../services/policyServices');
// var upload = require('../commons/awsUpload').uploadProfilePic
var logging  = require('../commons/logging');

console.log('in policy route')


module.exports = {
  configure: function (app) {
       console.log('in policy route1')

        app.route('/policies/:action')
        
           .post(function (req, res) {

                 console.log('in policy route11')
                 
                if (req.params.action == 'policyInsert') {
                     console.log('in policy route12')
                    policyService.policyInsert(req, res)
                }

                 if (req.params.action == 'policyUpdate') {
                    policyService.policyUpdate(req, res)
                }
                 if (req.params.action == 'getPolicyById') {
                    policyService.getPolicyById(req, res)
                }
             })
          .get(function (req, res) {
                if (req.params.action == 'getPolicy') {
                    policyService.getPolicy(req, res)
                }
            });
        }
};

