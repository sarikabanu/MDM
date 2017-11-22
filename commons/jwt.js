
const jwt = require('jsonwebtoken');
const secret = 'sarika';


exports.generate = (mail_id,role_id, user_id) => {
    let payload = {
        mail_id: mail_id,
        role_id:role_id,
        user_id: user_id,
    };
    var token = jwt.sign(payload, secret);
    return token
};

exports.validate =function (app) {
        app.use(function (req, res, next) {
            var token = req.body.token || req.param('token') || req.headers['x-access-token'];
            console.log(token)
            if (token) {
                jwt.verify(token,secret,function (err, decoded) {
                    if (err) {
                        return res.send({status: -1, message: 'Failed to authenticate token.', content: ''});
                    } else {
                       
                        req.jwtToken = decoded;
                         console.log("testing  "+decoded.role_id)
                        next();
                    }
                });
             } else {
                return res.send({status: -1, message: 'Failed to authenticate token.', content: ''});
            }
      });
};
