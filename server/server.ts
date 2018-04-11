import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';
import * as morgan from 'morgan';
import tournaments from './routes/tournaments';
import auth from './routes/auth';
import monitoring from './monitoring';
import diagnostics from './routes/diagnostics';


class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configure();
    this.setupApi();
  }

  private static private_key = 'ssl/key.pem';
  private static public_cert = 'ssl/cert.pem';

  public startServer(port) {
    this.app.set('port', port);
    const server = https.createServer({
      key: fs.readFileSync(App.private_key),
      cert: fs.readFileSync(App.public_cert),
      passphrase: 'shroot',
    }, this.app);

    server.listen(port, () => console.log(`Running on localhost:${port}`));

    if (parseInt(port, 10) === 443) {
      http.createServer(function (req, res) {
        res.writeHead(301, {'Location': 'https://' + req.headers['host'] + req.url});
        res.end();
      }).listen(80, () => console.log(`Redirecting on localhost:80`));
    }
  }

  private configure() {
    this.app.use(express.static(path.join(__dirname, 'dist')));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(morgan('dev'));
    this.app.use(monitoring);
  }

  private setupApi() {
    this.app.get('/api', (req, res) => res.status(200).send('API running'));
    this.app.use('/api', auth, tournaments, diagnostics);

    this.app.use(express.static(__dirname + '/..'));
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../index.html'));
    });
  }
}

export default new App();
