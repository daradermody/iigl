import * as express from 'express';
import axios from 'axios';
import storage from '../database/storage';
import {UserAuthentication, Request} from '../security/user-authentication';

class Tournaments {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  private static battlefyRequestConfig = {
    headers: {
      // TODO: Dynamically generate the JWT token
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhdHRsZWZ5LmF1dGgwLmNvbS8iLCJ' +
      'zdWIiOiJhdXRoMHw1YTgzMDViNjRlYTcxOTI4NWY4NTQ3YmUiLCJhdWQiOiJHQkd5WGxIVWg1T2hxYmRTR2s1SUdqYVR4aDdSMnh5SCIsImlhdCI' +
      '6MTUxODYxNTUxNCwiZXhwIjoxNTE5ODI1MTE0fQ.FalpPErzt7oboDIDrKMBcEdUokC4sXGAOTvqrj--HGg',
    },
  };

  setupRoutes() {
    this.router.get('/getJoinCode/:tournamentId', UserAuthentication.authenticateUserRequest, this.getTournamentCode);
  }

  getTournamentCode(req: Request, res: express.Response) {
    const code = storage.tournamentCodes.getCode(req.params['tournamentId'], req.userEmail);
    if (code) {
      res.status(201).json({code: code});
      return;
    }

    const data = {'numberOfCodes': 1};
    axios.post(`https://api.battlefy.com/tournaments/${req.params['tournamentId']}/join-codes`, data, Tournaments.battlefyRequestConfig)
      .then((response) => {
        storage.tournamentCodes.cacheCode(req.params['tournamentId'], req.userEmail, response.data[0]['code']);
        res.status(201).json({code: response.data[0]['code']});
      })
      .catch((error) => {
        // TODO: Handle server errors more professionally (monitoring, recording, etc.)
        console.error(error.response.data);
        res.status(error.response.status).json({message: error.response.data});
      });
  }
}

export default new Tournaments().router;
