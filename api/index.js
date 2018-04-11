const AuthRoute = require('./routes/AuthRoute');
const ImageController = require('./routes/imageRoutes');

const PrototypeController = require('./routes/prototypeRoutes');

exports.register = (plugin, options, next) => {
  // Register all routes
  AuthRoute(plugin, options, next);
  ImageController(plugin,options,next);
  PrototypeController(plugin,options,next);

  next();
};

exports.register.attributes = {
  name: 'api'
};
