import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

class RegistrationEmailer {
  private sender = RegistrationEmailer.getSender();

  sendMail(userEmail, confirmationUrl) {
    this.sender({
      to: userEmail,
    }, {
      accountConfirmationUrl: confirmationUrl,
    }, function(err) {
      if (err) {
        console.error('Error sending registration confirmation mail: ' + err);
        throw err;
      }
    });
  }

  private static getAuthInformation(): AuthInfo {
    const emailAuthFile = __dirname + '/email_auth.json';

    if (!fs.existsSync(emailAuthFile)) {
      const authInfo = new AuthInfo('irishinterfirmsgaming@gmail.com', '[password]');
      fs.writeFileSync(emailAuthFile, JSON.stringify(authInfo, null, 2));
    }

    const authInformation = <AuthInfo>JSON.parse(<string>fs.readFileSync(emailAuthFile, 'utf8'));

    if (authInformation.pass === '[password]') {
      throw new Error(`Update the password here: ${emailAuthFile}`);
    }

    return authInformation;
  }

  private static getSender() {
    const transporter: any = nodemailer.createTransport({
      service: 'gmail',
      auth: RegistrationEmailer.getAuthInformation(),
    });

    return transporter.templateSender({
      subject: 'IIGL Registration Confirmation',
      html: fs.readFileSync(__dirname + '/registration_email_template.html'),
    }, {
      from: 'iigl@gmail.com',
    });
  }
}

class AuthInfo {
  user: string;
  pass: string;

  constructor(username, password) {
    this.user = username;
    this.pass = password;
  }
}

export default new RegistrationEmailer();
