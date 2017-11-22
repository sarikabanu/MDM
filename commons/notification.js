var FCM = require('fcm-node');

setconfig = require('../config/setconfig');
setconfig.setConf(false);

var serverKey = setconfig.properties.fcmNotification.serverKey

var fcm = new FCM(serverKey);

 exports.sendNotification = function (fcm_token,req, res) {
         var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
        to: fcm_token,
       
        
        notification: {
            title: 'MDM notification', 
            body: 'New app is added' 
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!  "+err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}
