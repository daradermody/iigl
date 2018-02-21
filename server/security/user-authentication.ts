import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as express from 'express';
import storage from '../database/storage/index';

export interface Request extends express.Request {
  userEmail: string;
}

export class UserAuthentication {
  private static rsa_public_key = fs.readFileSync('ssl/jwt.pem');
  private static rsa_private_key = fs.readFileSync('ssl/jwt_key.pem');

  static authenticateUserRequest(req: Request, res: express.Response, next: express.NextFunction) {
    if (!req.headers['authorization'] || !(<string>req.headers['authorization']).startsWith('Bearer')) {
      res.status(403).json({message: 'You must login first!'});
      return;
    }

    const token = (<string>req.headers['authorization']).replace('Bearer ', '');
    try {
      req.userEmail = (<DecodedJwt>jwt.verify(token, UserAuthentication.rsa_public_key)).sub;
      next();
    } catch (e) {
      console.log('An error occurred: ' + e);
      res.status(403).json({message: 'You must login first!'});
    }
  }

  static isUserValid(email: string, password: string): boolean {
    return storage.users.isEmailAndPasswordValid(email, password);
  }

  static generateJsonWebToken(email: string): string {
    return jwt.sign({}, this.rsa_private_key, {
      algorithm: 'RS256',
      expiresIn: 3600,
      subject: email,
    });
  }

}

// TODO: Verify structure of decoded token
interface DecodedJwt {
  exp: string;
  nbf: string;
  aud: string;
  sub: string;
  iss: string;
}
