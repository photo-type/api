
let Prototype = require("../models/prototype");
let Boom = require("boom");

const prototypeController = {};


prototypeController.createPrototype = function (req, res) {

  let protoype = new Prototype({
    name: req.payload.name,
    user : req.user
  })
  protoype.save().then(() => {
    return res({ success: true, prototypeId: protoype._id, message: "successfully created" })
  }).catch((err) => {
    console.log('logging error', err);
    return res(Boom.internal("Error creating new protoype"))
  })
}

prototypeController.getPrototypes = function (req, res) {
  let query = {
    user: req.user
  }
  if (req.params.id) {
    query._id = req.params.id
  }
  console.log(query)
  Prototype.find(
    query
  ).then(prototypes => {
    return res(prototypes)
  }).catch((err) => {
    console.log("err getProrotypes", err)
    return res(Boom.internal("Error finding prototypes"))
  })
}


module.exports = prototypeController;