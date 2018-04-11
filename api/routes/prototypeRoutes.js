const prototypeController = require("../controllers/prototypeController");
const Joi = require('joi');
module.exports = (server, options, next) => {
  server.route([
    {
      method: "post",
      path: "/prototypes",

      config: {
        validate:
          {
            payload: {
              name: Joi.string().required()
            }
          },
        auth: false,
        handler: prototypeController.createPrototype
      }
    }
  ])
}