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
      method: "get",
      path: "/prototypes/{id}",
      config: {
        handler: prototypeController.getPrototypes,
        auth: 'jwt'
      }
    },
    {
      method: "delete",
      path: "/prototypes/{id}",
      config: {
        handler: prototypeController.deletePrototype,
        auth: 'jwt'
      }
    },
    {
      method: "get",
      path: "/prototypes",
      config: {
        handler: prototypeController.getPrototypes,
        auth: 'jwt'
      }
    }, {
      method: 'PUT',
      path: '/screens/{id}',
      config: {
        handler: prototypeController.editScreen,
        auth: 'jwt',
        validate: {
          payload: {
            actions: Joi.array().items(Joi.object({
              description: Joi.string(),
              _id: Joi.string(),
              dimensions: Joi.object({
                x: Joi.number().required(),
                y: Joi.number().required(),
                height: Joi.number().required(),
                width: Joi.number().required(),
                color: Joi.string()
              }).required(),
              text: Joi.string(),
              type: Joi.string()
            }))
          }
        }
      }
    },
    {
      method :'GET',
      path:'/prototypes/{id}/screens',
      config:{
        handler: prototypeController.getScreens,
        auth:'jwt'
      }
    }
  ])
}