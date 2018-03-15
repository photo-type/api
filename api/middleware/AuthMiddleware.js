var jwtConfig = require('../../config/jwt.js');
var Users = require('../models/Users');

module.exports = function (server, options, next) {

  server.auth.strategy('jwt', 'jwt', {
    key: jwtConfig.secret,
    verifyOptions: {
      algorithms: ['HS256'],
      tokenType: 'Bearer'
    },
    validateFunc: (decoded, request, callback) => {
      Users
        .findOne({_id: decoded.id})
        .exec()
        .then((User) => {
          if (!User) {
            return callback(null, false);
          } else {
            request.isAuth = true;
            request.role = User.type;
            request.user = User._id;
            return callback(null, true);
          }
        }, (err) => {
          callback(err, false);
        });

    }
  });
  server.auth.default('jwt');
  next();
};
