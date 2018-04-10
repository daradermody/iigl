import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as express from 'express';
import {UnauthorizedError} from '../errors/server_error';
import {User} from '../../src/app/data_types/user';
import * as moment from 'moment';
import {Users} from '../database/storage';
import {DecodedJwt} from '../../src/app/data_types/decoded-jwt';

export interface Request extends express.Request {
  userEmail: string;
}

export class UserAuthentication {
  private static rsa_public_key = fs.readFileSync('server/security/jwt_certs/jwt.pem');
  private static rsa_private_key = fs.readFileSync('server/security/jwt_certs/jwt_key.pem');

  static verifyUser(req: Request, res: express.Response, next: express.NextFunction) {
    if (!req.headers['authorization'] || !(<string>req.headers['authorization']).startsWith('Bearer')) {
      res.status(UnauthorizedError.status).json(new UnauthorizedError('You must login first!'));
      return;
    }

    const token = (<string>req.headers['authorization']).replace('Bearer ', '');
    try {
      const decodedToken = <DecodedJwt>jwt.verify(token, UserAuthentication.rsa_public_key);
      req.userEmail = decodedToken.sub;
      next();
    } catch (e) {
      console.log('An error occurred: ' + e);
      res.status(UnauthorizedError.status).json(new UnauthorizedError('You must login first!'));
    }
  }

  static verifyAdmin(req: Request, res: express.Response, next: express.NextFunction) {
    UserAuthentication.verifyUser(req, res, () => {
      if (!Users.getUser(req.userEmail).isAdmin) {
        res.status(UnauthorizedError.status).json(new UnauthorizedError('You are not an admin'));
        console.log('not authorized!');
      } else {
        next();
      }
    });
  }


  static generateJsonWebToken(user: User): string {
    return jwt.sign({
      isAdmin: user.isAdmin
    }, this.rsa_private_key, {
      algorithm: 'RS256',
      expiresIn: moment.duration(2, 'weeks').asSeconds(),
      subject: user.email,
    });
  }
}

