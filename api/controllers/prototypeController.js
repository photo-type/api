
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
    console.log('logging error', err);
    return res(Boom.internal("Error creating new protoype"))
  })
}

prototypeController.getPrototypes = function (req, res) {
  let query = {
    user: req.user
  }
  // if ther is an id in the request params then query for only
  // the specific prorotype
  // otherwise get all of the user's prototypes
  if (req.params.id) {
    query._id = req.params.id
  }
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