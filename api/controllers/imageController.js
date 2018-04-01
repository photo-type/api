let aws = require('aws-sdk');
let s3sevice = require('../services/AmazonS3Service');
let Boom = require('boom');
const imageController= {};

imageController.upload = function (req,res){
  let userId = req.payload.userId;
  let dateCreated = new Date();
  let image = req.payload.image;

  if (!image)
      return res(Boom.internal("Error at image controller, no image in request obj"));
  s3sevice.upload(image, process.env.PHOTOTYPE_AWS_ACCESS_KEY, null, function(err, data){
      if(err){
        return res(Boom.internal("An Error occured uploading image to s3"))
      }
      if(data.succuess){
        // TODO find return params of s3
        this.url = data.url;

        /*// lenseService.createPhotoType(this.url || image)
        .then(data =>{
          if(data.success){
              PrototypeModel = new ProtypeModel(data.prototype);
              prototypeModel.save(err=> {
                if(err)
                  return res(Boom.internal("An Error occured saving the protoype"))
              }).then(
                ()=> res({success:true, message:"prototype succesfully created"});
              )

          }
        })
        .catch(err)*/
      }
    })
}


