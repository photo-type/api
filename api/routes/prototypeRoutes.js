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
        auth: 'jwt',
        handler: prototypeController.createPrototype
      }
    },
    {
      method:"get",
      path:"/prototypes/{id}",
      config:{
        handler: prototypeController.getPrototypes,
        auth: 'jwt'
      }
    },
    {
      method:"get",
      path:"/prototypes",
      config:{
        handler: prototypeController.getPrototypes,
        auth: 'jwt'
      }
    }
  ])
}