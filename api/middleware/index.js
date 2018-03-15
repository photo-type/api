const AuthMiddleware = require('./AuthMiddleware');

exports.register = (server, options, next) => {
  // Register all middlewares
  AuthMiddleware(server, options, next);
  next();
};

exports.register.attributes = {
  name: 'middlware'
};
