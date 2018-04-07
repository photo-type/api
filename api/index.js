const AuthRoute = require('./routes/AuthRoute');
const ImageController = require('./routes/imageRoutes');
exports.register = (plugin, options, next) => {
  // Register all routes
  AuthRoute(plugin, options, next);
  ImageController(plugin,options,next);
  next();
};

exports.register.attributes = {
  name: 'api'
};
