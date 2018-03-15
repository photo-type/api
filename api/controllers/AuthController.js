'use strict';
const Users = require('../models/Users');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.js');
const Boom = require('boom');
var bcrypt = require('bcrypt');
const controller = {};

controller.signup = function (request, reply) {
  const email = request.payload.email;
  const password = request.payload.password;
  const name = request.payload.name;

  Users.findOne({email: email}).then((User) => {
    if (User) {
      return reply({error: true, message: 'User exist'});
    }
    const user = new Users({
      email: email,
      password: password,
      name: name,
    });

    user.save().then(() => {
      return reply({success: true, message: 'Signup succuess'});
    })
    .catch((err) => {
      return reply(Boom.internal('Mongo write error'));
    });
  })
  .catch((err) => {
    return reply(Boom.internal('mongo read error'));
  });
};


controller.login = function (request, reply) {
  const phone = request.payload.phone_number;
  const password = request.payload.password;
  const type = request.payload.type;
  Users
    .findOne({phone, type: 'CUSTOMER'})
    .populate(type.toLowerCase())
    .exec()
    .then((User) => {
      if (!User) {
        return reply({error: true, message: request.i18n.__('200_PASSWORD')});
      }
      if (User.status === 'SUSPENDED') {
        return reply({error: true, message: request.i18n.__('200_SUSPENDED')});
      }

      User.comparePassword(password).then((match) => {
        if (!match) {
          return reply({error: true, message: request.i18n.__('200_PASSWORD')});
        }
        let token = JWT.sign({
          id: User._id,
          role: User.type,
          phone: User.phone,
          phone_verified: User.phone_verified
        }, jwtConfig.secret, {
          expiresIn: jwtConfig.duration
        });
        let user = User.toObject();

        delete user.password;
        return reply({jwt: token, data: {
          [type.toLowerCase()]: User[type.toLowerCase()],
          role: User.type,
          phone: User.phone,
          phone_verified: User.phone_verified
        }});
      })
      .catch((err) => {
        return reply(Boom.internal(request.i18n.__('500_MONGO_READ')));
      });
    });
};


function hashPassword(password) {
  const promise = new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return reject(err);

      // hash the password along with our new salt
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return reject(err);
        // if all is ok then return hash password
        resolve(hash);
      });
    });
  });
  return promise;
}
module.exports = controller;
