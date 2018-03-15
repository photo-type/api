const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.emailUser,
    pass: process.env.emailPassword
  }
});

const emailTypes = {
  signup: {
    subject: 'Thankyou for Signing up on Phototype',
    filename: 'signup.html'
  },
};

module.exports.sendMail = function (obj, to, type) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve('./templates/' + emailTypes[type].filename), "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let html = data;
        if (type === 'signup' || type === 'reset_password') {
          html = html.replace('####NAME####', obj.name);
          html = html.replace(new RegExp('####CODE####', 'g'), obj.code);
        }
        const mailOptions = {
          from: 'Phototype',
          to: to,
          subject: emailTypes[type].subject,
          html: html
        };
        transporter.sendMail(mailOptions, function(error, info){
          if(error) {
            console.log(error);
            reject(error);
          } else {
            resolve(info);
          }
        });
      }
    });
  });
};
