module.exports = {
  "s3": {
    "accessKey": process.env.PHOTOTYPE_AWS_KEY,
    "secretAccessKey": process.env.PHOTOTYPE_AWS_ACCESS_KEY,
    "bucket": process.env.PHOTOTYPE_AWS_S3_BUCKET,
    "region": "ap-southeast-1"
  },
  "maxBytes": 5242880
};
