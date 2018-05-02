
let Boom = require('boom');
let FS = require('fs');
let path = require('path');
let uid = require('uniqid');
let s3service = require('../services/AmazonS3Service');
let Screens = require('../models/screens');
let Prototypes = require('../models/prototype');
const imageController = {};


imageController.upload = (req, reply) => {
  let username = req.username;
  let prototype = req.params.id;
  const image = req.payload.file;
  const key = 'phototype/prototypes' + uid() + '.png';
  console.log(key, 'here');
  s3service.upload(
    image.path,
    key,
    image.bytes
    , function (err, data) {
      console.log('here' ,err);
      if (err) {
        return reply({ success: false, message: err })
      }
      let screen = new Screens({
        _prototype: prototype,
        path: key
      })
      screen.save().then(() => {
        console.log('saved');
        Prototypes.findOne({
          _id: prototype
        }).then(
          p => {
            p.screens.push(screen._id)
            p.save().then(() => {
            console.log('saved');
              return reply({ success: true, data: screen })
            }).catch((err) => {
              console.log(err);
              return reply(Boom.internal("there was an error updating the prototype", err))
            })
          }
        ).catch((err) => {
          console.log(err);
          
          return reply(Boom.internal("there was an error finding the prototype", err))

        })
      }).catch((err) => {
        console.log(err);
        
        return reply(Boom.internal("there was an error saving the screen", err))
      })
    })
}

module.exports = imageController;