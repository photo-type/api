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

module.exports.sendMail = function (email, name, token) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve('./templates/signup.html'), "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let html = data;
        html = html.replace('####NAME####', name);
        html = html.replace('##EMAIL##', email);
        html = html.replace('##TOKEN##', token);

        const mailOptions = {
          from: 'Phototype <notification@phototype.me>',
          to: email,
          subject: 'Thankyou for Signing up on Phototype',
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
