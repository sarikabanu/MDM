var testdata;
exports.setConf =function (value) {
    if (value) {
        console.log("i am here production.js")
         exports.properties  = require('./production.js');

    } else {
        exports.properties= require('./development.js');
    }

}