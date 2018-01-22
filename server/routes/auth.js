const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const emailer = require('../emailing/emailer'); // eslint-disable-line no-unused-vars
const crypto = require('crypto');
const storage = require('../database/storage');
const bcrypt = require('bcrypt');


const RSA_PRIVATE_KEY = fs.readFileSync('ssl/jwt_key.pem');

const router = new express.Router();

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!storage.users.verifyEmailAndPassword(email, password)) {
    res.sendStatus(401);
  } else {
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 3600,
      subject: email,
    });

    res.status(200).json({
      idToken: jwtBearerToken,
      expiresIn: 3600,
    });
  }
});

const usersToBeRegistered = {};
router.post('/user', (req, res) => {
  let confirmationUrl; // eslint-disable-line no-unused-vars
  let user = req.body;
  if (storage.users.userExists(user.email)) {
    res.status(409).send('Email ' + user.email + ' already registered!');
  } else {
    user.password = bcrypt.hashSync(user.password, 10);

    crypto.randomBytes(48, function(err, buffer) {
      const token = buffer.toString('hex');
      confirmationUrl = req.protocol + '://' + req.get('host') + '/registrationConfirmationUrl?token=' + token;
      usersToBeRegistered[token] = user;
      // TODO: Disabled until ready for production
      // emailer.sendRegistrationMail(req.body.email, confirmationUrl);
      res.status(201).json({
        redirect: '/registrationConfirmationUrl?token=' + token,
      });
    });
  }
});

router.get('/registrationConfirmationUrl', (req, res) => {
  const token = req.query.token;

  console.log(token);
  if (!usersToBeRegistered.hasOwnProperty(token)) {
    res.status(401).send('Token has expired');
  } else {
    let user = usersToBeRegistered[token];
    delete usersToBeRegistered[token];
    storage.users.addUser(user);
    res.status(200).json();
  }
});


module.exports = router;
