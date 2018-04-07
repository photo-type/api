let aws = require('aws-sdk');
let s3sevice = require('../services/AmazonS3Service');
let Boom = require('boom');
let FS = require('fs');
let path = require('path');
let uid = require('uniqid');
const imageController = {};
// let lensService = require('../services/lens');
let s3 = new aws.S3();
let tempdir = path.join(__dirname, 'tempUpload');
console.log(__dirname, tempdir)
if (!FS.existsSync(tempdir))
  FS.mkdirSync(tempdir)

imageController.upload = (req, reply) => {
  let promise = new Promise((resolve, reject) => {
    let username = req.payload.username;
    let project = req.payload.project;
    let file = FS.createWriteStream(tempdir + '/' + username + ".png")
    req.payload.file.pipe(file)

    // let body = FS.createReadStream(file)
    // FS.readFile(file, function(err,body){
    FS.readFile(tempdir + "/" + username + ".png", function (err, body) {
      console.log(err);
      console.log("qux");
      let image = new Buffer(body, 'binary')

      s3.putObject({
        Bucket: process.env.PHOTOTYPE_AWS_S3_BUCKET,
        Key: username + '.' + project,
        Body: image,
        ACL: 'public-read'
      }).promise().then((data) => {
        console.log(err, "error");
        console.log(data);
        if (err) {
          err.success = false
          return resolve(err)
        }
        resolve(data);


        // lenService.create(data.url).then((err,res)=>{

        //     resolve(res || err);
        // })

      })
    })
  })
  // })
  return reply(promise);
}

module.exports = imageController;