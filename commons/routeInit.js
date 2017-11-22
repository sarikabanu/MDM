uuid = require('uuid');
db = require('../commons/mysqlConnection').pool;
jwt = require('jsonwebtoken');
setconfig = require('../config/setconfig');
setconfig.setConf(false);
Q = require('q');
 
console.log('in route init')

_Routes = {
    login: require('../login/login_route'),
    user: require('../routes/user_route'),
    admin:require('../routes/admin_route'),
    appInfo:require('../routes/appInfo_route'),
    appDevice:require('../routes/appDevice_route'),
    deviceInfo:require('../routes/deviceInfo_route'),
    log:require('../routes/log_route'),
    policies:require('../routes/policies_route'),
    policyApp:require('../routes/policyApp_route')
};
