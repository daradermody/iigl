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
  const email_auth_file = __dirname + '/email_auth.json';

  if (!fs.existsSync(email_auth_file)) {
    fs.writeFileSync(email_auth_file, JSON.stringify({
      user: "irishinterfirmsgaming@gmail.com",
      pass: "[password]"
    }, null, 2));
  }

  const authInformation = require(email_auth_file);

  if (authInformation.pass === "[password]") {
    throw "Update the password here: './email_auth.json'";
  }

  return authInformation;
}

function getRegistrationConfirmationSender() {
  const registrationEmailTemplate = fs.readFileSync(__dirname + '/registration_email_template.html');

  return transporter.templateSender({
    subject: 'IIGL Registration Confirmation',
    text: 'What is text???',
    html: registrationEmailTemplate
  }, {
    from: 'iigl@gmail.com',
  });
}
