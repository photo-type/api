const imageController = require("../controllers/imageController");
const Joi = require('joi');
module.exports = (server, options, next) => {
  server.route([
    {
      method: "post",
      path: "/prototype/{id}/screens",
      config: {
        payload: {
          output: 'file',
          parse: true,
          allow: 'multipart/form-data',
          maxBytes: 5000 * 5000 * 10,
        },
        auth: false,
        handler: imageController.upload
      }
    }
  ])
}