import * as express from 'express';
import axios from 'axios';
import storage from '../database/storage';
import {Request, UserAuthentication} from '../security/user-authentication';
import * as fs from 'fs';

class Tournaments {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  private static battlefyRequestConfig = {
    headers: {
      'Authorization': 'Bearer ' + Tournaments.getBattlefyJwtToken(),
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

  // TODO: Dynamically generate the JWT token
  private static getBattlefyJwtToken(): string {
    const battlefyJwtFile = __dirname + '/battlefy_jwt.txt';
    if (!fs.existsSync(battlefyJwtFile)) {
      throw new Error(`Battlefy JWT token missing from ${battlefyJwtFile}. Contact the project owner for it.`);
    } else {
      return (<string>fs.readFileSync(battlefyJwtFile, 'utf-8')).trim();
    }
  }
}

export default new Tournaments().router;
