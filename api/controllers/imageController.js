let aws = require('aws-sdk');
let s3sevice = require('../services/AmazonS3Service');
let Boom = require('boom');
let FS = require('fs');
let path = require('path');
let uid = require('uniqid');
const imageController = {};


// let lensService = require('../services/lens');
let s3 = new aws.S3();

// TODO
// 1. refractor to use s3service
// 2. figure out a way to upload temp images and delete with upload
// 2.a if there is one upload going on, the second upload might replce the image
// 2.b its not possible to create a  new temp file for every user
// 3. logic:
//    upload img to temp
//    if another upload occrs
//    check if there are files in the temp dir
//    if so add a prefix or post fix of 2,3 int
//    when a file is upload successfully to s3 
//    delete it 
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