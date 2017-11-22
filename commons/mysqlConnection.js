var mysql = require('mysql');
setconfig = require('../config/setconfig');
setconfig.setConf(false);

var pool = mysql.createPool({
    host            :  setconfig.properties.mysqlConnection.host,
    user            :  setconfig.properties.mysqlConnection.user,
    password        :  setconfig.properties.mysqlConnection.password,
    database        :  setconfig.properties.mysqlConnection.database,
    connectionLimit :  setconfig.properties.mysqlConnection.connectionLimit
});


exports.pool = pool;
