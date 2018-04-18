
let Prototype = require("../models/prototype");
let Boom = require("boom");
let Screens = require('../models/screens');
const prototypeController = {};


prototypeController.createPrototype = function (req, res) {

  let protoype = new Prototype({
    name: req.payload.name,
    user: req.user

  })
  protoype.save().then(() => {
    return res({ success: true, prototypeId: protoype._id, message: "successfully created" })
  }).catch((err) => {
    console.log('logging error', err);
    return res(Boom.internal("Error creating new protoype"))
  })
}
prototypeController.deletePrototype = function (req, res) {

}
prototypeController.getScreens = function (req, res) {
  Screens.find({
    _prototype: req.params.id
  }).then((screen) => {
    return res({ screen: screen })
  }).catch((err) => {
    return res(Boom.internal("something went wrong getting screens"));
  })
}
prototypeController.editScreen = function (req, res) {
  let data = req.payload
  
  Screens.findOne({
    _id: req.params.id
  }).then(s => {
    s.actions = data.actions;
    s.markModified('actions');
    s.save().then((data) => {
      return res(data)
    }).catch(err => {
      return res(Boom.internal("Something went wrong patching screens", err))
    })
  }).catch((err) => {
    console.log(err);
    return res(Boom.internal("something went wrong getting screens"));
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