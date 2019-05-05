import {Request, Response, Router} from 'express';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {Users} from '../database/storage';
import {Teams} from '../database/storage';
import {UserAuthentication} from '../security';
import {Emailer} from '../emailing';
import {User} from '../../src/app/data_types/user';
import {Team} from '../../src/app/data_types/team';
import {BadRequestError, ConflictError, NotFoundError, ServerError, UnauthorizedError} from '../errors/server_error';
import * as moment from 'moment';

class Auth {
  router = Router();

  constructor() {
    this.setupRoutes();
  }

  // TODO: Does not work with HA solutions (i.e. clustered-mode)
  private static usersToBeRegistered: { [token: string]: User } = {};

  setupRoutes() {
    this.router.post('/login', Auth.login);
    this.router.get('/users', UserAuthentication.verifyAdmin, Auth.getUsers);
    this.router.post('/user', Auth.registerUser);
    this.router.put('/user/:email', UserAuthentication.verifyAdmin, Auth.updateUser);
    this.router.get('/confirmRegistration', Auth.confirmAccount);
    this.router.get('/teams', Auth.getTeams);
    this.router.get('/team/:name/score/:game', Auth.getGameScore);
    this.router.get('/teams/scores', Auth.getGameScores);
  }

  static login(req: Request, res: Response) {
    const user = Users.getUser(req.body.email);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        idToken: UserAuthentication.generateJsonWebToken(user),
        expiresIn: moment.duration(2, 'weeks').asSeconds(),
      });
    } else if (Object.values(Auth.usersToBeRegistered).find(u => u.email === req.body.email.toLowerCase())) {
      res.status(UnauthorizedError.status).json(new UnauthorizedError('You need to confirm your account first; check your email'));
    } else {
      res.status(UnauthorizedError.status).json(new UnauthorizedError('Email or password is invalid'));
    }
  }

  static getUsers(req: Request, res: Response) {
    const users = Users.getUsers();
    for (const user of users) {
      user.password = null;
    }
    res.status(200).json(users);
  }

  static registerUser(req: Request, res: Response) {
    const user = new User(req.body.email.toLowerCase(), req.body.battlefy, req.body.password, req.body.games);
    if (Users.userExists(user.email)) {
      res.status(ConflictError.status).json(new ConflictError(`Email ${user.email} already registered!`));
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
        res.status(ServerError.status).json(new ServerError('Server error sending registration email'));
      });
  }

  static updateUser(req: Request, res: Response) {
    const newUserInfo = req.body;
    delete newUserInfo.email;

    const user = Users.getUser(req.params['email']);
    if (!user) {
      res.status(BadRequestError.status).json(new BadRequestError('User does not exist'));
    }

    if (newUserInfo.password) {
      newUserInfo.password = bcrypt.hashSync(newUserInfo.password, 10);
    } else {
      delete newUserInfo.password;
    }

    for (const key of Object.keys(newUserInfo)) {
      user[key] = newUserInfo[key];
    }
    Users.updateUser(user);
    res.sendStatus(204);
  }

  static confirmAccount(req: Request, res: Response) {
    const token: string = req.query.token;
    console.log('Looking for token:' + token);
    console.dir(Auth.usersToBeRegistered);
    if (!(token in Auth.usersToBeRegistered)) {
      res.status(NotFoundError.status).json(new NotFoundError('Token not found or has expired'));
      return;
    }

    const user = Auth.usersToBeRegistered[token];
    console.log('Registering user ' + user.email);
    Users.addUser(user);
    delete Auth.usersToBeRegistered[token];
    res.sendStatus(204);

    const templateData = {
      url: req.protocol + '://' + req.get('host') + '/admin/userList',
      email: user.email
    };
    Emailer.sendMail('irishinterfirmsgaming@gmail.com', 'email_validation_request', templateData);
  }

  static getTeams(req: Request, res: Response) {
    const teams = Teams.getTeams();
    res.status(200).json(teams);
  }

  static getGameScore(req: Request, res: Response) {
    const gameScore = Teams.getGameScore(req.params.name, req.params.game);
    res.status(200).json(gameScore);
  }

  static getGameScores(req: Request, res: Response) {
    const gameScores = Teams.getGameScores();
    res.status(200).json(gameScores);
  }
}


export default new Auth().router;
