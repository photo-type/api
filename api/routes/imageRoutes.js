const imageController = require("../controllers/imageController");
const Joi = require('joi');
const fs = require('fs');
module.exports = (server, options, next) => {
  server.route([
    {
      method: "post",
      path: "/upload",
      config: {
        payload:{
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data',
          maxBytes: 5000 * 5000 * 10
        },
        auth: false,
        handler: imageController.upload
      }
    }
  ])
}