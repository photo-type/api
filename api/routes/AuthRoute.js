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
            email: Joi.string().email().required(),
            password: Joi.string().required()
          }
        },
        tags: ['api', 'auth'],
        description: 'Signs up customers',
        notes: 'Signs up customers'
      }
    },
    {
      method: 'GET',
      path: '/auth/confirm_email',
      config: {
        auth: false,
        handler: AuthController.confirmEmail,
        validate: {
          query: {
            email: Joi.string().email().required(),
            token: Joi.string().required()
          }
        },
        tags: ['api', 'auth'],
        description: 'Confirms email of customers',
        notes: 'Confirms email of customers'
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
      method: 'POST',
      path: '/auth/send_reset_email',
      config: {
        auth: false,
        handler: AuthController.sendEmail,
        validate: {
          payload: {
            email: Joi.string().email().required(),
          }
        },
        tags: ['api', 'auth'],
        description: 'Reset user password by sending email',
        notes: 'Reset user password by sending email'
      }
    },
    {
      method: 'PUT',
      path: '/auth/reset_password',
      config: {
        auth: false,
        handler: AuthController.resetPassword,
        validate: {
          payload: {
            token: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
          }
        },
        tags: ['api', 'auth'],
        description: 'Reset user password if token provided is valid',
        notes: 'Reset user password if token provided is valid'
      }
    }
  ]);
};
