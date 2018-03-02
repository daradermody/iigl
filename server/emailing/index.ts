import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
const Email = require('email-templates');

export class Emailer {
  private static authInfo = Emailer.getAuthInformation();
  private static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: Emailer.authInfo,
  });

  static sendMail(destinationEmail: string, template: string, variables: any) {
    const email = new Email({
      message: {
        from: `IIGL <${Emailer.authInfo.user}>`
      },
      transport: Emailer.transporter,
      views: {
        options: {
          extension: 'mustache'
        },
        root: __dirname + '/templates'
      }
    });

    email
      .send({
        template: template,
        message: {
          to: destinationEmail
        },
        locals: variables
      })
      .then(console.log)
      .catch(console.error);
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
}

class AuthInfo {
  user: string;
  pass: string;

  constructor(username, password) {
    this.user = username;
    this.pass = password;
  }
}
