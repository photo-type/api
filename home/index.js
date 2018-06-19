const Path = require('path');
const Joi = require('joi');

exports.register = (plugin, options, next) => {
  // Register all routes
  plugin.route([

    {
      method: 'GET',
      path: '/',
      config: {
        auth: false,
        handler: {
          file: 'home/home.html'
        },
        tags: ['api'],
        description: 'Serve static home page for website',
        notes: 'Serve static home page'
      }
    },
    {
      method: 'GET',
      path: '/reset-password',
      config: {
        auth: false,
        handler: {
          file: 'home/reset.html'
        },
        tags: ['api'],
        description: 'Serve static reset password page for provider',
        notes: 'Serve static reset password'
      }
    },
    {
      method: 'GET',
      path: '/verify-reset-password',
      config: {
        auth: false,
        validate: {
          query: {
            email: Joi.string().required(),
            token: Joi.string().required(),
          }
        },
        handler: {
          file: 'home/verify_reset.html'
        },
        tags: ['api'],
        description: 'Serve static verify reset password page for provider',
        notes: 'Serve static verify reset password'
      }
    },
    {
      method: 'GET',
      path: '/public/{param*}',
      config: {
        auth: false
      },
      handler: {
        directory: {
          path: 'public'
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'home'
};
