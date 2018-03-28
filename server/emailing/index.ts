import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

const Email = require('email-templates');

class AuthInfo {
  user: string;
  pass: string;

  constructor(username, password) {
    this.user = username;
    this.pass = password;
  }
}

export class Emailer {
  private static authInfo = Emailer.getAuthInformation();
  private static email_config = {
    message: {
      from: `IIGL<noreply@${Emailer.authInfo.user}>`
    },
    transport: nodemailer.createTransport({
      host: 'smtp.reg365.net',
      secure: true,
      auth: Emailer.authInfo
    }),
    views: {
      options: {
        extension: 'mustache'
      },
      root: 'server/emailing/templates'
    }
  };

  static sendMail(destinationEmail: string, template: string, variables: { [a: string]: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      new Email(this.email_config).send({
        template: template,
        message: {
          to: destinationEmail,
          bcc: 'irishinterfirmsgaming@gmail.com'
        },
        locals: variables
      }).then(console.log)
        .then(resolve)
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  private static getAuthInformation(): AuthInfo {
    const emailAuthFile = 'server/emailing/email_auth.json';

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
