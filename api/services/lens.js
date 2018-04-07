const lensService = {};
let phototype = require('../models/phototype');
let imgProcess = {
  process: function (img) {
    // do stuff with img
    return {
      data: {}
    }
  }
}

lensService.create = (req) => {
  let promise = new Promise((resolve, reject) => {
    let data = imgProcess.process(req.img);

    let proto = new phototype({
      username: req.username,
      project: req.project,
      data: data
    })
    proto.save((err) => {
      if (!err)
        resolve(proto)
    })
  })

}
module.exports= lensService;