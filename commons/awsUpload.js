
AWS = require('aws-sdk');
const uuid = require('uuid');
multer = require('multer'),
multerS3 = require('multer-s3');
  
setconfig = require('../config/setconfig');
setconfig.setConf(false);

//   AWS.config.update({
//             accessKeyId: setconfig.properties.AWS.accessKeyId,
//             secretAccessKey: setconfig.properties.AWS.secretAccessKey,
//             region: setconfig.properties.AWS.region,
//             fileLink: setconfig.properties.AWS.fileLink
//          });

s3 = new AWS.S3();

var commonFunc = {
upload : multer({
    storage: multerS3({
        s3: s3,
        bucket: 'musicapp-bucket',
        key: function (req, file, cb) {
            req.file_name = uuid()+file.originalname;
            console.log(file);
          
                req.iconFileName=uuid()+file.originalname
                 console.log('iconFileName'+ req.iconFileName);
                  cb(null,   req.iconFileName); //use Date.now() for unique file keys
            }
    })
}).fields([{
           name: 'icon_url', maxCount: 1
         }]),


uploadProfilePic : multer({
    storage: multerS3({
        s3: s3,
        bucket: 'musicapp-bucket',
        key: function (req, file, cb) {
            req.file_name = uuid()+file.originalname;
            console.log(file);
          
                req.imageFileName=uuid()+file.originalname
                 console.log('imageFileName'+ req.imageFileName);
                  cb(null,   req.imageFileName); //use Date.now() for unique file keys
            }
    })
}).fields([{
           name: 'profile_url', maxCount: 1
         }])

//  upload : multer({
//     storage: multerS3({
//     s3: s3,
//     bucket: 'musicapp-bucket',
//     key: function (req, file, cb) {
//         req.file_name = uuid()+file.originalname;
//         console.log(file);
//          if(file.fieldname=='image_file') 
//          {
//                 req.imageFileName=uuid()+file.originalname
//                 console.log('#######imageFileName'+ req.imageFileName);
//                 cb(null,   req.imageFileName); //use Date.now() for unique file keys
//          }
//          if(file.fieldname=='media_file') 
//          {
//              if(file.mimetype=='video/mp4')
//             {
//                 req.vedioFileName=uuid()+file.originalname
//                 console.log('vedioFileName'+req.vedioFileName);
//                 cb(null,   req.vedioFileName); //use Date.now() for unique file keys 
               
//             }
//             else{
//                 req.audioFileName=uuid()+file.originalname
//                 console.log('audioFileName'+req.audioFileName);
//                 cb(null,   req.audioFileName); //use Date.now() for unique file keys
//             }
//          }
//       }
//     })
// }).fields([{
//            name: 'image_file', maxCount: 1
//          }, {
//            name: 'media_file', maxCount: 1
//          }]),


}

module.exports = commonFunc;