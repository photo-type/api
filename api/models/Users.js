var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UsersSchema = mongoose.Schema({
  email: {type: String, unique: true},
  name: {type: String, required: true},
  password_reset_token: {type: String, default: ''},
  email_confirm_token: {type: String, default: ''},
  password: {type: String},
  email_verified: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now},
}, {collection: 'users'});

UsersSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UsersSchema.methods.comparePassword = function (candidatePassword) {
  const promise = new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  })
  return promise;
};

UsersSchema.set('toObject', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('users', UsersSchema);
