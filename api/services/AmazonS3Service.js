'use strict';
const AWS = require('aws-sdk');
const FS = require('fs');
const configS3 = require('../../config/development.js').s3;
let s3bucket = new AWS.S3();
let Service = {};

Service.upload = (file,key,size, cb) => {
  let body = FS.createReadStream(file);
  s3bucket.putObject({
    ACL: 'public-read',
    Body: body,
    Key: 'keyFoo',
    Bucket: process.env.PHOTOTYPE_AWS_S3_BUCKET
  }, (err, data) => {

    cb(err, data);
  });
};
Service.delete = (key) => {
  const promise = new Promise((resolve, reject) => {
    s3bucket.deleteObject({
      Key: configS3.secretAccessKey,
      Bucket: configS3.bucket
    }, (err, data) => {
      console.log(err, data);
      if (err) return reject(err);
      return resolve(data);
    });
  });
  return promise;
};

module.exports = Service;
