const AuthRoute = require('./routes/AuthRoute');

exports.register = (plugin, options, next) => {
  // Register all routes
  AuthRoute(plugin, options, next);

  next();
};

exports.register.attributes = {
  name: 'api'
};
