'use strict';
const Users = require('../models/Users');
const uuid = require('node-uuid');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.js');
const emailService = require('../services/EmailService');
const Boom = require('boom');
var bcrypt = require('bcrypt');
const controller = {};

controller.signup = function (request, reply) {
  const email = request.payload.email.toLowerCase();
  const password = request.payload.password;
  const name = request.payload.name;

  Users.findOne({email: email}).then((User) => {
    if (User) {
      return reply({error: true, message: 'User already exists'});
    }
    const token = uuid.v1();
    const user = new Users({
      email: email,
      password: password,
      name: name,
      email_confirm_token: token
    });

    user.save().then(() => {
      emailService.sendMail(email, name, token).catch((err) => {
        console.log(err, 'Error sending email'); // fail silenlty
      })
      return reply({success: true, message: 'Signup success, an email was sent to your email.'});
    })
    .catch((err) => {
      console.log(err); // fail silenlty
      return reply(Boom.internal('Mongo write error'));
    });
  })
  .catch((err) => {
    console.log(err); // fail silenlty
    return reply(Boom.internal('mongo read error'));
  });
};

controller.login = function (request, reply) {
  const email = request.payload.email.toLowerCase();
  const password = request.payload.password;
  Users
    .findOne({
      email_verified: true,
      email: email
    })
    .exec()
    .then((User) => {
      if (!User) {
        return reply({error: true, message: 'no user found'});
      }
      if (User.status === 'SUSPENDED') {
        return reply({error: true, message: 'your account is suspended, contact the administrator'});
      }

      User.comparePassword(password).then((match) => {
        if (!match) {
          return reply({error: true, message: 'incorrect password'});
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
          success:true
        }});
      })
      .catch((err) => {
        return reply(Boom.internal(err));
      });
    });
};

controller.confirmEmail = function (request, reply) {
  const token = request.query.token;
  const email = request.query.email;
  Users
    .findOne({
      email_verified: false,
      email: email,
      email_confirm_token: token
    })
    .exec()
    .then((User) => {
      if (!User) {
        return reply('The User was not found in our DB.');
      }

      User.email_verified = true;
      User.save().then(() => {
        return reply('Thank you for verifying your email, You can now login to the app.');
      })
      .catch((err) => {
        return reply('There was an error while writing to the DB.');
      });
    })
    .catch((err) => {
      return reply('There was an error while reading from the DB.');
    });
};

controller.sendEmail = function (request, reply) {
  Users
    .findOne({email: request.payload.email})
    .then((user) => {
      if (!user) {
        return reply({error: true, message: 'User not found'});
      }
      const token = uuid.v1();
      emailService.sendMail(request.payload.email, 'User', token).then((res) => {
        Users.update({
          _id: user._id
        }, {password_reset_token: token})
        .then(() => {
          reply({
            success: true, message: 'An email was sent to your email address, Check the instructions to reset your password!'
          });
        })
        .catch(() => reply(Boom.internal('Mongo read error')));
      })
      .catch((error) => {
        reply(Boom.internal('Mongo read error'));
      });
    })
    .catch((error) => {
      reply(Boom.internal('Mongo read error'));
    });
  
}

controller.resetPassword = function (request, reply) {
  Users
    .findOne({
      email: request.payload.email,
      password_reset_token: request.payload.token
    })
    .then((User) =>{
      if (!User) {
        return reply({error: true, message: 'No User found with this email'});
      }
      hashPassword(request.payload.password).then((hashPassword) => {
        const doc = {
          password: hashPassword,
          password_reset_token: ''
        };
        Users
          .update({_id: User._id}, doc, (err, res) => {
            if (err) {
              return reply(Boom.internal("DB write error"));
            }
            reply({success: true, message: 'Password updated successfully'});
          });
      }).catch((err) => {
        return reply(Boom.internal("DB read error"));
      });
    })
    .catch((err) => {
      return reply(Boom.internal("DB read error"));
    });
}


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
