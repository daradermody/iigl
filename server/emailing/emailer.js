const nodemailer = require('nodemailer');
const fs = require('fs');

const authInfo = getAuthInformation();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: authInfo,
});

const registrationConfirmationSender = getRegistrationConfirmationSender();

exports.sendRegistrationMail = (userEmail, confirmationUrl) => {
  registrationConfirmationSender({
    to: userEmail,
  }, {
    accountConfirmationUrl: confirmationUrl,
  }, function(err) {
    if (err) {
      console.error('Error sending registration confirmation mail: ' + err);
      throw err;
    }
  });
};

function getAuthInformation() {
  const emailAuthFile = __dirname + '/email_auth.json';

  if (!fs.existsSync(emailAuthFile)) {
    fs.writeFileSync(emailAuthFile, JSON.stringify({
      user: 'irishinterfirmsgaming@gmail.com',
      pass: '[password]',
    }, null, 2));
  }

  const authInformation = require(emailAuthFile);

  if (authInformation.pass === '[password]') {
    throw new Error('Update the password here: "./email_auth.json"');
  }

  return authInformation;
}

function getRegistrationConfirmationSender() {
  const registrationEmailTemplate = fs.readFileSync(__dirname + '/registration_email_template.html');

  return transporter.templateSender({
    subject: 'IIGL Registration Confirmation',
    html: registrationEmailTemplate,
  }, {
    from: 'iigl@gmail.com',
  });
}
