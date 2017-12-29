const nodemailer = require('nodemailer');
const fs = require("fs");

const authInfo = getAuthInformation();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: authInfo
});

const registrationConfirmationSender = getRegistrationConfirmationSender();

exports.sendRegistrationMail = (userEmail, confirmationUrl) => {
  registrationConfirmationSender({
    to: userEmail
  }, {
    accountConfirmationUrl: confirmationUrl
  }, function (err) {
    if (err) {
      console.error('Error sending registration confirmation mail');
    }
  });
};

function getAuthInformation() {
  if (!fs.exists("./email_auth.json")) {
    fs.writeFileSync('./email_auth.json', {
      user: "irishinterfirmsgaming@gmail.com",
      pass: "<password>"
    });
  }

  const authInformation = require('./email_auth');

  if (authInformation.pass === "<password>") {
    throw "Update the password here: './email_auth.json'";
  }

  return authInformation;
}

function getRegistrationConfirmationSender() {
  const registrationEmailTemplate = fs.readFileSync('server/emailing/registration_email_template.html');

  return transporter.templateSender({
    subject: 'IIGL Registration Confirmation',
    text: 'What is text???',
    html: registrationEmailTemplate
  }, {
    from: 'iigl@gmail.com',
  });
}
