const express = require('express');
const router = express.Router();
const storage = require('../database/storage')
const fs = require("fs");


router.post('/teams', (req, res) => {
  try {
    storage.addTeam(req.body);
  } catch(err) {
    res.status(400).json({
      message: err
    })
  }
  res.status(201).json();
});

router.get('/teams', (req, res) => {
  res.json(storage.getTeams())
});

router.get('/teams/:name', (req, res) => {
  try {
    res.json(storage.getTeam(req.params.name))
  } catch(err) {
    res.status(400).json({
      message: err
    })
  }
});

const RSA_PRIVATE_KEY = 'thisIsAKey?'; // fs.readFileSync('./demos/private.key');


router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  if (!validateEmailAndPassword(email, password)) {
    res.sendStatus(401);
  } else {
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 120,
      subject: email
    });

    res.json(jwtBearerToken)
  }
});

function validateEmailAndPassword(email, password) {
  return true;
}



module.exports = router;
