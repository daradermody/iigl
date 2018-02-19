// TODO: Convert everything to Typescript

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const auth = require('./server/routes/auth');
const tournaments = require('./server/routes/tournaments');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/api', auth, tournaments);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '4000';
app.set('port', port);

const server = https.createServer({
  // TODO: Remove keys when deplying site to production
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
  passphrase: 'shroot',
}, app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

if (parseInt(port) === 443) {
  http.createServer(function(req, res) {
    res.writeHead(301, {'Location': 'https://' + req.headers['host'] + req.url});
    res.end();
  }).listen(80, () => console.log(`Redirecting on localhost:80`));
}
