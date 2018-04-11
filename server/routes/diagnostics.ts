import {Request, Response, Router} from 'express';
import * as fs from 'fs';
import {UserAuthentication} from '../security/user-authentication';
import * as Convert from 'ansi-to-html';


class Diagnostics {
  router = Router();
  constructor() {
    this.setupRoutes();
  }

  private static converter = new Convert({newline: true});

  private setupRoutes() {
    this.router.get('/logs', UserAuthentication.verifyAdmin, Diagnostics.getLogs);
  }

  private static getLogs(req: Request, res: Response) {
    const logs = {
      info: Diagnostics.converter.toHtml(fs.readFileSync('logs/server.log', 'utf-8').split('\n').slice(-200).join('\n')),
      error: Diagnostics.converter.toHtml(fs.readFileSync('logs/error.log', 'utf-8').split('\n').slice(-200).join('\n'))
    };
    res.status(200).json(logs);
  }
}


export default new Diagnostics().router;
