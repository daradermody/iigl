import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as express from 'express';
import {UnauthorizedError} from '../errors/server_error';
import {User} from '../../src/app/data_types/user';

export interface Request extends express.Request {
  userEmail: string;
}

export class UserAuthentication {
  private static rsa_public_key = fs.readFileSync('server/security/jwt_certs/jwt.pem');
  private static rsa_private_key = fs.readFileSync('server/security/jwt_certs/jwt_key.pem');

  static authenticateUserRequest(req: Request, res: express.Response, next: express.NextFunction) {
    if (!req.headers['authorization'] || !(<string>req.headers['authorization']).startsWith('Bearer')) {
      res.status(UnauthorizedError.status).json(new UnauthorizedError('You must login first!'));
      return;
    }

    const token = (<string>req.headers['authorization']).replace('Bearer ', '');
    try {
      req.userEmail = (<DecodedJwt>jwt.verify(token, UserAuthentication.rsa_public_key)).sub;
      next();
    } catch (e) {
      console.log('An error occurred: ' + e);
      res.status(UnauthorizedError.status).json(new UnauthorizedError('You must login first!'));
    }
  }

  static generateJsonWebToken(user: User): string {
    return jwt.sign({
      emailVerified: user.emailVerified
    }, this.rsa_private_key, {
      algorithm: 'RS256',
      expiresIn: 3600,
      subject: user.email,
    });
  }

}

interface DecodedJwt {
  iat: number;
  exp: number;
  sub: string;
}
