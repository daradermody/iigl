const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
const api = require('./server/routes/api');
const fs = require("fs");
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '4000';
app.set('port', port);

const server = https.createServer({
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
  passphrase: "shroot"
}, app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
