import {Request, Response, Router} from 'express';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {Users} from '../database/storage';
import {UserAuthentication} from '../security';
import {Emailer} from '../emailing';
import {User} from '../../src/app/data_types/user';

class Auth {
  router = Router();

  constructor() {
    this.setupRoutes();
  }

  // TODO: Does not work with HA solutions (i.e. clustered-mode)
  private static usersToBeRegistered: {[token: string]: User} = {};

  setupRoutes() {
    this.router.post('/login', Auth.login);
    this.router.post('/user', Auth.registerUser);
    this.router.get('/confirmRegistration', Auth.confirmAccount);
  }

  static login(req: Request, res: Response) {
    if (!UserAuthentication.isUserValid(req.body.email, req.body.password)) {
      res.sendStatus(401);
    } else {
      res.status(200).json({
        idToken: UserAuthentication.generateJsonWebToken(req.body.email),
        expiresIn: 3600,
      });
    }
  }

  static registerUser(req: Request, res: Response) {
    const user: User = req.body;
    if (Users.userExists(user.email)) {
      res.status(409).json({message: `Email ${user.email} already registered!`});
      return;
    }

    user.password = bcrypt.hashSync(user.password, 10);

    const token = crypto.randomBytes(48).toString('hex');
    const templateData = {
      accountConfirmationUrl: req.protocol + '://' + req.get('host') + '/login?token=' + token
    };
    Emailer.sendMail(user.email, 'registration_email', templateData)
      .then(() => {
        console.log(`Adding ${user.email} with token ${token}`);
        Auth.usersToBeRegistered[token] = user;
        console.dir(Auth.usersToBeRegistered);
        res.status(201).json({redirect: '/'});
      })
      .catch(() => {
        res.status(500).json({message: 'Server error sending registration email'});
      });
  }

  static confirmAccount(req: Request, res: Response) {
    const token: string = req.query.token;
    console.log('Looking for token:' + token);
    console.dir(Auth.usersToBeRegistered);
    if (!(token in Auth.usersToBeRegistered)) {
      // TODO: Make error messages more consistent by using error classes
      res.status(401).json({message: 'Token has expired'});
      return;
    }

    const user = Auth.usersToBeRegistered[token];
    console.log('Registering user ' + user.email);
    Users.addUser(user);
    delete Auth.usersToBeRegistered[token];
    res.status(200).json();
  }
}


export default new Auth().router;
