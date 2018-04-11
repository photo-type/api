
let Boom = require('boom');
let FS = require('fs');
let path = require('path');
let uid = require('uniqid');
let s3service = require('../services/AmazonS3Service');

const imageController = {};
imageController.upload = (req, reply) => {
  let username = req.payload.username;
  let project = req.payload.project;
  const image = req.payload.file;
  const key = 'phototype/prototypes'+ uid() +'.png';

  s3service.upload.promise().then((data)=>{

  })




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
        console.log("err",err,data)
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
    })
  return reply(promise);
}

module.exports = imageController;