var express = require('express');
var bodyparser = require('body-parser');
require('./commons/routeInit');
var jwt = require('./commons/jwt');



var app = express();
app.use(bodyparser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyparser.json({ limit: '50mb' }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'access-control-allow-methods,access-control-allow-origin,x-access-token,content-type,Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

_Routes.login.configure(app);
jwt.validate(app);
_Routes.user.configure(app);
_Routes.admin.configure(app);
_Routes.appInfo.configure(app);
_Routes.appDevice.configure(app);
_Routes.deviceInfo.configure(app);
_Routes.log.configure(app);
_Routes.policies.configure(app);
_Routes.policyApp.configure(app);



var server = app.listen(process.env.PORT || 6001, function() {
    console.log('Server listening on port ' + server.address().port);
});

