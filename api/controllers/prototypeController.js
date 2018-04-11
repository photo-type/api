
let Prototype = require("../models/prototype");
let Boom = require("boom");

const prototypeController = {};


prototypeController.createPrototype = function (req, res) {

  let protoype = new Prototype({
    name: req.payload.name
    // todo replace with something meaningful if user doesnt provide a name for prototype
  })

  protoype.save().then(() => {
    return res({ success: true, prototypeId: protoype._id, message: "successfully created" })
  }).catch((err) => {
    console.log('logging error',err);
    return res(Boom.internal("Error creating new protoype"))
  })
}


module.exports = prototypeController;