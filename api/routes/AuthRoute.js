const Joi = require('joi');
const AuthController = require('../controllers/AuthController');

module.exports = function (server, options, next) {

  server.route([

    {
      method: 'POST',
      path: '/auth/signup',
      config: {
        auth: false,
        handler: AuthController.signup,
        validate: {
          payload: {
            name: Joi.string().required(),
            email: Joi.email().required(),
            password: Joi.string().required()
          }
        },
        tags: ['api', 'auth'],
        description: 'Signs up customers',
        notes: 'Signs up customers'
      }
    },
    {
      method: 'POST',
      path: '/auth/login',
      config: {
        auth: false,
        handler: AuthController.login,
        validate: {
          payload: {
            email: Joi.string().email(),
            password: Joi.string().required()
          }
        },
        tags: ['api', 'auth'],
        description: 'Signs in customers',
        notes: 'Signs in customers'
      }
    },
    {
      method: 'PUT',
      path: '/auth/reset_password',
      config: {
        handler: AuthController.resetPassword,
        validate: {
          payload: {
            code: Joi.string().required(),
            phone_number: Joi.string().required(),
            password: Joi.string().required()
          }
        },
        tags: ['api', 'auth'],
        description: 'Reset user password if code provided is valid',
        notes: 'Reset user password if code provided is valid'
      }
    }
  ]);
};
