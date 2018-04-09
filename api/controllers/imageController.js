
let Boom = require('boom');
let FS = require('fs');
let path = require('path');
let uid = require('uniqid');
let s3service = require('../services/AmazonS3Service');

const imageController = {};


// let lensService = require('../services/lens');

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
imageController.upload = (req, reply) => {
  let promise = new Promise((resolve, reject) => {
    let username = req.payload.username;
    let project = req.payload.project;
    const image = req.payload.file;
    const key = 'phototype/prototypes'+ uid() +'.png';
    s3service.upload(
      image.path,
      key,
      image.bytes,
      (err,data)=>{
        if(err){
          err.success=false;
          resolve(err)
        }
        else{
          data.success=true
          resolve(data)
        }
      }
    )
    // let file = FS.createWriteStream(tempdir + '/' + username + ".png")
    // req.payload.file.pipe(file)

    // let body = FS.createReadStream(req.payload.file.path)
    //   console.log("qux");
    //   s3.putObject({
    //     Bucket: process.env.PHOTOTYPE_AWS_S3_BUCKET,
    //     Key: username + '.' + project,
    //     Body: body,
    //     ACL: 'public-read'
    //   }).promise().then((data) => {
    //     console.log(data);
    //     resolve(data);


    //     // lenService.create(data.url).then((err,res)=>{

    //     //     resolve(res || err);
    //     // })

    //   })
    })
  // })
  return reply(promise);
}

module.exports = imageController;